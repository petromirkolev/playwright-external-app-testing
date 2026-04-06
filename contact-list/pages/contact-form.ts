import { expect, Locator } from '@playwright/test';
import { ContactUpdateInput } from '../types/domain';

export class ContactForm {
  constructor(
    private readonly root: Locator,
    private readonly submitButton: Locator,
    private readonly cancelButton: Locator,
    private readonly errorMessage: Locator,
  ) {}

  get firstName() {
    return this.root.locator('input#firstName');
  }

  get lastName() {
    return this.root.locator('input#lastName');
  }

  get birthDate() {
    return this.root.locator('input#birthdate');
  }

  get email() {
    return this.root.locator('input#email');
  }

  get phone() {
    return this.root.locator('input#phone');
  }

  async expectVisible() {
    await expect(this.root).toBeVisible();
  }

  async expectNotVisible() {
    await expect(this.root).toBeHidden();
  }

  async fill(input: Partial<ContactUpdateInput>) {
    if (input.firstName !== undefined) {
      await this.firstName.fill(input.firstName);
    }
    if (input.lastName !== undefined) {
      await this.lastName.fill(input.lastName);
    }
    if (input.birthDate !== undefined) {
      await this.birthDate.fill(input.birthDate);
    }
    if (input.email !== undefined) {
      await this.email.fill(input.email);
    }
    if (input.phone !== undefined) {
      await this.phone.fill(input.phone);
    }
  }

  async submit() {
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  async cancel() {
    await expect(this.cancelButton).toBeVisible();
    await this.cancelButton.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
