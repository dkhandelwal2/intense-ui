import { ESLint } from "eslint";
import path from "node:path";
import process from "node:process";

const isFix = process.argv.includes("--fix");
const webDir = path.resolve(process.cwd(), "apps/web");

const eslint = new ESLint({
  cwd: webDir,
  fix: isFix,
});

async function run() {
  console.log(`Checking for unused imports in apps/web/src... (fix: ${isFix})`);
  const results = await eslint.lintFiles(["src/**/*.{ts,tsx}"]);

  if (isFix) {
    await ESLint.outputFixes(results);
    console.log("Unused imports automatically pruned!");
  }

  let totalUnusedImports = 0;
  for (const res of results) {
    const unusedImportMessages = res.messages.filter(
      (m) => m.ruleId === "unused-imports/no-unused-imports"
    );
    if (unusedImportMessages.length > 0) {
      console.log(`\n📄 ${path.relative(process.cwd(), res.filePath)}:`);
      for (const msg of unusedImportMessages) {
        console.log(`  Line ${msg.line}:${msg.column} - ${msg.message}`);
        totalUnusedImports++;
      }
    }
  }

  if (totalUnusedImports === 0) {
    console.log("✅ Zero unused imports found!");
    process.exit(0);
  } else {
    console.log(`\n❌ Found ${totalUnusedImports} unused import(s). Run 'npm run fix:imports' to auto-remove them.`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
