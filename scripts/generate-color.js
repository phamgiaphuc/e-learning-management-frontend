import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

function generateOrUpdateColorTs(
  fileName,
  colorName,
  colorArray,
  additionalColors,
) {
  const themeDir = join(process.cwd(), "../src/theme");

  if (!existsSync(themeDir)) {
    mkdirSync(themeDir, { recursive: true });
  }

  const filePath = join(themeDir, `${fileName}.ts`);

  let fileContent = "";
  if (existsSync(filePath)) {
    fileContent = readFileSync(filePath, "utf8");
  }

  let newColorContent = `export const ${colorName} = {\n`;

  colorArray.forEach((hexValue, index) => {
    const shade = index === 0 ? 50 : 100 * index;
    newColorContent += `  ${shade}: ${hexValue.includes("#") ? `"${hexValue}"` : `"#${hexValue}"`},${index === colorArray.length - 1 && additionalColors ? "" : "\n"}`;
  });

  newColorContent += additionalColors;
  newColorContent += "};\n";

  const colorRegex = new RegExp(`export const ${colorName} = {[^}]*};`, "gm");
  if (fileContent.match(colorRegex)) {
    fileContent = fileContent.replace(colorRegex, newColorContent);
  } else {
    fileContent += `\n${newColorContent}`;
  }

  fileContent = fileContent.trim();
  fileContent += `\n`;

  writeFileSync(filePath, fileContent, "utf8");
  console.log(
    `${colorName} has been updated or added successfully in ${fileName}.ts.`,
  );
}

function formatFile() {
  execSync("npx eslint . --fix");
}

const fileName = "tailwind-color";
const name = "zinc";
const palette = [
  "#FAFAFA",
  "#F4F4F5",
  "#E4E4E7",
  "#D4D4D8",
  "#A1A1AA",
  "#71717A",
  "#52525B",
  "#3F3F46",
  "#27272A",
  "#18181B",
  "#09090B",
];
const additionalColors = ``;

generateOrUpdateColorTs(fileName, name, palette, additionalColors);
formatFile();
