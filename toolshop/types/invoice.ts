export type InvoiceData = {
  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_postal_code: string;
  payment_method: string | 'bank-transfer';
  cart_id: string;
  payment_details: {
    bank_name: string;
    account_name: string;
    account_number: string;
  };
};
