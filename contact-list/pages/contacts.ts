import { Locator, expect, Page } from '@playwright/test';

export class ContactsPage {
  readonly page: Page;
  readonly contactTable: Locator;
  readonly contactTableRow: Locator;
  readonly addContactForm: Locator;
  readonly addContactButton: Locator;
  readonly addContactFirstName: Locator;
  readonly addContactLastName: Locator;
  readonly addContactBirthDate: Locator;
  readonly addContactEmail: Locator;
  readonly addContactPhone: Locator;
  readonly addContactSubmitButton: Locator;
  readonly addContactCancelSubmitButton: Locator;
  readonly addContactErrorMessage: Locator;
  readonly editContactButton: Locator;
  readonly editContactForm: Locator;
  readonly editContactSubmitButton: Locator;
  readonly editContactCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTable = this.page.locator('.contactTable');
    this.contactTableRow = this.page.locator('tr.contactTableBodyRow');
    this.addContactForm = this.page.locator('form#add-contact');
    this.addContactButton = this.page.locator('button#add-contact');
    this.addContactFirstName = this.page.locator('input#firstName');
    this.addContactLastName = this.page.locator('input#lastName');
    this.addContactBirthDate = this.page.locator('input#birthdate');
    this.addContactEmail = this.page.locator('input#email');
    this.addContactPhone = this.page.locator('input#phone');
    this.addContactSubmitButton = this.page.locator('button#submit');
    this.addContactCancelSubmitButton = this.page.locator('button#cancel');
    this.addContactErrorMessage = this.page.locator('span#error');
    this.editContactButton = this.page.locator('button#edit-contact');
    this.editContactForm = this.page.locator('form#edit-contact');
    this.editContactSubmitButton = this.page.locator('button#submit');
    this.editContactCancelButton = this.page.locator('button#cancel');
  }

  async contactTableLoaded(): Promise<void> {
    await expect(this.page.getByText(/Contact List/)).toBeVisible();
    await expect(this.contactTable).toBeVisible();
  }

  async openAddContactForm(): Promise<void> {
    await this.addContactButton.click();
    await this.expectAddContactFormVisible();
  }

  async openEditContactForm(): Promise<void> {
    await this.contactTableRow.click();

    await expect(this.editContactButton).toBeVisible();
    await expect(this.editContactButton).toBeEnabled();

    await this.editContactButton.click();
  }

  async expectAddContactFormVisible(): Promise<void> {
    await expect(this.addContactForm).toBeVisible();
  }

  async expectAddContactFormNotVisible(): Promise<void> {
    await expect(this.addContactForm).toBeHidden();
  }

  async fillContactForm(input: Partial<ContactInput>): Promise<void> {
    if (input.firstName) await this.addContactFirstName.fill(input.firstName);
    if (input.lastName) await this.addContactLastName.fill(input.lastName);
    if (input.birthDate) await this.addContactBirthDate.fill(input.birthDate);
    if (input.email) await this.addContactEmail.fill(input.email);
    if (input.phone) await this.addContactPhone.fill(input.phone);
  }

  async submitContactForm(): Promise<void> {
    await this.addContactSubmitButton.click();
  }

  async expectContactVisible(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await expect(this.contactTableRow).toContainText(
      new RegExp(`${firstName} ${lastName}`),
    );
  }

  async cancelSubmitContactForm(): Promise<void> {
    await this.addContactCancelSubmitButton.click();
  }

  async createContactAndExpectError(
    input: Partial<ContactInput>,
    message: string,
  ): Promise<void> {
    await this.openAddContactForm();

    await this.fillContactForm(input);

    await this.submitContactForm();

    await expect(this.addContactErrorMessage).toContainText(message);
  }
}
