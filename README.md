# Playwright External App Testing

This repo is part of my QA Automation portfolio.

It focuses on testing external/public web apps that I did not build myself, using Playwright. The goal is to demonstrate practical QA automation skills on third-party applications: test design, UI automation, reusable fixtures, stable selectors, API-assisted setup where useful, and realistic scope control.

## Why this repo exists

My other portfolio projects include apps I built and tested myself. This repo covers the other side of QA work: testing software as an external system, where I do not control the product code, selectors, architecture, or implementation details.

## Current app under test

### Contact List App

A public test application with sign-up, login, contact management flows, and linked API documentation.

Planned coverage:

- sign-up and login
- logout and session behavior
- contact creation, editing, and deletion
- negative validation scenarios
- UI and API coverage where useful

## Stack

- Playwright
- TypeScript
- fixtures/helpers for reusable setup
- Page Objects where they improve clarity

## Planned structure

```text
/contact-list
  /tests
  /pages
  /fixtures
  /utils
  README.md
  test-plan.md
```
