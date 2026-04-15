import { test as base, expect } from './cart';

type PaymentFixture = {};

export const test = base.extend<PaymentFixture>({});

export { expect };
