import { By } from "selenium-webdriver";
import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.emailInput = By.css('input[type="email"]');
    this.passwordInput = By.css('input[type="password"]');
    this.loginButton = By.css('button[type="submit"]');
  }

  async login(email, password) {
    await this.navigateTo("/login");
    await this.waitForElement(this.emailInput);
    await this.driver.findElement(this.emailInput).sendKeys(email);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getErrorMessage() {
    try {
      const errorElement = await this.driver.findElement(this.errorMessage);
      return await errorElement.getText();
    } catch (error) {
      return null;
    }
  }
  async isLoginButtonEnabled() {
    const button = await this.driver.findElement(this.loginButton);
    return await button.isEnabled();
  }

  async clearInputs() {
    await this.driver.findElement(this.emailInput).clear();
    await this.driver.findElement(this.passwordInput).clear();
  }
}
