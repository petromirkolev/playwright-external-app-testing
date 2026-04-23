import { PaymentData } from '../types/payment';
import { validPaymentData } from '../utils/payment/payment-data';
import { test as base, expect } from './cart';

type PaymentFixture = {
  paymentData: PaymentData;
};

export const test = base.extend<PaymentFixture>({
  paymentData: async ({}, use) => {
    await use(validPaymentData);
  },
});

export { expect };
