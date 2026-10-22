import config from "@payload-config";
import "@payloadcms/next/css";
import { connection } from "next/server";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap.js";
import "./custom.css";

const serverFunction: ServerFunctionClient = async (args) => {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

// Payload's admin shell renders request-specific values, including the current time.
export const instant = false;

export default async function PayloadLayout({ children }: { children: React.ReactNode }) {
  await connection();
  return <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>{children}</RootLayout>;
}
