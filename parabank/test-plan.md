# ParaBank Test Plan

## Purpose

This test plan defines the manual and automation test scope for **ParaBank**, a public demo banking app used as part of a QA Automation portfolio project.

The goal is to build a strong, realistic, structured test inventory for an app I did not build myself, then automate the highest-ROI flows first.

## App under test

- **App:** ParaBank
- **Type:** Public demo banking web app
- **Primary focus:** user workflows, form validation, account actions, session behavior, and cross-feature integrity

## Testing goals

- verify core banking demo workflows work e2e
- verify important validation and negative flows
- verify session and navigation behavior
- verify account and transaction-related state updates correctly

## Constraints and assumptions

- this is a public demo environment, so test data may not be fully isolated
- the app may be slower or less deterministic than a local controlled project
- selectors and implementation details are external and may change
- some edge cases may behave inconsistently because the system is not under my control
- test data should be generated uniquely where possible
- scope should stay practical and portfolio-focused

## Test strategy

### Priority 1

Automate the highest-value, most representative flows first:

- registration
- login
- logout
- accounts overview
- open new account
- transfer funds
- bill pay
- request loan
- one or two negative validations per major form
- one or two cross-feature integrity checks

### Priority 2

Expand coverage after core flows are stable:

- full validation matrix for forms
- find transactions deeper coverage
- direct URL access protection checks
- update profile/contact info coverage
- multiple account combinations
- richer transaction history assertions

### Priority 3

Optional later coverage:

- keyboard-only behavior
- accessibility smoke
- responsiveness sanity checks
- repeated refresh / navigation stress checks
- multi-user isolation experiments
- broader flaky-point hardening

---

# Functional areas and test inventory

## 1. Public pages and shell

### Smoke

- home page loads successfully
- header, footer, and login panel are visible
- Register link opens registration page
- Forgot Login Info link opens lookup page
- About Us page opens
- Services page opens
- Contact page opens
- Site Map page opens
- Admin Page link behavior is as expected

### Navigation behavior

- browser back/forward works across public pages
- refresh keeps user on the same public page
- no broken navigation links in primary public navigation

---

## 2. Registration

### Happy path

- successful registration with valid unique user data
- successful registration logs user into the app or lands on authenticated area correctly
- newly registered user can access account services

### Required field validation

- first name required
- last name required
- address required
- city required
- state required
- zip code required
- ssn required
- username required
- password required
- confirm password required
- multiple required fields empty
- all required fields empty

### Field format / edge cases

- whitespace-only input
- leading/trailing spaces in fields
- password and confirm password mismatch
- duplicate username rejected
- long input values in each field
- special characters in text fields
- numeric characters in name fields
- non-Latin characters in text fields if accepted/rejected
- invalid zip format
- invalid phone format
- invalid ssn format

### Behavior

- validation messages appear in correct place
- previously entered values persist after validation errors where expected
- submit via Enter key works if applicable
- refresh during incomplete form entry
- browser back after registration
- repeated/double submit behavior

---

## 3. Login

### Happy path

- valid login with registered user
- valid login after logout
- session persists after page refresh

### Negative login

- invalid username
- invalid password
- both username and password invalid
- empty username
- empty password
- both fields empty
- whitespace-only input
- leading/trailing spaces in login fields

### Session behavior

- logout returns user to unauthenticated state
- refresh after logout keeps user logged out
- browser back after logout does not restore access
- direct visit to authenticated area while logged out is blocked

---

## 4. Forgot Login Info

### Happy path

- valid customer lookup returns expected result

### Negative

- required field empty
- all fields empty
- invalid personal data combination
- partial data match does not incorrectly succeed
- invalid zip format
- invalid ssn format
- whitespace-only input
- non-existent user lookup

### Behavior

- clear error handling on failed lookup
- retry after failure works
- no overly sensitive information is exposed incorrectly

---

## 5. Accounts Overview

### Smoke

- accounts overview loads after login
- account list/table is visible
- account numbers are visible and clickable
- balances are visible

### Behavior

- opening an account detail page from overview works
- newly created account appears in overview
- balances update after transactions
- account list persists after refresh
- multiple accounts display correctly

---

## 6. Open New Account

### Happy path

- open new account using valid source account
- open each supported account type
- success confirmation is shown
- newly opened account appears in accounts overview
- newly opened account appears in account-related dropdowns

### Negative / edge cases

- submit without required selections
- invalid source account handling if possible
- repeated submit/double click behavior
- refresh during account creation flow

### Integrity

- newly created account has unique identity
- account count increases correctly
- existing accounts remain intact

---

## 7. Account Details / Transaction History

### Happy path

- open account details from accounts overview
- transaction history displays
- transaction list updates after new transactions

### Checks

- balance and transaction entries are consistent
- transaction order is correct
- debit/credit display is correct
- refresh keeps account detail accessible
- navigation back to accounts overview works

---

## 8. Transfer Funds

### Happy path

- transfer valid amount between two accounts
- success confirmation appears
- source balance decreases correctly
- destination balance increases correctly
- transaction appears in source account history
- transaction appears in destination account history

### Negative validation

- empty amount
- zero amount
- negative amount
- non-numeric amount
- amount with decimal value
- amount larger than balance if app enforces it
- same source and destination account
- missing source account
- missing destination account

### Behavior

- transfer submit by Enter key if applicable
- double submit prevention
- refresh after success preserves updated state

---

## 9. Bill Pay

### Happy path

- valid bill pay with all required payee fields
- valid payment from selected account
- success confirmation appears
- payment appears in relevant transaction history

### Required field validation

- missing payee name
- missing address
- missing city
- missing state
- missing zip code
- missing phone
- missing account number
- missing verify account number
- account number mismatch
- missing amount
- missing from-account

### Amount validation

- zero amount
- negative amount
- non-numeric amount
- decimal amount if applicable

### Behavior

- values persist after validation error where expected
- retry after correction works
- repeated submit behavior
- refresh after success preserves effect

---

## 10. Find Transactions

### Happy path

- search by exact date returns correct result
- search by date range returns correct result
- search by exact amount returns correct result
- search by transaction id returns correct result
- searching after creating a new transaction returns that transaction

### Negative / edge cases

- no-result search
- invalid date input
- invalid date range
- empty search submission
- conflicting search criteria
- malformed amount input

### Behavior

- result list displays only matching items
- no-result message shown correctly
- duplicate result handling is correct
- refresh/back behavior around search results works

---

## 11. Update Contact Info

### Happy path

- update one field successfully
- update multiple fields successfully
- update all editable fields successfully
- success confirmation appears
- data persists after refresh
- data persists after logout/login

### Validation / edge cases

- empty required fields
- invalid zip
- invalid phone
- whitespace-only input
- very long values
- special characters in fields

### Integrity

- unchanged fields remain unchanged
- updated values remain visible in the profile/contact page

---

## 12. Request Loan

### Happy path

- valid loan request with valid down payment succeeds if approved
- success or approval message appears
- approved loan creates or updates expected account state
- relevant balances/history update correctly

### Negative / edge cases

- empty loan amount
- empty down payment
- zero amount
- negative amount
- non-numeric amount
- invalid source account
- down payment larger than allowed if app enforces it
- excessive loan amount if app rejects it

### Behavior

- approval/denial response is clearly shown
- retry after denial/failure works
- refresh after result preserves correct state

---

## 13. Logout and session behavior

### Core

- logout from authenticated page works
- user is returned to public/auth view after logout
- refresh after logout keeps user logged out

### Protection

- direct access to accounts overview while logged out is blocked
- direct access to transfer funds while logged out is blocked
- direct access to bill pay while logged out is blocked
- direct access to find transactions while logged out is blocked
- direct access to request loan while logged out is blocked

### Navigation/session

- browser back after logout does not restore private state
- refresh on authenticated page while logged in preserves session
- session behavior after reload is consistent

---

## 14. Cross-feature integrity tests

These are especially high value.

- newly opened account appears in accounts overview
- newly opened account can be used in transfer funds
- transfer updates balances and transaction history consistently
- bill payment updates account history consistently
- request loan updates related account views consistently
- updated contact info persists across logout/login
- user A cannot see user B private data if separate users are used
- account/service dropdowns reflect newly created accounts correctly

---

## 15. Direct URL and access control behavior

- direct visit to authenticated pages while logged out
- refresh on authenticated pages while logged in
- refresh on authenticated pages after logout
- browser back/forward around protected routes

---

## 16. Non-functional / automation-risk checks

### Stability-oriented checks

- repeated refresh around authenticated pages
- repeated navigation between major pages
- duplicate submit behavior on key forms
- slow-loading page tolerance

### UI/automation checks

- selector stability for important controls
- hidden/visible page state transitions
- basic keyboard submit behavior
- basic focus/interaction sanity check
- simple responsive smoke on smaller viewport if useful

---

# Automation scope recommendation

## V1 automation scope

This is the recommended first automation batch.

### Auth

- register valid user
- login valid user
- login invalid credentials
- logout
- session persists after refresh

### Core account flows

- accounts overview loads after login
- open new account
- transfer funds happy path
- bill pay happy path
- request loan happy path

### Negative checks

- one or two negative validations for registration
- one or two negative validations for login
- one or two negative validations for transfer
- one or two negative validations for bill pay

### Integrity checks

- newly opened account appears in overview
- transfer affects balances/history
- logout/login preserves changed state

## V2 automation scope

- more complete validation matrix
- find transactions coverage
- update contact info
- broader direct-URL protection tests
- more edge-case numeric validations

## V3 optional scope

- keyboard-only checks
- accessibility smoke
- responsive smoke
- repeated navigation/reload stress checks

---

# Risks and notes

- because this is a public demo app, behavior may occasionally vary
- data may not be fully isolated unless unique users are created
- some test cases may need looser expectations than for a private deterministic app
- retries and robust navigation handling may be needed for selected flows
- test scope should remain practical and portfolio-focused

---

# Initial implementation recommendation

## First Playwright implementation batch

1. registration happy path
2. login happy path
3. login negative path
4. logout and session persistence
5. accounts overview smoke
6. open new account happy path
7. transfer funds happy path
8. bill pay happy path
9. request loan happy path
10. one cross-feature integrity test

## Out of scope for first pass

- complete validation matrix for every field
- exhaustive transaction search combinations
- deep accessibility coverage
- mobile/responsive matrix
- performance testing
