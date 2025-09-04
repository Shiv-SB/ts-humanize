import { Glob } from "bun";
import path from "node:path";
import { watch } from "fs/promises";
import packageJSON from "../package.json";

const rootFolder = path.resolve(import.meta.dir, "..");
const indexFilePath = path.resolve(rootFolder, "src", "index.ts");
const glob = new Glob("**/*.ts");
const unitGlob = new Glob("**/*.units.ts");
const args = Bun.argv.slice(2);

const barrelFiles: ReadonlyArray<string> = await getBarrelFiles();
const fileMap = getParentFoldersFromFiles(barrelFiles);

const exportMessage = `// This file is generated automatically. See README or scripts/build.ts for more details.`;

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

function changeFileExt(fileName: string, newExtWithoutDot: string): string {
    const parts = fileName.split(".");
    parts.pop();
    parts.push(newExtWithoutDot);
    return parts.join(".");
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
            const rootFolderFromFile = file.split("/")[0];
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
    const srcFolder = path.resolve(rootFolder, "src");

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
        const matchingFiles = files.filter((file) => {
            const rootFolderFromFile = file.split("/")[0];
            return rootFolderFromFile === folder;
        });

        console.table(folder, matchingFiles);

        newExportsObj[relFolderPath] = {
            import: `./build/${folder}/index.js`,
            types: `./build/${folder}/index.d.ts`,
        }
    }

    const newFileContents = {
        ...existingFile,
        exports: newExportsObj
    };

    console.log(newFileContents);
    await Bun.write(path.resolve(rootFolder, "package.json"), JSON.stringify(newFileContents, null, 4));
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

    await generateEntryPointFile();

    await generateIndexFiles();

    await updatePackageJSON();

    const entryFiles = barrelFiles.map((name) => {
        return path.resolve(rootFolder, "src", name);
    });

    entryFiles.push(path.resolve(rootFolder, "src", "index.ts"));

    const result = await Bun.build({
        entrypoints: entryFiles,
        outdir: "build",
        minify: false,
        root: path.resolve(rootFolder, "src"),
        // TODO: Remove ignore when Bun types is patched
        //@ts-ignore bug in Bun types. Should be patched in >1.2.21
        //splitting: true,
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
                printC("green", ` > ${path.basename(file.path)}`);
            }
        }
    }
}

// TODO: write file verification function