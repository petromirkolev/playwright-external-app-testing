import { Dialog, expect, Locator, Page } from '@playwright/test';
import { ContactInput, ContactUpdateInput } from '../types/domain';
import { ContactForm } from './contact-form';

export class ContactsPage {
  readonly contactTable: Locator;
  readonly contactRows: Locator;
  readonly addContactButton: Locator;
  readonly logoutButton: Locator;
  readonly addForm: ContactForm;
  readonly editForm: ContactForm;
  readonly editContactButton: Locator;
  readonly deleteContactButton: Locator;

  constructor(readonly page: Page) {
    this.contactTable = page.locator('.contactTable');
    this.contactRows = page.locator('tr.contactTableBodyRow');
    this.addContactButton = page.locator('#add-contact');
    this.logoutButton = page.locator('#logout');

    const addRoot = page.locator('form#add-contact');
    this.addForm = new ContactForm(
      addRoot,
      addRoot.locator('#submit'),
      addRoot.locator('#cancel'),
      addRoot.locator('#error'),
    );

    const editRoot = page.locator('form#edit-contact');
    this.editForm = new ContactForm(
      editRoot,
      editRoot.locator('#submit'),
      editRoot.locator('#cancel'),
      editRoot.locator('#error'),
    );

    this.editContactButton = page.locator('button#edit-contact');
    this.deleteContactButton = page.locator('button#delete');
  }

  async expectLoaded() {
    await expect(this.page.getByText(/Contact List/)).toBeVisible();
    await expect(this.contactTable).toBeVisible();
  }

  async openAddForm() {
    await this.addContactButton.click();
    await this.addForm.expectVisible();
  }

  async addContact(input: ContactInput | ContactUpdateInput) {
    await this.openAddForm();
    await this.addForm.fill(input);
    await this.addForm.submit();
  }

  async openFirstContact() {
    await this.contactRows.first().click();
  }

  async openEditForm() {
    await expect(this.editContactButton).toBeVisible();
    await expect(this.editContactButton).toBeEnabled();
    await this.editContactButton.click();
    await this.editForm.expectVisible();
  }

  async editContact(input: ContactUpdateInput) {
    await this.openEditForm();
    await this.editForm.fill(input);
    await this.editForm.submit();
  }

  async deleteSelectedContact() {
    this.page.once('dialog', async (dialog: Dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await this.deleteContactButton.click();
  }

  async expectContactVisible(
    contact: Pick<ContactInput, 'firstName' | 'lastName'>,
  ) {
    await expect(this.contactRows).toContainText(
      `${contact.firstName} ${contact.lastName}`,
    );
  }

  async expectNoContacts() {
    await expect(this.contactRows).toHaveCount(0);
  }

  async logout() {
    await this.logoutButton.click();
  }
}
