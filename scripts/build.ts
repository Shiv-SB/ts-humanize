import { Glob } from "bun";
import path from "node:path";
import { watch } from "fs/promises";
import packageJSON from "../package.json";
import { bytes } from "../src";

const rootFolder = path.resolve(import.meta.dir, "..");
const srcFolder = path.resolve(rootFolder, "src");
const indexFilePath = path.resolve(srcFolder, "index.ts");
const glob = new Glob("**/*.ts");
const unitGlob = new Glob("**/*.units.ts");
const args = Bun.argv.slice(2);

const barrelFiles: ReadonlyArray<string> = await getBarrelFiles();
const fileMap = getParentFoldersFromFiles(barrelFiles);

//console.log(fileMap);

const exportMessage = `// This file is generated automatically. See README or scripts/build.ts for more details.`;

function printC(col: string, data: string, lvl: "log" | "warn" | "error" = "log") {
    const c = Bun.color(col, "ansi") ?? "";
    const r = "\x1b[0m"
    console[lvl](`${c}${data}${r}`);
}

/**
 * Returns the root folder from a file path.
 * Example: "src/utils/file.ts" -> "src"
 */
export function getRootFolder(filePath: string): string {
  // Normalize for consistent separators across OSes
  const normalized = path.normalize(filePath);

  // Split into segments
  const parts = normalized.split(path.sep).filter(Boolean);

  return parts.length > 0 ? parts[0]! : "";
}

/**
 * Return a map of the folder name and array of child files
 *
 * @param {string[]} files 
 * @returns {Map<string, string[]>} 
 */
function getParentFoldersFromFiles(files: ReadonlyArray<string>): ReadonlyMap<string, string[]> {
    const folders: Set<string> = new Set();
    const output: Map<string, string[]> = new Map();
    for (const file of files) {
        const folder = path.dirname(file);
        folders.add(folder);
    }
    for (const folder of folders) {
        const matchingFiles = files.filter((file) => {
            console.log(file);
            const rootFolderFromFile = getRootFolder(file);
            return rootFolderFromFile === folder;
        });
        output.set(folder, matchingFiles);
    }
    return output;
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

async function generateEntryPointFile(): Promise<void> {
    const exportStrings: string[] = [exportMessage];

    fileMap.forEach((_files, folder) => {
        const exportStr = `export * from "./${folder}/index.js";`;
        exportStrings.push(exportStr);
    });

    const exportString = exportStrings.join(`\n`);
    await Bun.write(indexFilePath, exportString);
}

async function generateIndexFiles(): Promise<void> {
    fileMap.forEach(async (files, folder) => {
        const indexFilePath = path.resolve(srcFolder, folder, "index.ts");
        const exportStrings: string[] = [exportMessage];
        for (const file of files) {
            if (file.endsWith("index.ts")) continue;
            const fileName = path.basename(file);
            const exportStr = `export * from "./${fileName}"`;
            exportStrings.push(exportStr);
        }

        const exportStrFinal = exportStrings.join("\n");
        await Bun.write(indexFilePath, exportStrFinal);
    });
}

async function updatePackageJSON() {
    const existingFile = packageJSON;
    const folders: Set<string> = new Set();
    const files: string[] = [];
    const newExportsObj: Record<string, { import: `${string}.js`; types: `${string}.d.ts` }> = {
        ".": {
            import: "./build/index.js",
            types: "./build.index.d.ts"
        }
    }

    for (const file of barrelFiles) {
        const folder = path.dirname(file);
        folders.add(folder);
        files.push(file);
    }

    for (const folder of folders) {
        const relFolderPath = `./${folder}`;

        newExportsObj[relFolderPath] = {
            import: `./build/${folder}/index.js`,
            types: `./build/${folder}/index.d.ts`,
        }
    }

    const newFileContents = {
        ...existingFile,
        exports: newExportsObj
    };

    await Bun.write(path.resolve(rootFolder, "package.json"), JSON.stringify(newFileContents, null, 4));
}

async function build(opts?: { fileLogging: boolean }): Promise<void> {
    console.time("Build Complete");
    console.log("Building...");
    const {
        fileLogging = true,
    } = opts || {};

    await generateEntryPointFile();

    await generateIndexFiles();

    await updatePackageJSON();

    const entryFiles = barrelFiles.map((name) => {
        return path.resolve(srcFolder, name);
    });

    entryFiles.push(indexFilePath);

    const result = await Bun.build({
        entrypoints: entryFiles,
        outdir: "build",
        minify: false,
        root: srcFolder,
        // BUG: when true, will generate duplicate exports,
        // tracked in: https://github.com/oven-sh/bun/issues/22884
        splitting: false,
    });

    if (!result.success) {
        printC("orange", "Build complete with warnings:", "warn");
        for (const log of result.logs) {
            console.log(log);
        }
    } else {
        console.timeLog("Build Complete");
        if (fileLogging) {
            let totalSize = 0;
            console.log("Built files:");
            for (const file of result.outputs) {
                printC("green", ` > ${path.basename(file.path)}`);
                totalSize += file.size;
            }
            console.log("Total size of .js files:", bytes(totalSize));
        }
    }
}

async function main() {
    if (args[0] === "--watch") {
        console.log("Running in watch mode...");

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
}

await main();

// TODO: write file verification function