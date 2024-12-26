import fs from "fs";

export async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }
  fs.writeFileSync(`screenshots/${name}.png`, screenshot, "base64");
}
