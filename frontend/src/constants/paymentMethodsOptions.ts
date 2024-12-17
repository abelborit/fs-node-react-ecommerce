export interface PaymentMethodsOptionsInterface {
  id: string;
  label: string;
  status: string;
}

export const paymentMethodsOptions: PaymentMethodsOptionsInterface[] = [
  { id: "credit-card", label: "Credit Card", status: "disabled" },
  { id: "paypal", label: "PayPal", status: "disabled" },
  { id: "cash-on-delivery", label: "Cash on Delivery", status: "" },
];
