# Playwright External App Testing

This repo is part of my QA Automation portfolio.

It focuses on testing external/public systems that I did not build myself, using Playwright and TypeScript. The goal is to demonstrate practical QA automation skills on third-party applications and APIs: test design, UI automation, API testing, reusable fixtures/helpers, stable selectors, API-assisted setup where useful, and realistic scope control.

## Why this repo exists

My other portfolio projects focus on apps I built and tested myself.

This repo covers the other side of QA work: testing software as an external system, where I do not control the product code, frontend architecture, selectors, backend implementation, or deployment stability.

That changes the testing approach to:

- understanding the real behavior of the system
- validating flows from the outside
- debugging contract mismatches
- distinguishing test issues from live environment issues
- keeping scope realistic when testing public demo apps and APIs

## Projects in this repo

### Contact List App

[Link](https://thinking-tester-contact-list.herokuapp.com/)

A public demo application with:

- sign-up and login
- session handling
- contact creation, editing, and deletion
- UI and API coverage
- positive and negative test scenarios

The Contact List project lives in [`/contact-list`](./contact-list), with its own README, structure, and execution instructions.

### Toolshop API

[Link](https://api.practicesoftwaretesting.com/api/documentation)

A public toolshop-style demo API used for API-first automation practice.

Planned/current focus includes:

- authentication and role-based access checks
- product and catalog coverage
- cart and checkout-related flows
- positive and negative API scenarios
- setup/teardown strategy for shared public environments
- contract-aware assertions based on the published API documentation

The Practice Software Testing API project lives in [`/toolshop`](./toolshop), with its own README, structure, and execution instructions.

## Stack

- Playwright
- TypeScript
- Playwright Request API
- reusable fixtures and helpers
- Page Objects where they improve clarity
- API-first test design for public systems

## Repository structure

```text
playwright-external-app-testing/
├── contact-list/
└── toolshop/
```
