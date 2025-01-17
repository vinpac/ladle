import glob from "glob";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { format } from "prettier";

const globAsync = promisify(glob);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function main() {
  const prettierConfig = await readFile(
    path.resolve("..", "..", ".prettierrc"),
    "utf-8",
  ).then(JSON.parse);

  const files = await globAsync(
    path.resolve("lib", "app", "assets", "icons", "**", "*.svg"),
  );

  let result = "/* AUTO GENERATED by generate-icons.js. DO NOT MODIFY */\n";
  result += "import React from 'react'\n\n";

  await Promise.all(
    files.map(async (file) => {
      const rawIconContent = await readFile(file, "utf-8");
      const iconName = path.basename(file).replace(".svg", "");

      const normalizedIconContent = rawIconContent
        .replace(/stroke-width/g, "strokeWidth")
        .replace(/stroke-linecap/g, "strokeLinecap")
        .replace(/stroke-linejoin/g, "strokeLinejoin")
        .replace(/clip-path/g, "clipPath")
        .replace(/fill-opacity/g, "fillOpacity")
        .replace(/<svg(\s+(width|height)="\w+")+/g, "<svg ")
        .replace(">", "{...props}>")
        .replace(/black/g, "currentcolor");

      result += `export const ${iconName}: React.FC<React.SVGProps<SVGSVGElement>> = props => (${normalizedIconContent})\n\n`;
    }),
  );

  result += "\n";

  await writeFile(
    path.resolve("lib", "app", "src", "icons.tsx"),
    format(result, {
      ...prettierConfig,
      parser: "typescript",
    }),
  );
}

main();
