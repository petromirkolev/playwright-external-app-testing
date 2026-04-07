# Petstore API - Playwright API Test Suite

A Playwright + TypeScript API automation project for the public Swagger Petstore demo API.

## ⁉️ Why this project exists

This project is meant to strengthen the API-testing side of my QA Automation portfolio.

Unlike my full-stack apps, Petstore is a public demo API with published Swagger/OpenAPI documentation. That makes it useful for practicing:

- CRUD API testing
- setup and teardown through API calls
- request/response validation
- negative-path coverage
- contract-aware testing against public API docs
- realistic scope control on a shared external system

## 🧪 API under test

Swagger Petstore demo API.

Primary focus areas:

- **Pet**
  - create pet
  - get pet by id
  - update pet
  - delete pet
  - search/filter flows
  - negative scenarios

- **Store**
  - place order
  - get order
  - delete order
  - inventory smoke coverage

- **User**
  - create user
  - get user
  - update user
  - delete user
  - login/logout basics

## ✨ Test approach

Main goals:

- use Playwright's request API cleanly
- keep test data isolated with unique ids/names
- use setup/teardown patterns where practical
- cover both happy-path and negative scenarios
- keep the project compact and readable rather than artificially large

## 🛠️ Stack

- Playwright
- TypeScript
- Playwright Request API
- reusable API helpers / client
- fixtures where useful
- CI-ready test structure

## 📁 Planned structure

```text
petstore/
├── tests/
│   ├── pet/
│   ├── store/
│   └── user/
├── fixtures/
├── utils/
├── types/
├── README.md
└── test-plan.md
```
