export type PaymentData = {
  payment_method: string | 'bank-transfer';
  payment_details: {
    bank_name: string;
    account_name: string;
    account_number: string;
  };
};
