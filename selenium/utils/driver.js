import { Builder, Capabilities } from "selenium-webdriver";

export async function setupDriver() {
  const capabilities = Capabilities.chrome();
  capabilities.set("goog:chromeOptions", {
    args: [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--remote-debugging-port=9222",
      "--disable-web-security",
      "--allow-insecure-localhost",
    ],
  });

  const driver = await new Builder()
    .withCapabilities(capabilities)
    .forBrowser("chrome")
    .build();

  return driver;
}
