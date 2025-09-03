import { Glob } from "bun";
import path from "node:path";
import { watch } from "fs/promises";
import fs from "node:fs/promises";

// root dir without trailing slash
const root = path.resolve(import.meta.dir, "..");
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
    const srcFolder = path.resolve(root, "src");

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

async function build(opts?: { fileLogging: boolean }): Promise<void> {
    console.time("Build Complete");
    console.log("Building...");
    const {
        fileLogging = true,
    } = opts || { };

    const srcFolder = path.resolve(root, "src");

    const exportStrings: string[] = [];

    for await (const file of glob.scan("./src")) {
        if (unitGlob.match(file)) continue;

        if (file === "index.ts") continue;

        const exportStr = `export * from "./${file}";`;
        exportStrings.push(exportStr);
    }

    const indexFilePath = path.resolve(srcFolder, "index.ts")
    const indexFile = Bun.file(indexFilePath);

    if (!await indexFile.exists()) {
        Bun.write(indexFilePath, "");
    }

    const finalExportStr = exportStrings.join("\n");
    await Bun.write(indexFile, finalExportStr);


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

