# Practice Software Testing API - Focused Test Plan

## Goal

API automation against the public Toolshop API to show practical QA skills on a system I did not build.

## Active scope

1. Auth
2. Users
3. Products
4. Carts
5. Payment
6. Invoices

## Principles

- Use unique data where possible.
- Keep setup and cleanup realistic.
- Document real runtime behavior, not idealized docs.
- Prefer strong, representative coverage over exhaustive endpoint counting.

## Coverage

### Auth

- Valid login
- Invalid login
- Missing / invalid token handling
- Customer vs admin access behavior

### Users

- Create user
- Read own user data
- Update own user data
- Delete user as allowed role
- Negative validation and permission checks

### Products

- List and read products
- Search existing catalog data
- Sort behavior
- Filter behavior
- Create / update / partial update / delete
- Characterize runtime quirks on invalid or edge cases

### Carts

- Read cart
- Add item
- Update quantity
- Remove item
- Check totals and isolation

### Payment

- Valid payment check
- Missing / invalid payment data
- Validation behavior characterization

### Invoices

- Read invoice
- Search / lookup
- Authorization behavior

## Not in active scope

Categories, brands, reports, messages, images, and broad exploratory security checks are backlog only.
