import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile } from "fs/promises";
import { minify } from "terser";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  // Build server bundle with esbuild (without minification)
  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: false, // We'll use terser for minification
    external: externals,
    logLevel: "info",
  });

  // Minify with terser and remove console logs
  console.log("minifying server bundle with terser...");
  const serverCode = await readFile("dist/index.cjs", "utf-8");
  const minified = await minify(serverCode, {
    compress: {
      drop_console: true, // Remove all console.* calls
      drop_debugger: true, // Remove debugger statements
    },
    format: {
      comments: false, // Remove comments
    },
  });

  if (minified.code) {
    await writeFile("dist/index.cjs", minified.code);
  } else {
    throw new Error("Terser minification failed");
  }
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
