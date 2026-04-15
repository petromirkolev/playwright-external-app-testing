# Contact List App - Playwright UI + API Test Suite

[![External App Tests](https://github.com/petromirkolev/playwright-external-app-testing/actions/workflows/external-apps.yml/badge.svg)](https://github.com/petromirkolev/playwright-external-app-testing/actions/workflows/external-apps.yml)

A Playwright-based **UI + API** automation suite for the [Thinking Tester Contact List](https://thinking-tester-contact-list.herokuapp.com/) demo application.

This project is part of my QA Automation portfolio and focuses on testing a third-party/public app that I do not control. The goal is to show practical QA skills: test design, UI automation, API validation, reusable fixtures/helpers, and mechanical debugging of live public environments.

---

## ✨ Highlights

- UI coverage with Page Object Model
- API coverage for core user and contact flows
- Reusable fixtures, helpers, and typed test data
- CI workflow with Playwright
- Allure reporting support

---

## Important note about the public app

This suite targets a live public demo application. Because the backend is external, behavior can occasionally differ from the documented contract or become temporarily unstable.

When that happens, the goal is not to "force green tests", but to:

- verify the request contract
- compare behavior across Playwright and Postman
- distinguish test issues from live API defects
- document known external issues clearly

Some scenarios are intentionally quarantined when the public demo app behaves inconsistently, so the suite reflects the live environment honestly rather than forcing green results.

---

## 🛠 Tech Stack

- Playwright
- TypeScript
- Playwright Request API
- Fixtures + reusable helpers
- Page Object Model
- Allure reporting

---

## 📁 Project Structure

```text
contact-list/
├── fixtures/
├── pages/
├── tests/
│   ├── api/
│   ├── contact-*.spec.ts
│   ├── login.spec.ts
│   ├── register.spec.ts
│   └── smoke.spec.ts
├── types/
└── utils/
```

---

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

---

## 📊 What’s Covered

### UI Tests

- Registration & Login (happy + negative paths)
- Contact CRUD + field validation
- Session behavior & persistence

### API Tests

- User registration, login, update, delete
- Contact create, read, update, delete
- Validation and negative-path coverage for key user and contact flows
