# Practice Software Testing API - Test Plan

## 1) Purpose

This plan defines API coverage for the public Practice Software Testing / Toolshop API using Playwright + TypeScript.

Primary objective: demonstrate practical API QA capability on a shared external environment through reusable fixtures, realistic setup/teardown, positive + negative paths, and clear documentation of runtime behavior.

## 2) Scope

### In scope

1. Authentication and session
2. Users
3. Products
4. Carts
5. Payment
6. Invoices

### Out of scope (current phase)

- Brands / Categories endpoint-specific suites
- Messages / contact
- Images and reports
- broad security fuzzing / performance testing
- exhaustive schema-contract validation for every field

## 3) Test strategy

- Use unique entity data where possible (especially users/products).
- Prefer API-assisted setup over brittle hardcoded assumptions.
- Keep teardown best-effort and observable (do not suppress real failures).
- Verify both functional behavior and response-shape consistency.
- Capture docs-vs-runtime mismatches directly in assertions and test names.

## 4) Environment and execution assumptions

- Target system is publicly hosted and shared.
- Suite requires outbound internet connectivity.
- Data can be affected by other users concurrently.
- Default base URL is `https://api.practicesoftwaretesting.com/`.

## 5) Coverage map by domain

## 5.1 Authentication and session

- Login with valid customer credentials succeeds.
- Login with valid admin credentials succeeds.
- Login with invalid credentials is rejected.
- Missing/invalid bearer token on protected endpoints is rejected.
- Token refresh behavior is validated.
- Customer/admin access boundaries are validated.

## 5.2 Users

### Create

- Create user with valid unique data succeeds.
- Duplicate email is rejected.
- Missing required fields are rejected.
- Invalid password constraints are rejected.

### Read

- Get created user by ID succeeds.
- Get current authenticated user (`/users/me`) succeeds.
- Missing/invalid token behavior is validated.
- Non-existing/unauthorized lookup behavior is characterized.

### Update / Delete

- Full and partial update flows are validated.
- Unauthorized or cross-user updates are rejected.
- Admin delete behavior is validated.
- Deletion follow-up behavior is validated.

## 5.3 Products

### Read/Search/Sort/Filter

- Product list and pagination structure are validated.
- Product read-by-id behavior is validated.
- Search behavior for hit/no-hit terms is validated.
- Sort behavior (`name`, `price`, direction) is validated.
- Filter behavior (`brand`, `category`, rental, price range) is validated.
- Invalid query input behavior is characterized.

### Write

- Required field validation is checked.
- Invalid payload edge cases are characterized.
- Update (full + partial) is validated.
- Delete behavior for admin/customer paths is validated.

## 5.4 Carts

- Create/get cart behavior is validated.
- Add/update/remove cart item behavior is validated.
- Cart quantity/totals consistency is validated after mutations.
- Invalid input behavior is characterized.

## 5.5 Payment

- Payment success path is validated.
- Missing field and invalid field cases are validated.
- Response shape/message consistency is checked.

## 5.6 Invoices

- Invoice retrieval by valid identifier is validated.
- Non-existing identifier behavior is validated.
- Authorization-related behavior is characterized.
- Response shape consistency is checked.

## 6) Risks and mitigation

- **External API instability / outages** → treat connectivity failures separately from functional regressions.
- **Shared test data collisions** → generate unique data and isolate by fixture lifecycle.
- **Runtime behavior changes over time** → keep assertions explicit and documented when behavior differs from docs.
- **Long-running failure diagnosis** → rely on Playwright trace/video/screenshot artifacts and HTML/Allure reporting.

## 7) Entry / Exit criteria

### Entry

- Dependencies installed (`npm install`).
- API target reachable.
- Valid admin/customer credentials available via fixtures.

### Exit

- Planned domain suites executed.
- Failures triaged into: test defect / known external issue / product behavior change.
- Artifacts and report generated for review.

## 8) Recommended near-term plan updates

1. Add a small smoke subset script for quick health checks (`auth + users/me + products read`).
2. Add CI tagging strategy (`@smoke`, `@regression`, `@negative`) for selective pipeline runs.
3. Add a lightweight contract-check layer for high-value responses (users, cart, invoice).
4. Track known docs-vs-runtime mismatches in a dedicated changelog section.
