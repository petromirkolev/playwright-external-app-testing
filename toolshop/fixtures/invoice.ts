import { test as base, expect } from './payment';

type InvoiceFixtures = {};

export const test = base.extend<InvoiceFixtures>({});

export { expect };
