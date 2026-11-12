import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Registry Build Pipeline", () => {
  const rootDir = process.cwd();
  const configPath = path.join(rootDir, "packages/registry/registry-config.json");
  const indexPath = path.join(rootDir, "packages/registry/src/index.ts");

  it("registry-config.json exists and contains valid component schemas", () => {
    expect(fs.existsSync(configPath)).toBe(true);
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThanOrEqual(10);

    const barcode = config.find((c: any) => c.name === "barcode");
    expect(barcode).toBeDefined();
    expect(barcode.title).toBe("Barcode / QR Code");
    expect(barcode.enabled).toBe(true);
  });

  it("packages/registry/src/index.ts exports all enabled components", () => {
    expect(fs.existsSync(indexPath)).toBe(true);
    const content = fs.readFileSync(indexPath, "utf8");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const enabled = config.filter((c: any) => c.enabled);

    for (const comp of enabled) {
      expect(content).toContain(`export * from "./components/${comp.name}";`);
    }
  });
});
