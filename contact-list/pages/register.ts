import { Locator, test, expect, Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly signUpForm: Locator;
  readonly signUpFirstName: Locator;
  readonly signUpLastName: Locator;
  readonly signUpEmail: Locator;
  readonly signUpPassword: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpForm = this.page.locator('#add-user');
    this.signUpFirstName = this.signUpForm.getByPlaceholder('First Name');
    this.signUpLastName = this.signUpForm.getByPlaceholder('Last Name');
    this.signUpEmail = this.signUpForm.getByPlaceholder('Email');
    this.signUpPassword = this.signUpForm.getByPlaceholder('Password');
    this.signUpButton = this.page.locator('#signup');
  }

  async gotoSignUp(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page.getByText(/Contact List App/)).toBeVisible();

    await this.signUpButton.click();
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

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.signUpFirstName.fill('Petromir');
    await this.signUpLastName.fill('Kolev');
    await this.signUpEmail.fill('Kolev');
    await this.signUpPassword.fill('Kolev');
    await this.signUpButton.click();
  }
}
