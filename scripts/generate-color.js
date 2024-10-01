import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

function generateOrUpdateColorTs(colorName, colorArray, additionalColors) {
  const themeDir = join(process.cwd(), "../src/theme");

  if (!existsSync(themeDir)) {
    mkdirSync(themeDir, { recursive: true });
  }

  const filePath = join(themeDir, "color.ts");

  let fileContent = "";
  if (existsSync(filePath)) {
    fileContent = readFileSync(filePath, "utf8");
  }

  let newColorContent = `export const ${colorName} = {\n`;

  colorArray.forEach((hexValue, index) => {
    const shade = index === 0 ? 50 : 100 * index;
    newColorContent += `  ${shade}: "#${hexValue}",${index === colorArray.length - 1 && additionalColors ? "" : "\n"}`;
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
    `${colorName} has been updated or added successfully in color.ts.`,
  );
}

function formatFile() {
  execSync("npx eslint . --fix");
}

const name = "purple";
const palette = [
  "F3E5F5",
  "E1BEE7",
  "CE93D8",
  "BA68C8",
  "AB47BC",
  "9C27B0",
  "8E24AA",
  "7B1FA2",
  "6A1B9A",
  "4A148C",
];
const additionalColors = `
  A100: "#EA80FC",
  A200: "#E040FB",
  A400: "#D500F9",
  A700: "#AA00FF",
`;

generateOrUpdateColorTs(name, palette, additionalColors);
formatFile();
