# Practice Software Testing API - Test Plan

## Purpose

This project automates API checks against the public Practice Software Testing / Toolshop API using Playwright and TypeScript.

The goal is to demonstrate practical QA automation skills on a real external system through:

- authentication and authorization testing
- CRUD and negative-path coverage
- runtime behavior characterization
- realistic handling of shared-environment instability

---

## In scope

This project covers:

1. Authentication and session
2. Users
3. Products
4. Carts
5. Payment
6. Invoices

---

## Principles and constraints

- The target is a shared public environment.
- Tests should use unique data where possible.
- Cleanup should be best-effort and must not hide real failures.
- Runtime behavior may differ from documentation and should be documented honestly.
- Representative coverage is preferred over exhaustive endpoint counting.

---

# 1. Authentication and session

## Coverage

- Login with valid customer credentials succeeds.
- Login with valid admin credentials succeeds.
- Login with invalid credentials is rejected.
- Missing bearer token on protected endpoints is rejected.
- Invalid bearer token on protected endpoints is rejected.
- Admin token can access admin-only operations.
- Customer token is blocked from admin-only operations.
- Runtime quirks are documented where observed behavior differs from documentation.

---

# 2. Users

## Coverage

### Create

- Create user with valid unique data succeeds.
- Duplicate email is rejected.
- Missing required fields are rejected.
- Invalid password values are rejected.
- Multiple unique users can be created in sequence.

### Read

- Get created user by id succeeds.
- Get current authenticated user succeeds.
- Missing access token is rejected.
- Invalid access token is rejected.
- Non-existing user lookup behavior is characterized.

### Update and delete

- Update current user with valid data succeeds.
- Partial update of current user succeeds.
- Unauthorized update attempts are rejected.
- Customer update of another user is rejected.
- Admin update of another user is characterized.
- Delete user as admin succeeds.
- Unauthorized delete attempts are rejected.
- Deleted user is no longer retrievable.

---

# 3. Products

## Coverage

### Read

- Get all products succeeds.
- Product list returns a valid paginated shape.
- Default and explicit page handling behave correctly.
- Get product by valid id succeeds.
- Invalid or nonexistent product lookup is characterized.

### Search

- Search by existing catalog product returns expected matches.
- Search with no matching term returns empty results.
- Newly created products are not used as the basis for core search assertions due to delayed visibility in runtime behavior.

### Sort

- Sort by name ascending and descending works.
- Sort by price ascending and descending works.
- Invalid sort field behavior is characterized.
- Invalid sort direction behavior is characterized.

### Filter

- Filter by brand returns matching products only.
- Filter by category returns matching products only.
- Filter by rental flag returns matching products only.
- Filter by price range behaves correctly for valid ranges.
- Invalid filter input behavior is characterized.
- Combined filter behavior is checked for key query combinations.

### Write

- Create product with valid payload succeeds.
- Missing required fields are rejected.
- Invalid payload behavior is characterized.
- Update product with valid payload succeeds.
- Partial update product with valid payload succeeds.
- Delete product as admin succeeds.
- Delete product as customer is rejected.
- Delete nonexistent or already deleted product behavior is characterized.

---

# 4. Carts

## Coverage

- Get cart for authenticated user succeeds.
- Add valid product to cart succeeds.
- Add invalid or nonexistent product is rejected.
- Update cart item quantity succeeds.
- Remove cart item succeeds.
- Cart totals and structure remain valid after changes.
- Cart behavior is isolated per user.
- Unauthorized cart access is rejected where applicable.

---

# 5. Payment

## Coverage

- Payment check with valid payload succeeds.
- Missing required fields are rejected.
- Invalid payment data is rejected.
- Wrong total or malformed payload behavior is characterized.
- Validation messages and response shape are checked for consistency.

---

# 6. Invoices

## Coverage

- Get invoice by valid identifier succeeds.
- Non-existing invoice is rejected.
- Invoice search or lookup behavior is characterized.
- Authorization behavior is characterized.
- Invoice response shape is checked for consistency.

---

## Out of scope

The following areas are not part of the current project scope:

- Categories
- Brands
- Messages / Contact
- Images
- Reports
- Broad security fuzzing
- Full cross-resource consistency matrix
- Exhaustive generic validation matrix
