import { Locator, expect, Page } from '@playwright/test';
import { RegistrationInput } from '../types/domain';

export class RegistrationPage {
  readonly page: Page;
  readonly signUpForm: Locator;
  readonly signUpFirstName: Locator;
  readonly signUpLastName: Locator;
  readonly signUpEmail: Locator;
  readonly signUpPassword: Locator;
  readonly signUpButton: Locator;
  readonly signUpSubmitButton: Locator;
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
    this.errorMessage = this.page.locator('#error');
  }

  async gotoSignUp(): Promise<void> {
    await this.page.goto('/');
    await expect(this.signUpButton).toBeVisible();
    await expect(this.signUpButton).toBeEnabled();
    await this.signUpButton.click();
    await expect(this.page.getByText(/Add User/)).toBeVisible();
  }

  async signUp(data: Partial<RegistrationInput>): Promise<void> {
    await this.expectSignUpFormVisible();

    if (data.firstName !== undefined) {
      await this.signUpFirstName.fill(data.firstName);
      await expect(this.signUpFirstName).toHaveValue(data.firstName);
    }
    if (data.lastName !== undefined) {
      await this.signUpLastName.fill(data.lastName);
      await expect(this.signUpLastName).toHaveValue(data.lastName);
    }
    if (data.email !== undefined) {
      await this.signUpEmail.fill(data.email);
      await expect(this.signUpEmail).toHaveValue(data.email);
    }
    if (data.password !== undefined) {
      await this.signUpPassword.fill(data.password);
      await expect(this.signUpPassword).toHaveValue(data.password);
    }

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
    await expect(this.errorMessage).toContainText(message, { timeout: 10000 });
  }
}
