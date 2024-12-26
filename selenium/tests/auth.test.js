import { expect } from "chai";
import { LoginPage } from "../pages/LoginPage.js";
import { setupDriver } from "../utils/driver.js";

describe("Authentication Tests", function () {
  let driver;
  let loginPage;

  before(async function () {
    driver = await setupDriver();
    loginPage = new LoginPage(driver);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async function () {
    await loginPage.navigateTo("/login");
    await loginPage.clearInputs();
  });

  it("should display login form correctly", async function () {
    const emailInput = await driver.findElement(loginPage.emailInput);
    const passwordInput = await driver.findElement(loginPage.passwordInput);
    const loginButton = await driver.findElement(loginPage.loginButton);

    expect(await emailInput.isDisplayed()).to.be.true;
    expect(await passwordInput.isDisplayed()).to.be.true;
    expect(await loginButton.isDisplayed()).to.be.true;
  });

  it("should validate email format", async function () {
    await driver.findElement(loginPage.emailInput).sendKeys("fasihaa@mail.com");
    await driver.findElement(loginPage.passwordInput).sendKeys("password123");

    expect(await loginPage.isLoginButtonEnabled()).to.be.false;
  });

  it("should enable login button with valid inputs", async function () {
    await driver.findElement(loginPage.emailInput).sendKeys("fasihaa@mail.com");
    await driver.findElement(loginPage.passwordInput).sendKeys("password123");

    expect(await loginPage.isLoginButtonEnabled()).to.be.true;
  });

  it("should show error message with invalid credentials", async function () {
    await loginPage.login("wrong@email.com", "wrongpassword");

    await driver.sleep(1000);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.equal("Credentials are wrong.");

    await takeScreenshot(driver, "login-error");
  });

  it("should login successfully with valid credentials", async function () {
    await loginPage.login("fasihaa@mail.com", "Fasiha123");

    await driver.sleep(1000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("/");
  });

  it("should maintain button disabled state with empty inputs", async function () {
    expect(await loginPage.isLoginButtonEnabled()).to.be.false;
  });

  it("should clear inputs after refresh", async function () {
    await driver.findElement(loginPage.emailInput).sendKeys("fasihaa@mail.com");
    await driver.findElement(loginPage.passwordInput).sendKeys("password123");

    await driver.navigate().refresh();

    const emailValue = await driver
      .findElement(loginPage.emailInput)
      .getAttribute("value");
    const passwordValue = await driver
      .findElement(loginPage.passwordInput)
      .getAttribute("value");

    expect(emailValue).to.equal("");
    expect(passwordValue).to.equal("");
  });
});
