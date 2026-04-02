# Contact List App - Playwright UI + API Test Suite

A complete **UI + API** automation test suite for the [Thinking Tester Contact List](https://thinking-tester-contact-list.herokuapp.com/) demo application.

Built as a **QA Automation portfolio project** to demonstrate modern testing practices, clean architecture, and production-ready test setup.

---

## ✨ Highlights

- Full **UI test suite** with Page Object Model
- Full **API test suite** with comprehensive validation
- **Allure HTML reporting** for beautiful test reports
- Parallel execution, retries, and CI-ready config

---

## 🛠 Tech Stack

- **Playwright** v1.58+
- **TypeScript**
- Page Object Model + Fixtures
- API testing (Playwright Request)
- **Allure** reporting

---

## 📁 Project Structure

```text
tests/
├── smoke.spec.ts
├── login.spec.ts
├── register.spec.ts
├── contacts.spec.ts
└── api/ ← Full API test suite
├── auth.api.spec.ts
├── create-contact.api.spec.ts
├── edit-contact.api.spec.ts
├── delete-contact.api.spec.ts
├── update-user.api.spec.ts
└── delete-user.api.spec.ts
fixtures/ # Shared UI + API fixtures
pages/ # Page Objects
utils/
├── api-helpers.ts
├── test-data-factory.ts ← New: Test data factory
├── test-data.ts
└── constants.ts
```

## 🚀 How to Run

### Install dependencies

```bash
npm install
```

### Run all tests (UI + API)

```bash
npm test
```

### Run only API tests

```bash
npm run test:api
```

### Run with Allure HTML report

```bash
npm run test:allure
```

### Run with UI mode (debugging)

```bash
npm run test:ui
```

### Run headed

```bash
npm run test:headed
```

## 📊 What’s Covered

### UI Tests

- Registration & Login (happy + negative paths)
- Contact CRUD + field validation
- Session behavior & persistence

### API Tests

- User registration, login, update, delete
- Contact create, read, update, delete
- Full validation & error message checking

Status:
<img src="https://github.com/petromirkolev/contact-list/actions/workflows/playwright.yml/badge.svg" alt="Playwright Tests">

Made with ❤️ as a QA Automation portfolio project.
