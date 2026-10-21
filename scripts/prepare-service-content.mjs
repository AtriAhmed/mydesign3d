import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve("app/(frontend)");
const components = new Map([
  ["ServiceHero", "hero"],
  ["SoftwareTools", "tools"],
  ["ServiceProcess", "process"],
  ["ServiceOffer", "offer"],
  ["ServiceDifferent", "different"],
  ["ServiceContact", "contact"],
  ["ServicePricing", "pricing"],
]);

function value(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(value);
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map((property) => [property.name.getText().replace(/^['"]|['"]$/g, ""), value(property.initializer)]));
  }
  return undefined;
}

const records = [];
for (const slug of fs.readdirSync(root)) {
  const file = path.join(root, slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const sections = {};
  const insertions = [];

  function visit(node) {
    if (ts.isJsxSelfClosingElement(node)) {
      const name = node.tagName.getText(ast);
      const section = components.get(name);
      if (section) {
        const props = {};
        for (const attribute of node.attributes.properties) {
          if (!ts.isJsxAttribute(attribute) || !attribute.initializer) continue;
          let parsed;
          if (ts.isStringLiteral(attribute.initializer)) parsed = attribute.initializer.text;
          else if (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression) parsed = value(attribute.initializer.expression);
          if (parsed !== undefined) props[attribute.name.text] = parsed;
        }
        sections[section] = props;
        if (!source.slice(node.getStart(ast), node.getEnd()).includes(`...section("${section}")`)) {
          insertions.push({ at: node.getEnd() - 2, text: ` {...section("${section}")}` });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  if (!Object.keys(sections).length) continue;
  let modified = source;
  for (const insertion of insertions.sort((a, b) => b.at - a.at)) {
    modified = modified.slice(0, insertion.at) + insertion.text + modified.slice(insertion.at);
  }
  if (!modified.includes('import { getPageSections } from "@/lib/cms";')) {
    modified = 'import { getPageSections } from "@/lib/cms";\n' + modified;
  }
  modified = modified.replace(/export default function (\w+Page)\(\) \{/, `export default async function $1() {\n  const sections = await getPageSections("/${slug}");\n  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;`);
  fs.writeFileSync(file, modified);
  records.push({ title: slug.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()), path: `/${slug}`, sections });
}

fs.mkdirSync("content", { recursive: true });
fs.writeFileSync("content/service-pages.json", JSON.stringify(records, null, 2) + "\n");
console.log(`Prepared ${records.length} service pages for CMS editing.`);
