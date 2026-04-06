import { Dialog, expect, Locator, Page } from '@playwright/test';
import { ContactInput, ContactUpdateInput } from '../types/domain';
import { ContactForm } from './contact-form';

export class ContactsPage {
  readonly page: Page;
  readonly contactTable: Locator;
  readonly contactTableRow: Locator;
  readonly addContactButton: Locator;
  readonly logoutButton: Locator;
  readonly editContactButton: Locator;
  readonly deleteContactButton: Locator;
  readonly returnButton: Locator;
  readonly addForm: ContactForm;
  readonly editForm: ContactForm;
  readonly editFirstNameInput: Locator;
  readonly editLastNameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTable = page.locator('.contactTable');
    this.contactTableRow = page.locator('tr.contactTableBodyRow');
    this.addContactButton = page.locator('button#add-contact');
    this.logoutButton = page.locator('button#logout');
    this.editContactButton = page.locator('button#edit-contact');
    this.deleteContactButton = page.locator('button#delete');
    this.returnButton = page.locator('button#return');
    this.editFirstNameInput = this.page.locator('input#firstName');
    this.editLastNameInput = this.page.locator('input#lastName');

    const addRoot = page.locator('form#add-contact');
    this.addForm = new ContactForm(
      addRoot,
      page.locator('button#submit'),
      page.locator('button#cancel'),
      page.locator('span#error'),
    );

    const editRoot = page.locator('form#edit-contact');
    this.editForm = new ContactForm(
      editRoot,
      page.locator('button#submit'),
      page.locator('button#cancel'),
      page.locator('span#error'),
    );
  }

  async contactTableLoaded(): Promise<void> {
    await expect(this.page.getByText(/Contact List/)).toBeVisible();
    await expect(this.contactTable).toBeVisible();
  }

  async openAddContactForm(): Promise<void> {
    await this.addContactButton.click();
    await this.addForm.expectVisible();
  }

  async expectAddContactFormVisible(): Promise<void> {
    await this.addForm.expectVisible();
  }

  async expectAddContactFormNotVisible(): Promise<void> {
    await this.addForm.expectNotVisible();
  }

  async addContact(input: Partial<ContactInput>): Promise<void> {
    await this.openAddContactForm();
    await this.addForm.fill(input);
    await this.addForm.submit();
  }

  async submitAddContactForm(): Promise<void> {
    await this.addForm.submit();
  }

  async cancelSubmitAddContactForm(): Promise<void> {
    await this.addForm.cancel();
  }

  async expectContactVisible(
    input: Pick<ContactInput, 'firstName' | 'lastName'>,
  ): Promise<void> {
    await expect(this.contactTableRow).toContainText(
      `${input.firstName} ${input.lastName}`,
    );
  }

  async expectContactNotVisible(): Promise<void> {
    await expect(this.contactTableRow).toHaveCount(0);
  }

  async createContactAndExpectError(
    input: Partial<ContactInput>,
    message: string,
  ): Promise<void> {
    await this.addContact(input);
    await this.addForm.expectError(message);
  }

  async openEditContactForm(): Promise<void> {
    await this.contactTableRow.first().click();
  }

  async openEditForm(): Promise<void> {
    await expect(this.editContactButton).toBeVisible();
    await expect(this.editContactButton).toBeEnabled();

    await this.editContactButton.click();
    await this.editForm.expectVisible();

    await expect(this.editFirstNameInput).toBeVisible();
    await expect(this.editFirstNameInput).not.toHaveValue('');

    await expect(this.editLastNameInput).toBeVisible();
    await expect(this.editLastNameInput).not.toHaveValue('');
  }

  async editContact(
    arg1: string | Partial<ContactUpdateInput>,
    arg2?: Partial<ContactUpdateInput>,
  ): Promise<void> {
    const input = typeof arg1 === 'string' ? (arg2 ?? {}) : arg1;

    await this.openEditForm();
    await this.editForm.fill(input);
    await this.editForm.submit();
  }

  async editContactAndExpectError(
    arg1: Partial<ContactUpdateInput>,
    arg2: string,
    arg3?: string,
  ): Promise<void> {
    const message = arg3 ?? arg2;

    await this.openEditForm();
    await this.editForm.fill(arg1);
    await this.editForm.submit();
    await this.editForm.expectError(message);
  }

  async deleteContact(): Promise<void> {
    await expect(this.deleteContactButton).toBeVisible();
    await expect(this.deleteContactButton).toBeEnabled();

    this.page.once('dialog', async (dialog: Dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('delete');
      await dialog.accept();
    });

    await this.deleteContactButton.click();
  }

  async logout(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toBeEnabled();
    await this.logoutButton.click();
  }
}
