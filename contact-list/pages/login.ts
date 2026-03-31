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

    await expect(this.page.getByText(/Contact List App/i)).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.expectLoginFormVisible();

    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);

    await expect(this.loginEmail).toHaveValue(email);
    await expect(this.loginPassword).toHaveValue(password);

    await this.loginButton.click();
    await this.expectSuccess();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.loginEmail).toBeAttached();
    await expect(this.loginEmail).toBeVisible();

    await expect(this.loginPassword).toBeAttached();
    await expect(this.loginPassword).toBeVisible();

    await expect(this.loginButton).toBeAttached();
    await expect(this.loginButton).toBeVisible();

    await expect(this.loginButton).toBeEnabled();
    await expect(this.signUpButton).toBeEnabled();
  }

  async expectSuccess(): Promise<void> {
    await expect(
      this.page.getByText(/Click on any contact to view the Contact Details/),
    ).toBeVisible();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);

    await expect(
      this.page.getByText(/Click on any contact to view the Contact Details/),
    ).not.toBeVisible();
  }
}
