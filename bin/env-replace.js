#!/usr/bin/env node

const replace = require("replace-in-file");

// ---------------------------------------- | Environment Check

const env = process.env.CRDS_ENV;

if (env == "int" || env == "development" || env == "dev") {
  console.log("[env:replace] No replacement for int environment.");
  return;
}

// ---------------------------------------- | Attributes

const attrOptions = {
  files: "./dist/search-ui/index.html",
  from: /(env=")(\w*)"/g,
  to: `env="${env}"`
};

try {
  replace.sync(attrOptions);
  console.log("[env:replace] Replaced environment attributes");
} catch (error) {
  console.error("[env:replace] ERROR:", error);
}

// ---------------------------------------- | Library

// Demo uses the int library.
if (env == "demo" || env == "release") return;

const libOptions = {
  files: "./dist/search-ui/index.html",
  from: /crds-components-int.netlify.com/g,
  to: "crds-components.netlify.com"
};

try {
  replace.sync(libOptions);
  console.log("[env:replace] Replaced library reference");
} catch (error) {
  console.error("[env:replace] ERROR:", error);
}
