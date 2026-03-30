# Playwright External App Testing

This repo is part of my QA Automation portfolio.

It focuses on testing external/public web apps that I did not build myself, using Playwright. The goal is to demonstrate practical QA automation skills on third-party applications: test design, UI automation, reusable fixtures, stable selectors, API-assisted setup where useful, and realistic scope control.

## Why this repo exists

My other portfolio projects include apps I built and tested myself. This repo covers the other side of QA work: testing software as an external system, where I do not control the product code, selectors, architecture, or implementation details.

## Current app under test

### ParaBank

A public demo banking app used for practicing realistic workflow testing.

Planned coverage:

- registration and login
- account/workflow navigation
- transfer or bill-pay flow
- negative auth scenarios
- data isolation assumptions and test constraints
- API exploration if useful for setup or validation

## Stack

- Playwright
- TypeScript
- Page Object Model where it improves clarity
- fixtures/helpers for reusable setup

## Repo goal

Build a small set of clean, realistic automation suites for external apps.

## Planned structure

```text
/parabank
  /tests
  /pages
  /fixtures
  /utils
  README.md
  test-plan.md
```
