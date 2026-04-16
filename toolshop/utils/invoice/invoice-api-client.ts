import { APIRequestContext, APIResponse } from '@playwright/test';
import { InvoiceData } from '../../types/invoice';

export class InvoiceApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createInvoice(input: InvoiceData, token: string): Promise<APIResponse> {
    return this.request.post('invoices', {
      headers: { Authorization: `Bearer ${token}` },
      data: input,
    });
  }

  async getOneInvoice(id: string, token: string): Promise<APIResponse> {
    return this.request.get(`invoices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getOneInvoiceWithoutAuth(id: string): Promise<APIResponse> {
    return this.request.get(`invoices/${id}`);
  }

  async getOneInvoiceWithHeaders(
    id: string,
    authInput: string,
  ): Promise<APIResponse> {
    return this.request.get(`invoices/${id}`, {
      headers: { Authorization: authInput },
    });
  }

  async getAllInvoices(token: string): Promise<APIResponse> {
    return this.request.get('invoices', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
