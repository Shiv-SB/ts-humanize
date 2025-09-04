import { Glob } from "bun";
import path from "node:path";
import { watch } from "fs/promises";
import data from "../package.json";

const rootFolder = path.resolve(import.meta.dir, "..");
const indexFilePath = path.resolve(rootFolder, "src", "index.ts");
const glob = new Glob("**/*.ts");
const unitGlob = new Glob("**/*.units.ts");
const args = Bun.argv.slice(2);

function printC(col: string, data: string, lvl: "log" | "warn" | "error" = "log") {
    const c = Bun.color(col, "ansi") ?? "";
    const r = "\x1b[0m"
    console[lvl](`${c}${data}${r}`);
}

if (args[0] === "--watch") {
    console.log("Running in watch mode...");
    const srcFolder = path.resolve(rootFolder, "src");

    const watcher = watch(srcFolder, { recursive: true });

    for await (const event of watcher) {
        printC("cyan", `    ${event.eventType} in ${event.filename}`);
        await build({ fileLogging: false });
    }

    process.on("SIGINT", () => {
        process.exit(0);
    });
} else {
    await build();
}

async function getBarrelFiles(): Promise<string[]> {
    const files: string[] = [];
    for await (const file of glob.scan("./src")) {
        if (unitGlob.match(file)) continue;
        if (file === "index.ts") continue;
        files.push(file);
    }
    return files;
}

async function generateIndexTsFile(): Promise<void> {
    const barrelFiles = await getBarrelFiles();
    const exportString: string = barrelFiles.map((name) => `export * from "./${name}"`).join("\n");
    const indexFile = Bun.file(indexFilePath);
    await Bun.write(indexFile, exportString);
}

async function updatePackageJSON() {
}

async function build(opts?: { fileLogging: boolean }): Promise<void> {
    console.time("Build Complete");
    console.log("Building...");
    const {
        fileLogging = true,
    } = opts || {};

    // TODO: clean up and move index generation to seperate script
    /*
    TODO: Add a script to update package.json to have something like:
        "main": "build/index.js",
        "types": "build/index.d.ts",
        "exports": {
            ".": {
                "import": "./build/index.js",
                "types": "./build/index.d.ts"
            },
            "./bytes": {
                "import": "./build/bytes/index.js",
                "types": "./build/bytes/index.d.ts"
            },
            "./time": {
                "import": "./build/time/index.js",
                "types": "./build/time/index.d.ts"
            }
        }
    */

    await generateIndexTsFile();

    const result = await Bun.build({
        entrypoints: [indexFilePath],
        outdir: "build",
        minify: false,
        // TODO: Remove ignore when Bun types is patched
        //@ts-ignore bug in Bun types. Should be patched in >1.2.21
        splitting: true,
    });

    if (!result.success) {
        printC("orange", "Build complete with warnings:", "warn");
        for (const log of result.logs) {
            console.log(log);
        }
    } else {
        console.timeLog("Build Complete");
        if (fileLogging) {
            console.log("Built files:");
            for (const file of result.outputs) {
                printC("green", ` > ${file.path.split("/").pop()}`);
            }
        }
    }
}

