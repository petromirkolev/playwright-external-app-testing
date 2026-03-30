import { Locator, expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly apiDocsLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmail = this.page.locator('#email');
    this.loginPassword = this.page.locator('#password');
    this.loginButton = this.page.locator('#submit');
    this.signUpButton = this.page.locator('#signup');
    this.apiDocsLink = this.page.locator(
      'a[href*="documenter.getpostman.com"]',
    );
    this.errorMessage = this.page.locator('#error');
  }

  async gotoHome(): Promise<void> {
    await this.page.goto('/');
  }

  async gotoSignUp(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Contact List App/);

    await expect(this.signUpButton).toBeVisible();
    await this.signUpButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.loginEmail).toBeAttached();
    await expect(this.loginEmail).toBeVisible();

    await expect(this.loginPassword).toBeAttached();
    await expect(this.loginPassword).toBeVisible();

    await expect(this.loginButton).toBeAttached();
    await expect(this.loginButton).toBeVisible();
  }

  async expectSuccess(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }
}
