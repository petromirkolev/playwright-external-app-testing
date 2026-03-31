import { Locator, expect, Page } from '@playwright/test';

export class ContactsPage {
  readonly page: Page;
  readonly contactTable: Locator;
  readonly contactTableBody: Locator;
  readonly contactTableRow: Locator;
  readonly addContactForm: Locator;
  readonly addContactButton: Locator;
  readonly addContactFirstName: Locator;
  readonly addContactLastName: Locator;
  readonly addContactBirthDate: Locator;
  readonly addContactEmail: Locator;
  readonly addContactPhone: Locator;
  readonly addContactStreet1: Locator;
  readonly addContactStreet2: Locator;
  readonly addContactCity: Locator;
  readonly addContactState: Locator;
  readonly addContactPostalCode: Locator;
  readonly addContactCountry: Locator;
  readonly addContactSubmitButton: Locator;
  readonly addContactCancelSubmitButton: Locator;
  readonly addContactErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTable = this.page.locator('.contactTable');
    this.contactTableBody = this.page.locator(
      '#myTable tr.contactTableBodyRow',
    );
    this.contactTableRow = this.page.locator('.contactTableBodyRow');
    this.addContactForm = this.page.locator('form#add-contact');
    this.addContactButton = this.page.locator('#add-contact');
    this.addContactFirstName = this.page.locator('#firstName');
    this.addContactLastName = this.page.locator('#lastName');
    this.addContactBirthDate = this.page.locator('#birthdate');
    this.addContactEmail = this.page.locator('#email');
    this.addContactPhone = this.page.locator('#phone');
    this.addContactStreet1 = this.page.locator('#street1');
    this.addContactStreet2 = this.page.locator('#street2');
    this.addContactCity = this.page.locator('#city');
    this.addContactState = this.page.locator('#stateProvince');
    this.addContactPostalCode = this.page.locator('#postalCode');
    this.addContactCountry = this.page.locator('#country');
    this.addContactSubmitButton = this.page.locator('#submit');
    this.addContactCancelSubmitButton = this.page.locator('#cancel');
    this.addContactErrorMessage = this.page.locator('#error');
  }

  async contactListLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Contact List/);
    await expect(this.contactTable).toBeVisible();
  }

  async openAddContactForm(): Promise<void> {
    await this.addContactButton.click();
    await this.expectAddContactFormVisible();
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
    if (input.street1) await this.addContactStreet1.fill(input.street1);
    if (input.street2) await this.addContactStreet2.fill(input.street2);
    if (input.city) await this.addContactCity.fill(input.city);
    if (input.state) await this.addContactState.fill(input.state);
    if (input.postalCode)
      await this.addContactPostalCode.fill(input.postalCode);
    if (input.country) await this.addContactCountry.fill(input.country);
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
