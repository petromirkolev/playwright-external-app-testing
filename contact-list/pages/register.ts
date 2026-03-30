import { Locator, expect, Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly signUpForm: Locator;
  readonly signUpFirstName: Locator;
  readonly signUpLastName: Locator;
  readonly signUpEmail: Locator;
  readonly signUpPassword: Locator;
  readonly signUpButton: Locator;
  readonly signUpSubmitButton: Locator;
  readonly logOutButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.locator('#signup');
    this.signUpForm = this.page.locator('#add-user');
    this.signUpFirstName = this.signUpForm.getByPlaceholder('First Name');
    this.signUpLastName = this.signUpForm.getByPlaceholder('Last Name');
    this.signUpEmail = this.signUpForm.getByPlaceholder('Email');
    this.signUpPassword = this.signUpForm.getByPlaceholder('Password');
    this.signUpSubmitButton = this.page.locator('#submit');
    this.logOutButton = this.page.locator('#logout');
    this.errorMessage = this.page.locator('#error');
  }

  async gotoSignUp(): Promise<void> {
    await this.signUpButton.click();
    await expect(this.page.getByText(/Add User/)).toBeVisible();
  }

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.gotoSignUp();
    await this.signUpFirstName.fill(firstName);
    await this.signUpLastName.fill(lastName);
    await this.signUpEmail.fill(email);
    await this.signUpPassword.fill(password);
    await this.signUpSubmitButton.click();
  }

  async expectSignUpFormVisible(): Promise<void> {
    await expect(this.signUpFirstName).toBeAttached();
    await expect(this.signUpFirstName).toBeVisible();

    await expect(this.signUpLastName).toBeAttached();
    await expect(this.signUpLastName).toBeVisible();

    await expect(this.signUpEmail).toBeAttached();
    await expect(this.signUpEmail).toBeVisible();

    await expect(this.signUpPassword).toBeAttached();
    await expect(this.signUpPassword).toBeVisible();
  }

  async expectSignUpFormNotVisible(): Promise<void> {
    await expect(this.signUpFirstName).toBeHidden();
    await expect(this.signUpLastName).toBeHidden();
    await expect(this.signUpEmail).toBeHidden();
    await expect(this.signUpPassword).toBeHidden();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}
