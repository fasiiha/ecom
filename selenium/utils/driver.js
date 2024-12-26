import { Builder, Capabilities } from "selenium-webdriver";

export async function setupDriver() {
  const capabilities = Capabilities.chrome();
  capabilities.set("chromeOptions", {
    args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
  });

  const driver = await new Builder()
    .withCapabilities(capabilities)
    .forBrowser("chrome")
    .build();

  return driver;
}
