import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const routes = [
  "design-dev",
  "furniture",
  "projects",
  "35mm",
  "about",
  "contact",
  "furniture/furniture-projects/good-move-floating-shelves",
  "furniture/furniture-projects/poplar-coffee-table",
  "furniture/furniture-projects/hand-built-shelf-risers",
  "furniture/furniture-projects/cane-replacement-chrome-restoration",
];

await Promise.all(routes.map(async (route) => {
  const target = join("dist", route, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join("dist", "index.html"), target);
}));

await copyFile(join("dist", "index.html"), join("dist", "404.html"));
