### Setup

- create pet
- create user
- place order

### Teardown

- delete pet by ID
- delete user by username
- delete order by ID

# Pet

## Happy path CRUD

1. Create pet with valid payload succeeds
2. Get created pet by ID succeeds
3. Update existing pet with valid payload succeeds
4. Delete existing pet succeeds

## Search/filter

5. Find pets by valid status returns an array
6. Find pets by multiple valid statuses
7. Find pets by invalid status is rejected
8. Find pets by tags returns an array

## Negative/edge cases

9. Get pet by non-existent ID returns not found
10. Get pet by invalid ID type/format is rejected
11. Create pet with missing required fields is rejected or handled unexpectedly
12. Update pet with invalid payload
13. Delete pet with invalid ID
14. Update pet via form endpoint changes supported fields only

# Store

## Happy path order lifecycle

15. Place order with valid payload succeeds
16. Get existing order by ID succeeds
17. Delete existing order succeeds

## Negative/boundary cases

18. Get order with invalid ID is rejected
19. Delete order with negative/non-integer ID is rejected
20. Get missing order returns not found

## Inventory smoke

21. Inventory endpoint returns status-count map

# User

## Happy path CRUD

22. Create user with valid payload succeeds
23. Get created user by username succeeds
24. Update user succeeds
25. Delete user succeeds

## Auth/session basics

26. Login with valid username/password succeeds
27. Login with invalid credentials is rejected
28. Logout succeeds

## Negative cases

29. Get missing user returns not found
30. Delete missing user returns not found
31. Update user with invalid payload is rejected or handled inconsistently
