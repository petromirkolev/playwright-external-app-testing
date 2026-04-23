import { test, expect } from '../../fixtures/payment';
import { msg } from '../../utils/constants';

test.describe('Toolshop API - Payment', () => {
  test('Payment check with valid payload returns 200', async ({
    paymentApi,
    paymentData,
  }) => {
    const response = await paymentApi.checkPayment(paymentData);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe(msg.PAY_SUCCESS);
  });
});
