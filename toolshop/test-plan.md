# Practice Software Testing API - Test Plan

## Purpose

This test plan defines the API automation scope for the Practice Software Testing API as part of a QA Automation portfolio project.

---

## Scope

Primary API domains covered:

1. Authentication and session
2. Users
3. Products
4. Categories
5. Brands
6. Carts
7. Payment
8. Invoices
9. Messages / Contact
10. Images
11. Reports
12. Permissions and role behavior
13. Data validation and characterization
14. Search, sort, filter, and pagination consistency
15. Cross-resource consistency
16. Security-minded exploratory API checks

---

## Assumptions and constraints

- The target is a shared public environment.
- Tests must use unique data where possible.
- Cleanup should be best-effort and should not hide real test failures.
- Some endpoints may behave differently for customer vs admin roles.
- Some endpoints may expose runtime behavior that differs from documentation; those cases should be documented clearly.

---

# 1. Authentication and session

## Test cases

1. Login with valid customer credentials returns 200 and an access token.
2. Login with valid admin credentials returns 200 and an access token.
3. Login with wrong password returns 401.
4. Login with unknown email returns 401.
5. Login with missing email returns 422.
6. Login with missing password returns 422.
7. Login with empty payload returns 422.
8. Login response contains a non-empty access token.
9. Reusing a valid bearer token on a protected endpoint succeeds.
10. Missing bearer token on a protected endpoint returns 401.
11. Invalid bearer token on a protected endpoint returns 401.
12. Malformed bearer token on refresh returns 500 (observed runtime behavior).
13. Admin token can access an admin-only endpoint such as user deletion.
14. Customer token cannot access an admin-only endpoint such as user deletion and returns 403.
15. Two consecutive logins return different access tokens.
16. One user token cannot retrieve another user’s protected user resource and runtime returns 404.
17. One user token cannot modify another user’s protected user resource and runtime returns 403.

---

# 2. Users

## Test cases

1. Create user with valid unique data succeeds.
2. Create user with duplicate email returns 422.
3. Create user with missing required fields returns 422.
4. Create user with invalid password values returns 422.
5. Create multiple unique users in sequence succeeds without collision.
6. Get created user by id succeeds.
7. Get current authenticated user succeeds.
8. Get current authenticated user with invalid access token returns 401.
9. Get current authenticated user without access token returns 401.
10. Get user by id with invalid access token returns 401.
11. Get user by id without access token returns 401.
12. Get non-existing user by id returns 404 with authorization-style error message (observed runtime behavior).
13. Update current user with valid data succeeds.
14. Partial update of current user succeeds.
15. Update current user with invalid access token returns 401.
16. Update current user without access token returns 401.
17. Update another user as a customer returns 403.
18. Partial update of another user as a customer returns 403.
19. Update another user as an admin succeeds.
20. Update non-existing user as an admin returns 403 (observed runtime behavior).
21. Delete created user as an admin succeeds.
22. Get deleted user returns 404.
23. Delete created user without authorization returns 401.
24. Delete another user as a customer returns 403.

---

# 3. Products

## Test cases

1. Get all products succeeds.
2. Product list returns the expected paginated shape.
3. Product list default page is valid.
4. Product list with explicit "page=1" succeeds.
5. Product list with a high page number returns empty data or valid pagination behavior.
6. Get product by valid id succeeds.
7. Get product by nonexistent id returns not found.
8. Get product by invalid id format is rejected.
9. Filter products by valid brand id returns matching products only.
10. Filter products by valid category id returns matching products only.
11. Filter products by nonexistent brand id returns empty data or a defined error.
12. Filter products by nonexistent category id returns empty data or a defined error.
13. Filter by "is_rental=true" returns rental products only.
14. Filter by "is_rental=false" returns non-rental products only.
15. Price range filter ("between") works for a valid range.
16. Invalid "between" format is rejected or safely handled.
17. Sort by name ascending works.
18. Sort by name descending works.
19. Sort by price ascending works.
20. Sort by price descending works.
21. Invalid sort field is rejected or safely ignored.
22. Invalid sort direction is rejected or safely ignored.
23. Combined filter: brand + category works correctly.
24. Combined filter: category + sort works correctly.
25. Combined filter: brand + price range works correctly.
26. Response items contain expected key fields.
27. Create product with valid payload succeeds.
28. Create product with missing required fields is rejected.
29. Create product with invalid numeric fields is rejected.
30. Create product with invalid relation ids (brand/category) is rejected.
31. Create product as unauthorized user is rejected, if auth is required.
32. Update product with valid payload succeeds.
33. Partial update product with valid payload succeeds.
34. Update product with invalid payload is rejected.
35. Partial update product with invalid field types is rejected.
36. Delete product as admin succeeds.
37. Delete product as customer is rejected.
38. Delete nonexistent product returns not found.
39. Delete product in use returns conflict, if applicable.
40. Deleted product no longer appears in list results.
41. Product search endpoint, if separate, returns expected matches.
42. Search with wildcard or special characters behaves safely.
43. Unicode product data is accepted or rejected consistently.
44. Product description HTML/script payload is escaped, rejected, or stored safely.
45. Related-products endpoint, if present, returns expected shape and handles nonexistent product cleanly.
46. Hidden/admin-only fields are not leaked to customer or unauthenticated callers.

---

# 4. Categories

## Test cases

1. Get all categories succeeds.
2. Get category by valid id succeeds.
3. Get category by nonexistent id returns not found.
4. Create category with valid payload succeeds.
5. Create category with missing required fields is rejected.
6. Create category with too-short name is rejected.
7. Create category with too-long name is rejected.
8. Create duplicate category name is rejected or handled consistently.
9. Update category with valid payload succeeds.
10. Partial update category succeeds, if supported.
11. Update category with invalid payload is rejected.
12. Delete category as admin succeeds.
13. Delete category as customer is rejected.
14. Delete category in use returns conflict, if applicable.
15. Deleted category no longer appears in category list.
16. Unicode category name is handled consistently.
17. Category search/filter behavior, if present, works.
18. Unauthorized create/update/delete category is rejected.

---

# 5. Brands

## Test cases

1. Get all brands succeeds.
2. Get brand by valid id succeeds.
3. Get brand by nonexistent id returns not found.
4. Create brand with valid payload succeeds.
5. Create brand with missing required fields is rejected.
6. Create brand with invalid field lengths is rejected.
7. Create duplicate brand is rejected or handled consistently.
8. Update brand with valid payload succeeds.
9. Partial update brand succeeds.
10. Partial update with invalid fields is rejected.
11. Delete brand as admin succeeds.
12. Delete brand as customer is rejected.
13. Delete nonexistent brand returns not found.
14. Delete brand in use returns conflict.
15. Delete brand with malformed id is rejected.
16. Unicode brand name is handled consistently.
17. HTML/script payload in brand name/slug is escaped, rejected, or stored safely.
18. Unauthorized create/update/delete brand is rejected consistently.

---

# 6. Carts

## Test cases

1. Get cart for authenticated customer succeeds.
2. New customer sees an empty cart or valid initialized cart shape.
3. Add valid product to cart succeeds.
4. Add same product twice increments quantity or creates a second line according to actual behavior.
5. Add multiple different products succeeds.
6. Add invalid/nonexistent product is rejected.
7. Add zero quantity is rejected.
8. Add negative quantity is rejected.
9. Add excessively large quantity is rejected or handled consistently.
10. Update line-item quantity succeeds.
11. Update line-item quantity to zero removes item or is rejected according to actual behavior.
12. Update cart with invalid payload is rejected.
13. Remove one cart item succeeds.
14. Remove nonexistent cart item is rejected or idempotently succeeds.
15. Clear entire cart succeeds, if endpoint exists.
16. Cart totals/subtotals recalculate correctly after add.
17. Cart totals/subtotals recalculate correctly after update.
18. Cart totals/subtotals recalculate correctly after remove.
19. Cart persists across repeated fetches.
20. Cart is isolated per user.
21. Customer A cannot read Customer B’s cart.
22. Customer A cannot mutate Customer B’s cart.
23. Unauthenticated cart access is rejected, if auth is required.
24. Cart with rental and non-rental items behaves as documented or observed.
25. Invalid product status (e.g. discontinued/out of stock) cannot be added, if applicable.
26. Cart payload shape remains stable after multiple operations.
27. Two quick add requests produce deterministic cart state.
28. Duplicate add under concurrency does not corrupt totals.

---

# 7. Payment

## Test cases

1. Payment check with valid payload succeeds.
2. Payment check with missing required fields is rejected.
3. Payment check with invalid card number/payment reference is rejected.
4. Payment check with invalid expiry is rejected, if modeled.
5. Payment check with invalid CVV/security code is rejected, if modeled.
6. Payment check with malformed billing data is rejected.
7. Payment check with wrong total/amount is rejected.
8. Payment check without auth behaves as documented or observed.
9. Payment check with unsupported method is rejected.
10. Payment check returns specific and useful validation messages.
11. Repeated payment check on the same payload is stable.
12. Injection/unicode/special-character handling in payer fields is safe.

---

# 8. Invoices

## Test cases

1. Get invoice by valid id/number succeeds.
2. Get nonexistent invoice returns not found.
3. Search invoices by valid query succeeds.
4. Search invoices by invoice number returns the correct invoice.
5. Search invoices by billing street returns matching invoices.
6. Search invoices by status returns matching invoices.
7. Search invoices with page parameter returns paginated shape.
8. Search invoices with missing query is rejected.
9. Search invoices with wildcard/special characters behaves safely.
10. Download PDF / invoice document fetch succeeds, if exposed.
11. Update invoice status with valid enum succeeds.
12. Update invoice status with invalid enum is rejected.
13. Update invoice status with too-short status message is rejected.
14. Update invoice status with too-long status message is rejected.
15. Customer cannot update invoice status if admin-only.
16. Admin can update invoice status if allowed.
17. Unauthorized invoice fetch is rejected where applicable.
18. Customer cannot fetch another customer’s invoice.
19. Invoice/order total matches original transaction/cart total.
20. Invoice status progression is logical, if tested in sequence.

---

# 9. Messages / Contact

## Test cases

1. Submit valid message/contact form succeeds.
2. Submit message with missing required fields is rejected.
3. Submit message with invalid email is rejected.
4. Submit message with too-short content is rejected.
5. Submit message with too-long content is rejected.
6. Unicode in message content is accepted or rejected consistently.
7. HTML/script payload in message content is escaped, rejected, or stored safely.
8. Attach valid file/image to message succeeds, if supported.
9. Attach unsupported file type is rejected.
10. Attach oversized file is rejected.
11. Attach corrupted payload is rejected.
12. Get messages as admin succeeds.
13. Customer can or cannot fetch own messages according to actual behavior.
14. Unauthenticated message creation is allowed or rejected according to actual rules.
15. Message deletion/update permissions behave correctly.
16. Message search/filter, if present, works.
17. Duplicate message submissions behave consistently.

---

# 10. Images

## Test cases

1. Get image metadata/list succeeds.
2. Get specific image by valid id succeeds.
3. Get nonexistent image returns not found.
4. Image content-type is correct.
5. Broken/malformed image id is rejected.
6. Upload image with valid payload succeeds, if supported.
7. Upload invalid file type is rejected.
8. Upload oversized file is rejected.
9. Delete image as allowed role succeeds.
10. Delete image as unauthorized role is rejected.
11. Image linked to deleted entity is handled correctly.
12. Cache/control headers behave consistently, if relevant.

---

# 11. Reports

## Test cases

1. Get report list/report endpoint succeeds.
2. Get each documented report as admin succeeds.
3. Customer access to admin report is rejected.
4. Unauthenticated report access is rejected, if protected.
5. Invalid report query params are rejected.
6. Report with date range filter succeeds.
7. Report with invalid date range is rejected.
8. Report pagination works, if supported.
9. Report values are internally consistent with source entities (e.g. totals/counts).
10. Empty report range returns an empty but valid shape.
11. Export/download report format behaves correctly, if offered.
12. Report generation under large page size is handled safely.

---

# 12. Permissions and role behavior

## Test cases

1. Customer can access customer-only resources.
2. Customer cannot access admin-only resources.
3. Admin can access admin-only resources.
4. Admin receives fields customer does not, if observed/documented.
5. Unauthenticated caller cannot mutate protected resources.
6. Unauthenticated caller can still reach public "GET" resources.
7. Unauthorized "PUT"/"PATCH" is rejected.
8. Unauthorized "DELETE" is rejected.
9. Resource ownership is enforced for carts/invoices/messages where applicable.
10. Token from customer A cannot access customer B’s private resources.
11. Expired/invalid token behavior is consistent across domains.

---

# 13. Data validation and characterization

## Test cases

1. Required field omission is handled correctly for each writable endpoint.
2. Empty string for required fields is handled correctly.
3. Whitespace-only values are handled correctly.
4. "null" for nullable/non-nullable fields is handled correctly.
5. Wrong type for string fields is handled correctly.
6. Wrong type for numeric fields is handled correctly.
7. Wrong type for boolean fields is handled correctly.
8. Too-short value boundaries are enforced.
9. Too-long value boundaries are enforced.
10. Negative numeric values are rejected where not allowed.
11. Zero values are rejected where not allowed.
12. Excessively large numeric values are rejected or handled safely.
13. Invalid enum values are rejected.
14. Duplicate unique-looking values are rejected or handled consistently.
15. Malformed JSON body is rejected.
16. Missing "Content-Type" header is rejected or handled safely.
17. Wrong "Content-Type" header is rejected.
18. Extra unknown fields in payload are rejected or safely ignored.
19. HTML payload in text fields is escaped, rejected, or stored safely.
20. Script payload in text fields is escaped, rejected, or stored safely.
21. Unicode/emoji payloads are handled consistently.
22. SQL wildcard/special characters in search fields behave safely.
23. URL/path-traversal-like strings in file/image fields behave safely.
24. Error response shape is consistent across endpoints.
25. Error messages are specific enough to diagnose invalid payloads.

---

# 14. Search, sort, filter, and pagination consistency

## Test cases

1. First page shape is correct.
2. Middle page shape is correct, if enough data exists.
3. Last page shape is correct.
4. Page beyond the end returns empty but valid shape.
5. Negative page is rejected or normalized consistently.
6. Non-integer page is rejected.
7. Per-page/default page size behavior is correct, if supported.
8. Sort ascending vs descending is deterministic.
9. Combined filter + sort behavior is deterministic.
10. Search term case sensitivity/insensitivity is characterized correctly.
11. Search term partial match behavior is correct.
12. Search term no-match returns empty valid shape.
13. Filter by invalid id/value is rejected or ignored consistently.
14. Duplicate query parameter behavior is consistent.
15. Unknown query parameter is ignored or rejected consistently.

---

# 15. Cross-resource consistency

## Test cases

1. Product brand id maps to an existing brand.
2. Product category id maps to an existing category.
3. Cart line items reference valid product ids.
4. Invoice references valid order/cart/customer linkage.
5. Deleted brand/category impact on products is sane.
6. Deleted product impact on carts/orders is sane.
7. Payment/invoice/order totals remain consistent end-to-end.
8. Admin update to product/brand/category is reflected on subsequent "GET"/list calls.
9. Search results reflect latest updates.
10. Delete/update operations are visible across related endpoints.

---

# 16. Security-minded exploratory API checks

## Test cases

1. Attempt unauthenticated brand update.
2. Attempt unauthenticated product update.
3. Attempt unauthenticated category update.
4. Attempt customer delete on admin-only resource.
5. Attempt customer update on another user’s data.
6. Attempt IDOR-style fetch of another customer’s invoice.
7. Attempt IDOR-style fetch of another customer’s cart.
8. Attempt mass assignment via extra fields in writable payload.
9. Attempt reflected XSS-style payload in text fields that may feed UI-visible data.
10. Attempt unicode/control-character payloads that may affect rendering.
11. Attempt email-enumeration style checks on user-related endpoints.
12. Attempt wildcard-heavy search values and DB-like special characters.
13. Attempt negative/overflow ids in path params.
14. Attempt tampering with auth headers / malformed bearer prefixes.
15. Attempt duplicate or replay-like payment/order calls.
