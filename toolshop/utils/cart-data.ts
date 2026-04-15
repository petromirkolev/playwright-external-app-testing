export const addProductCases = [
  {
    name: 'Missing quantity returns 404',
    quantity: '',
  },
  {
    name: 'Zero quantity returns 404',
    quantity: 0,
  },
  {
    name: 'Negative quantity returns 404',
    quantity: -1,
  },
  {
    name: 'Non-numeric quantity returns 404',
    quantity: 'test',
  },
  {
    name: 'Excessively large quantity returns 404',
    quantity: 100000000000000000000000000000000000,
  },
];

export const updateQuantityCases = [
  {
    name: 'to zero is rejected',
    quantity: 0,
  },
  {
    name: 'to negative value is rejected',
    quantity: -1,
  },
  {
    name: 'to non-numeric value is rejected',
    quantity: 'test',
  },
];
