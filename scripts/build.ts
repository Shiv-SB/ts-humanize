import { Glob } from "bun";
import path from "node:path";

// root dir without trailing slash
const root = path.resolve(import.meta.dir, "..");

const glob = new Glob("**/*.ts");
const unitGlob = new Glob("**/*.units.ts");

const fullPaths: string[] = [];

for await (const file of glob.scan("./src")) {
    if (unitGlob.match(file)) continue;
    const fullPath = path.resolve(root, "src", file);
    fullPaths.push(fullPath);
}

const build = await Bun.build({
    entrypoints: fullPaths,
    outdir: "build",
    sourcemap: "linked",
    minify: true,
    splitting: true,
});

if (!build.success) {
    console.warn("Build completed with warnings:");
    for (const log of build.logs) {
        console.log(log);
    }
} else {
    console.log("Build complete:");
    for (const file of build.outputs) {
        console.log(" > ", file.path.split("/").pop());
    }
}