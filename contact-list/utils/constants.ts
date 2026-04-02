import { invalidInput } from './test-data';

export const INVALID_EMAIL = 'User validation failed: email: Email is invalid';

export const INVALID_PASSWORD_TOO_SHORT = `User validation failed: password: Path \`password\` (\`${invalidInput.passwordTooShort}\`) is shorter than the minimum allowed length (7).`;

export const INVALID_PASSWORD_TOO_LONG = `User validation failed: password: Path \`password\` (\`${invalidInput.passwordTooLong}\`) is longer than the maximum allowed length (100).`;
