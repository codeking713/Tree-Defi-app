import { find } from "lodash";

// ----------------------------------------------------------------------

const PAYMENT_TYPE = [
  { id: "0", name: "TREE" },
  { id: "1", name: "SEED" },
  { id: "2", name: "WBNB" },
];
export function getAllPayment() {
  return PAYMENT_TYPE;
}

export function getPaymentName(id: string) {
  const value = find(PAYMENT_TYPE, { id });
  return value.name;
}
