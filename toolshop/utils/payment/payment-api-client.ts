import { APIRequestContext, APIResponse } from '@playwright/test';
import { PaymentData } from '../../types/payment';

export class PaymentApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async checkPayment(input: PaymentData): Promise<APIResponse> {
    return this.request.post('payment/check', {
      data: input,
    });
  }
}
