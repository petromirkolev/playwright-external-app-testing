# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> Register >> Sign up with missing last name is rejected
- Location: tests/register.spec.ts:51:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#error')
Expected substring: "User validation failed: lastName: Path `lastName` is required."
Received string:    ""
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('#error')
    14 × locator resolved to <span id="error"></span>
       - unexpected value ""

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - heading "Add User" [level=1] [ref=e3]
    - paragraph [ref=e4]: Sign up to begin adding your contacts!
    - generic [ref=e5]:
      - paragraph [ref=e6]:
        - textbox "First Name" [ref=e7]
      - paragraph [ref=e8]:
        - textbox "Last Name" [ref=e9]
      - paragraph [ref=e10]:
        - textbox "Email" [ref=e11]
      - paragraph [ref=e12]:
        - textbox "Password" [ref=e13]
    - paragraph [ref=e14]:
      - button "Submit" [ref=e15]
      - button "Cancel" [ref=e16]
  - contentinfo [ref=e17]:
    - paragraph [ref=e18]: Created by Kristin Jackvony, Copyright 2021
    - img [ref=e19]
```

# Test source

```ts
  1  | import { Locator, expect, Page } from '@playwright/test';
  2  | import { RegistrationData } from '../types/auth';
  3  | 
  4  | export class RegistrationPage {
  5  |   readonly page: Page;
  6  |   readonly signUpForm: Locator;
  7  |   readonly signUpFirstName: Locator;
  8  |   readonly signUpLastName: Locator;
  9  |   readonly signUpEmail: Locator;
  10 |   readonly signUpPassword: Locator;
  11 |   readonly signUpButton: Locator;
  12 |   readonly signUpSubmitButton: Locator;
  13 |   readonly logOutButton: Locator;
  14 |   readonly errorMessage: Locator;
  15 | 
  16 |   constructor(page: Page) {
  17 |     this.page = page;
  18 |     this.signUpButton = this.page.locator('#signup');
  19 |     this.signUpForm = this.page.locator('#add-user');
  20 |     this.signUpFirstName = this.signUpForm.getByPlaceholder('First Name');
  21 |     this.signUpLastName = this.signUpForm.getByPlaceholder('Last Name');
  22 |     this.signUpEmail = this.signUpForm.getByPlaceholder('Email');
  23 |     this.signUpPassword = this.signUpForm.getByPlaceholder('Password');
  24 |     this.signUpSubmitButton = this.page.locator('#submit');
  25 |     this.logOutButton = this.page.locator('#logout');
  26 |     this.errorMessage = this.page.locator('#error');
  27 |   }
  28 | 
  29 |   async gotoSignUp(): Promise<void> {
  30 |     await this.page.goto('/');
  31 |     await expect(this.signUpButton).toBeVisible();
  32 |     await expect(this.signUpButton).toBeEnabled();
  33 |     await this.signUpButton.click();
  34 |     await expect(this.page.getByText(/Add User/)).toBeVisible();
  35 |   }
  36 | 
  37 |   async signUp(data: Partial<RegistrationData>): Promise<void> {
  38 |     await this.expectSignUpFormVisible();
  39 | 
  40 |     if (data.firstName !== undefined) {
  41 |       await this.signUpFirstName.fill(data.firstName);
  42 |       await expect(this.signUpFirstName).toHaveValue(data.firstName);
  43 |     }
  44 | 
  45 |     if (data.lastName !== undefined) {
  46 |       await this.signUpLastName.fill(data.lastName);
  47 |       await expect(this.signUpLastName).toHaveValue(data.lastName);
  48 |     }
  49 |     if (data.email !== undefined) {
  50 |       await this.signUpEmail.fill(data.email);
  51 |       await expect(this.signUpEmail).toHaveValue(data.email);
  52 |     }
  53 |     if (data.password !== undefined) {
  54 |       await this.signUpPassword.fill(data.password);
  55 |       await expect(this.signUpPassword).toHaveValue(data.password);
  56 |     }
  57 | 
  58 |     await this.signUpSubmitButton.click();
  59 |   }
  60 | 
  61 |   async expectSignUpFormVisible(): Promise<void> {
  62 |     await expect(this.signUpFirstName).toBeAttached();
  63 |     await expect(this.signUpFirstName).toBeVisible();
  64 | 
  65 |     await expect(this.signUpLastName).toBeAttached();
  66 |     await expect(this.signUpLastName).toBeVisible();
  67 | 
  68 |     await expect(this.signUpEmail).toBeAttached();
  69 |     await expect(this.signUpEmail).toBeVisible();
  70 | 
  71 |     await expect(this.signUpPassword).toBeAttached();
  72 |     await expect(this.signUpPassword).toBeVisible();
  73 |   }
  74 | 
  75 |   async expectSignUpFormNotVisible(): Promise<void> {
  76 |     await expect(this.signUpFirstName).toBeHidden();
  77 |     await expect(this.signUpLastName).toBeHidden();
  78 |     await expect(this.signUpEmail).toBeHidden();
  79 |     await expect(this.signUpPassword).toBeHidden();
  80 |   }
  81 | 
  82 |   async expectError(message: string): Promise<void> {
> 83 |     await expect(this.errorMessage).toContainText(message, { timeout: 10000 });
     |                                     ^ Error: expect(locator).toContainText(expected) failed
  84 |   }
  85 | }
  86 | 
```