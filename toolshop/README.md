# Practice Software Testing API - Playwright API Test Suite

[![External App Tests](https://github.com/petromirkolev/playwright-external-app-testing/actions/workflows/external-apps.yml/badge.svg)](https://github.com/petromirkolev/playwright-external-app-testing/actions/workflows/external-apps.yml)

A Playwright + TypeScript API automation project for the public Practice Software Testing / Toolshop API.

This project focuses on API QA for an **external system** (not locally controlled), with emphasis on realistic test isolation, auth handling, CRUD coverage, and behavior characterization.

## Why this project exists

Most portfolio projects test apps owned by the same engineer. This project intentionally tests a third-party public API where environment state, validation behavior, and runtime reliability can change at any time.

Key QA goals:

- validate documented vs observed behavior
- test authorization boundaries (admin vs customer)
- build reusable setup/teardown fixtures without hiding failures
- keep coverage meaningful and maintainable in shared environments

## 🔎 API under test

Practice Software Testing / Toolshop public API documentation:

- API docs: <https://api.practicesoftwaretesting.com/api/documentation>
- Public UI: <https://practicesoftwaretesting.com/>
- Default API base URL used in this suite: `https://api.practicesoftwaretesting.com/`

## Current suite contents

The suite currently covers these API domains:

- Authentication / user session
- Users
- Products
- Carts
- Payment
- Invoices

## 🧪 Test approach

This project is designed to show practical QA judgment, not just endpoint hitting.

Key principles:

- use unique test data where possible
- prefer API-assisted setup over brittle manual preconditions
- keep cleanup best-effort and avoid hiding real failures
- verify both happy paths and meaningful negatives
- document any docs-vs-runtime mismatches clearly
- stay realistic about shared-environment limitations

## 🛠️ Tech stack

- Playwright
- TypeScript
- Playwright Request API
- reusable fixtures and helpers
- API client abstraction
- CI-ready test structure

## 📖 Repository structure for this test package:

```text
toolshop/
├── fixtures/      # shared Playwright fixtures (auth, entities, api clients)
├── tests/         # spec files grouped by domain
├── types/         # API payload / response typing
├── utils/         # api clients, data factories, helper assertions
├── playwright.config.ts
├── test-plan.md
└── README.md
```

## Tech stack

- Playwright test runner + request API
- TypeScript
- Allure reporter (`allure-playwright`)
- Fixture-driven composition for API client reuse

## Running locally

### 1) Install dependencies

```bash
npm install
```

### 2) Run the full suite

```bash
npm test
```

### 3) Useful targeted runs

```bash
npx playwright test tests/products
npx playwright test tests/user
npx playwright test --grep "authorization"
```

### 4) Debug / interactive modes

```bash
npm run test:headed
npm run test:debug
npm run test:ui
```

### 5) Reports

```bash
npm run test:allure
npx playwright show-report
```

## Configuration

The `playwright.config.ts` defaults to:

- `testDir: ./tests`
- `timeout: 30s`
- retries: `2` in CI, `0` locally
- reporters: HTML + Allure
- artifacts on failure: screenshot/video/trace

Override API target when needed:

```bash
BASE_URL="https://api.practicesoftwaretesting.com/" npm test
```

## Notes on external-environment behavior

Because this suite targets a shared public system:

- some negative cases intentionally assert non-ideal but observed status codes
- parallel external traffic can affect data visibility and ordering
- network availability can fail test execution independently of test logic

When observed behavior diverges from documentation, the suite favors explicit characterization over assumption.
