"use client";

import { useField } from "@payloadcms/ui";
import { useId, useState } from "react";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

const isObject = (value: JsonValue): value is JsonObject => value !== null && typeof value === "object" && !Array.isArray(value);
const titleCase = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (letter) => letter.toUpperCase());
const clone = (value: JsonValue): JsonValue => JSON.parse(JSON.stringify(value));
const isMediaKey = (key: string) => /image|photo|logo|video|background|file|thumbnail|portrait/i.test(key);
const isLongText = (key: string, value: string) => value.length > 110 || /description|body|content|introduction|paragraph|excerpt|subtitle|address/i.test(key);

function ValueEditor({ label, value, onChange, template }: { label: string; value: JsonValue; onChange: (value: JsonValue) => void; template?: JsonValue }) {
  const id = useId();
  if (Array.isArray(value)) {
    const sample = value[0] ?? (Array.isArray(template) ? template[0] : undefined);
    return (
      <div className="md3d-field-array">
        <div className="md3d-field-array__heading"><strong>{titleCase(label)}</strong><span>{value.length} {value.length === 1 ? "item" : "items"}</span></div>
        {value.map((item, index) => (
          <div className="md3d-field-array__item" key={index}>
            <div className="md3d-field-array__toolbar"><span>{isObject(item) ? String(item.title ?? item.label ?? item.name ?? `Item ${index + 1}`) : `Item ${index + 1}`}</span><div>
              <button type="button" disabled={index === 0} onClick={() => { const next = [...value]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; onChange(next); }} aria-label={`Move ${titleCase(label)} item ${index + 1} up`}>↑</button>
              <button type="button" disabled={index === value.length - 1} onClick={() => { const next = [...value]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; onChange(next); }} aria-label={`Move ${titleCase(label)} item ${index + 1} down`}>↓</button>
              <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${titleCase(label)} item ${index + 1}`}>Remove</button>
            </div></div>
            <ValueEditor label={isObject(item) ? "Details" : "Text"} value={item} template={sample} onChange={(nextItem) => onChange(value.map((current, itemIndex) => itemIndex === index ? nextItem : current))} />
          </div>
        ))}
        <button type="button" className="md3d-field-array__add" onClick={() => onChange([...value, sample === undefined ? "" : clone(sample)])}>+ Add {titleCase(label).replace(/s$/, "")}</button>
      </div>
    );
  }
  if (isObject(value)) {
    const objectTemplate = isObject(template ?? null) ? template as JsonObject : null;
    return <div className="md3d-field-object">{Object.entries(value).map(([key, child]) => <ValueEditor key={key} label={key} value={child} template={objectTemplate?.[key]} onChange={(nextChild) => onChange({ ...value, [key]: nextChild })} />)}</div>;
  }
  if (typeof value === "boolean") {
    return <label className="md3d-field-checkbox" htmlFor={id}><input id={id} type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />{titleCase(label)}</label>;
  }
  if (typeof value === "number") {
    return <div className="md3d-field-control"><label htmlFor={id}>{titleCase(label)}</label><input id={id} type="number" value={value} onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))} /></div>;
  }
  const textValue = value ?? "";
  const media = isMediaKey(label);
  return <div className="md3d-field-control"><label htmlFor={id}>{titleCase(label)}</label>
    {isLongText(label, textValue) && !media ? <textarea id={id} rows={Math.min(7, Math.max(3, Math.ceil(textValue.length / 75)))} value={textValue} onChange={(event) => onChange(event.target.value)} /> : <input id={id} type="text" value={textValue} onChange={(event) => onChange(event.target.value)} />}
    {media && <small>Use a site path, a full URL, or an uploaded file URL from <a href="/admin/collections/media" target="_blank" rel="noreferrer">Media ↗</a>.</small>}
  </div>;
}

export function StructuredJsonField({ path }: { path: string }) {
  const { value, setValue } = useField<JsonValue>({ path });
  const [active, setActive] = useState<string | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [sourceError, setSourceError] = useState("");
  const [originalShape] = useState<JsonValue | null>(() => value == null ? null : clone(value));

  if (value === undefined || value === null) return <p className="md3d-content-editor__empty">No content has been added yet. Seed the initial page content, then edit it here.</p>;
  const sections = path === "sections" && isObject(value) ? Object.entries(value) : null;
  const currentKey = sections?.some(([key]) => key === active) ? active : sections?.[0]?.[0];
  const currentValue = sections?.find(([key]) => key === currentKey)?.[1];
  return <div className="md3d-content-editor">
    {sections ? <><div className="md3d-content-editor__tabs" role="tablist" aria-label="Page sections">{sections.map(([key]) => <button key={key} type="button" role="tab" aria-selected={currentKey === key} className={currentKey === key ? "is-active" : ""} onClick={() => setActive(key)}>{titleCase(key)}</button>)}</div>
      {currentKey && currentValue !== undefined && <div className="md3d-content-editor__panel" role="tabpanel"><div className="md3d-content-editor__heading"><h3>{titleCase(currentKey)}</h3><p>Edit text, links, images, and list items for this section. Save the page to publish your changes.</p></div><ValueEditor label={currentKey} value={currentValue} template={isObject(originalShape) ? originalShape[currentKey] : undefined} onChange={(next) => setValue({ ...(value as JsonObject), [currentKey]: next })} /></div>}
    </> : <ValueEditor label="Navigation" value={value} template={originalShape ?? undefined} onChange={setValue} />}
    <div className="md3d-content-editor__advanced"><button type="button" onClick={() => setShowSource(!showSource)}>{showSource ? "Hide" : "Show"} advanced JSON editor</button>{showSource && <SourceEditor key={JSON.stringify(value)} value={value} onApply={(next) => { setValue(next); setSourceError(""); }} error={sourceError} setError={setSourceError} />}</div>
  </div>;
}

function SourceEditor({ value, onApply, error, setError }: { value: JsonValue; onApply: (value: JsonValue) => void; error: string; setError: (message: string) => void }) {
  const [source, setSource] = useState(JSON.stringify(value, null, 2));
  return <div className="md3d-content-editor__source"><textarea aria-label="Advanced JSON source" spellCheck={false} value={source} onChange={(event) => setSource(event.target.value)} rows={18} /><button type="button" onClick={() => { try { onApply(JSON.parse(source)); } catch { setError("Invalid JSON. Check the syntax and try again."); } }}>Apply JSON</button>{error && <p role="alert">{error}</p>}</div>;
}
