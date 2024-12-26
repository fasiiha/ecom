import { until } from "selenium-webdriver";
import { config } from "../utils/config.js";

export class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateTo(path) {
    await this.driver.get(`${config.baseUrl}${path}`);
  }

  async waitForElement(locator) {
    await this.driver.wait(
      until.elementLocated(locator),
      config.defaultTimeout
    );
  }
}
