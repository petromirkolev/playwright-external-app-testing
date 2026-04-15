import { APIRequestContext, APIResponse } from '@playwright/test';

export class InvoiceApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async getAllInvoices(token: string): Promise<APIResponse> {
    return this.request.get('invoices', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
