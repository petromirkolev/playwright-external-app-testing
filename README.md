# Playwright External App Testing

This repo is part of my QA Automation portfolio.

It focuses on testing external/public web apps that I did not build myself, using Playwright and TypeScript. The goal is to demonstrate practical QA automation skills on third-party applications: test design, UI automation, reusable fixtures, stable selectors, API-assisted setup where useful, and realistic scope control.

## Why this repo exists

My other portfolio projects focus on apps I built and tested myself.

This repo covers the other side of QA work: testing software as an external system, where I do not control the product code, frontend architecture, selectors, backend implementation, or deployment stability.

That changes the testing approach. The job becomes:

- understanding the real behavior of the system
- validating flows from the outside
- debugging contract mismatches
- distinguishing test issues from live environment issues
- keeping scope realistic when testing public demo apps

## Current app under test

### Contact List App

A public demo application with:

- sign-up and login
- session handling
- contact creation, editing, and deletion
- UI and API coverage
- positive and negative test scenarios

The Contact List project lives in [`/contact-list`](./contact-list), with its own README, test structure, and execution instructions.

## Stack

- Playwright
- TypeScript
- Playwright Request API
- reusable fixtures and helpers
- Page Objects where they improve clarity

## Repository structure

```text
/contact-list
  /tests
  /pages
  /fixtures
  /utils
  /types
  README.md
  test-plan.md
```
