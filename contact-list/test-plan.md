# Contact List App Test Plan

## Purpose

This test plan defines the manual and automation scope for the Contact List App as part of a QA Automation portfolio project.

## App under test

- App: Contact List App
- URL: https://thinking-tester-contact-list.herokuapp.com/
- Notes:
  - the app is intended for testing purposes
  - the database may be purged periodically
  - API documentation is linked from the home page

## Testing goals

- verify core auth flows
- verify core contact CRUD flows
- verify important negative and validation scenarios
- verify session behavior
- build a practical Playwright suite on a third-party app
- later add API-assisted setup or API tests where useful

## Constraints and assumptions

- this is a public demo/testing environment
- test data may not persist long-term
- unique user data should be generated where possible
- selectors and implementation details are external and may change
- scope should stay portfolio-focused and practical

## Functional areas

### 1. Public/auth shell

- home page loads
- login form is visible
- sign-up link works
- API docs link exists

### 2. Sign-up

- successful sign-up with unique valid data
- required field validation
- invalid email format
- password mismatch if supported
- duplicate user behavior if applicable

### 3. Login

- valid login
- invalid login
- empty fields
- logout
- session persists after refresh
- logged-out user cannot access private pages

### 4. Contact list

- contact list loads after login
- empty state handling for new user if applicable
- list updates after contact creation
- refresh persistence

### 5. Add contact

- successful add with valid data
- required field validation
- invalid field format checks where applicable
- cancel behavior if applicable

### 6. Edit contact

- update one field
- update multiple fields
- validation on invalid edits
- refresh persistence after save

### 7. Delete contact

- delete existing contact
- deleted contact disappears from list
- delete persists after refresh

### 8. Contact detail / integrity

- contact detail view matches created data
- edits are reflected in detail/list views
- deleted contact is not accessible afterward

### 9. Session / access control

- refresh while logged in keeps access
- refresh after logout stays logged out
- direct visit to protected area while logged out is blocked
