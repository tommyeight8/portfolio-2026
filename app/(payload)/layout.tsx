/* Payload admin root layout. Mirrors the layout Payload generates; keep it minimal. */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { Roboto } from "next/font/google";
import React from "react";

import { importMap } from "./admin/importMap.js";
import "./custom.css";

// Same typeface as the public site; Payload reads it from --font-body.
const roboto = Roboto({ subsets: ["latin"], display: "swap" });

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <style>{`:root { --font-body: ${roboto.style.fontFamily}, system-ui, sans-serif; }`}</style>
    {children}
  </RootLayout>
);

export default Layout;
