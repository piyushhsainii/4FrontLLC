#!/usr/bin/env node
/**
 * generate-manifest.mjs
 * ----------------------
 * Scans your real public/ folders and writes project-manifest.ts with
 * file lists that ALWAYS match what's actually on disk. No more manually
 * guessing counts (50 vs 158, etc.) — run this any time you add/remove
 * assets and the manifest regenerates itself from reality.
 *
 * Usage:
 *   node scripts/generate-manifest.mjs
 *
 * Recommended: wire into package.json so it runs automatically:
 *   "scripts": {
 *     "prebuild": "node scripts/generate-manifest.mjs",
 *     "predev": "node scripts/generate-manifest.mjs"
 *   }
 */

import { readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(PROJECT_ROOT, "public");
const OUTPUT_PATH = join(PROJECT_ROOT, "app", "projects", "project-manifest.ts");

// ---- EXCLUSIONS ---------------------------------------------------------
// Anything in here is skipped no matter which category/folder it lives in.
// Add to these lists as you find more non-project assets sitting in public/
// (logos, avatars, docs, stray folders, etc.) — everything else is still
// picked up automatically, so you only ever have to list what to leave out.

// Exact filenames to exclude, case-insensitive (compared against the
// basename only, so this works regardless of which folder it's found in).
const EXCLUDE_FILES = [
  "4frontmetadata.png",
];

// Folder names to exclude entirely — if a directory with this name is
// encountered while scanning, it (and everything inside it) is skipped.
const EXCLUDE_DIRS = [
  "p3",
  "p5",
  "Project1",
  "Project2",
];

const excludeFilesLower = new Set(EXCLUDE_FILES.map((f) => f.toLowerCase()));
const excludeDirsLower = new Set(EXCLUDE_DIRS.map((d) => d.toLowerCase()));

function isExcludedFile(name) {
  return excludeFilesLower.has(name.toLowerCase());
}

function isExcludedDir(name) {
  return excludeDirsLower.has(name.toLowerCase());
}
// -------------------------------------------------------------------------

// ---- CONFIGURE YOUR CATEGORIES HERE -----------------------------------
// dir: folder relative to public/ ("" = public root itself)
// match: file extensions to include
const CATEGORY_DEFS = [
  {
    id: "newlyFinished",
    label: "Newly Finished",
    kind: "image",
    dir: "newly-finished-files",
    match: [".jpg", ".jpeg", ".png"], // handles mixed jpg/png in this folder too
  },
  {
    id: "completedProjects",
    label: "Completed Projects",
    kind: "image",
    dir: "", // public root — jpg AND png live here, mixed by number
    match: [".jpg", ".jpeg", ".png"],
  },
  {
    id: "popular",
    label: "Popular Projects",
    kind: "image",
    dir: "", // public root — webp, separate set from jpg/png above
    match: [".webp"],
  },
  {
    id: "videos",
    label: "Video Walkthroughs",
    kind: "video",
    dir: "",
    match: [".mp4"],
  },
];
// -------------------------------------------------------------------------

function naturalSort(a, b) {
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b);
}

function scanFolder(dir, extensions) {
  // Skip the whole folder if its own name is excluded (covers nested
  // category dirs like "newly-finished-files/p3" if ever configured).
  const dirBaseName = dir.split("/").filter(Boolean).pop();
  if (dirBaseName && isExcludedDir(dirBaseName)) {
    console.log(`⏭️  Skipping excluded folder: /${dir}`);
    return [];
  }

  const fullPath = dir ? join(PUBLIC_DIR, dir) : PUBLIC_DIR;
  let entries;
  try {
    entries = readdirSync(fullPath);
  } catch {
    console.warn(`⚠️  Folder not found: ${fullPath} — skipping.`);
    return [];
  }

  const excludedSkipped = [];

  const files = entries
    .filter((name) => {
      const full = join(fullPath, name);

      if (statSync(full).isDirectory()) {
        // Directory entries never end up in a file list, but if it's one
        // of our excluded dirs, log it so it's obvious it was intentionally
        // left out (helps when someone later adds recursion).
        if (isExcludedDir(name)) {
          excludedSkipped.push(`(folder) ${name}`);
        }
        return false;
      }

      if (!extensions.includes(extname(name).toLowerCase())) return false;

      if (isExcludedFile(name)) {
        excludedSkipped.push(name);
        return false;
      }

      return true;
    })
    .sort(naturalSort);

  if (excludedSkipped.length) {
    console.log(`   ⏭️  Excluded from /${dir || ""}: ${excludedSkipped.join(", ")}`);
  }

  return files;
}

const results = CATEGORY_DEFS.map((cat) => {
  const files = scanFolder(cat.dir, cat.match);
  console.log(`✓ ${cat.id}: ${files.length} files found in /public/${cat.dir || ""}`);
  return { ...cat, files };
});

const basePathFor = (dir) => (dir ? `/${dir}/` : `/`);

const fileLine = (cat) =>
  `export const ${constName(cat.id)}_FILES: string[] = ${JSON.stringify(cat.files, null, 2)};`;

function constName(id) {
  return id.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
}

const output = `// ⚠️ AUTO-GENERATED by scripts/generate-manifest.mjs — do not hand-edit.
// Run \`node scripts/generate-manifest.mjs\` after adding/removing files in public/.

export type MediaKind = "image" | "video";

export interface CategoryConfig {
  id: string;
  label: string;
  kind: MediaKind;
  basePath: string;
  files: string[];
}

${results.map(fileLine).join("\n\n")}

export const CATEGORIES: CategoryConfig[] = [
${results
  .map(
    (cat) => `  {
    id: ${JSON.stringify(cat.id)},
    label: ${JSON.stringify(cat.label)},
    kind: ${JSON.stringify(cat.kind)},
    basePath: ${JSON.stringify(basePathFor(cat.dir))},
    files: ${constName(cat.id)}_FILES,
  },`
  )
  .join("\n")}
];

export function assetUrl(category: CategoryConfig, filename: string): string {
  return \`\${category.basePath}\${filename}\`;
}
`;

writeFileSync(OUTPUT_PATH, output, "utf-8");
console.log(`\n✅ Wrote ${OUTPUT_PATH}`);
