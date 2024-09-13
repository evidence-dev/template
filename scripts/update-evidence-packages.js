#!/usr/bin/env node

import fs from "node:fs";
import { spawnSync } from "node:child_process";

/** @returns {Record<string, string>} */
const readEvidencePackages = () => {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  return Object.fromEntries(
    Object.entries(packageJson.dependencies)
      .filter(([dep]) => dep.startsWith("@evidence-dev/"))
      .map(([dep, version]) => [dep, version.replaceAll(/[^\d\.]/g, "")])
  );
};

const initialEvidencePackages = readEvidencePackages();

const longestPackageName = Object.keys(initialEvidencePackages).reduce(
  (acc, dep) => Math.max(acc, dep.length),
  0
);

const evidencePackagesWithLatest = Object.keys(initialEvidencePackages)
  .map((dep) => `${dep}@latest`)
  .join(" ");
const updateCommand = `npm install ${evidencePackagesWithLatest}`;

spawnSync(updateCommand, { shell: true, stdio: "inherit" });

const finalEvidencePackages = readEvidencePackages();

const unchangedPackages = Object.keys(finalEvidencePackages).filter(
  (dep) => initialEvidencePackages[dep] === finalEvidencePackages[dep]
);
const updatedPackages = Object.keys(finalEvidencePackages).filter(
  (dep) => initialEvidencePackages[dep] !== finalEvidencePackages[dep]
);

console.log("\nUpdated packages:");
if (updatedPackages.length === 0) {
  console.log("  None");
} else {
  updatedPackages.forEach((dep) => {
    const dots = ".".repeat(longestPackageName - dep.length);
    console.log(
      `  ${dep} ...${dots} ${initialEvidencePackages[dep]} -> ${finalEvidencePackages[dep]}`
    );
  });
}

console.log("\nUnchanged packages:");
if (unchangedPackages.length === 0) {
  console.log("  None");
} else {
  unchangedPackages.forEach((dep) => {
    const dots = ".".repeat(longestPackageName - dep.length);
    console.log(`  ${dep} ...${dots} ${finalEvidencePackages[dep]}`);
  });
}
