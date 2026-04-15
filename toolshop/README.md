# Practice Software Testing API - Playwright API Test Suite

[![External App Tests](https://github.com/petromirkolev/playwright-external-app-testing/actions/workflows/external-apps.yml/badge.svg)](https://github.com/petromirkolev/playwright-external-app-testing/actions/workflows/external-apps.yml)

A Playwright + TypeScript API automation project for the public Practice Software Testing / Toolshop API.

This project is part of my QA Automation portfolio and focuses on testing a public system that I did not build myself. The goal is to demonstrate practical API testing skills: authentication handling, CRUD coverage, business-flow validation, negative testing, permission checks, and realistic scope control on a shared external environment.

## ⁉️ Why this project exists

My other portfolio projects focus on apps I built and tested myself. This project covers a different QA scenario: testing an external public API where I do not control the backend implementation, data state, validation behavior, or deployment stability. That changes the work from "testing my own code" to:

- understanding the real behavior of the system
- validating documented vs actual API behavior
- handling auth and role-based access
- building clean setup/teardown patterns
- keeping tests isolated in a shared environment
- distinguishing test issues from target-system issues

## 🔎 API under test

Practice Software Testing / Toolshop public API documentation:

- API docs: https://api.practicesoftwaretesting.com/api/documentation
- Public UI: https://practicesoftwaretesting.com/

The API includes realistic business domains such as authentication, users, products, brands, categories, carts, payment, invoices, messages, images, and reports.

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

## 📖 Project structure

```text
toolshop/
├── tests/
├── fixtures/
├── utils/
├── types/
├── README.md
└── test-plan.md
```

## How to run

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npm test
```

### Run in UI mode

```bash
npm run test:ui
```

## Notes

Because this is a public demo system, some API behavior may differ from ideal production-grade validation expectations. When that happens, the goal is to characterize and document the real behavior clearly rather than assume the docs are always fully enforced.
