import { ReactElement } from "react";
import HeaderLayout from "../../src/components/layout/header";
import PaymentCash from "../../src/components/paymentCash/paymentCash.Container";

export default function PaymentCashPage() {
  return (
    <>
      <PaymentCash></PaymentCash>
    </>
  );
}

PaymentCashPage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout title="투달유에스 | 구독결제">{page}</HeaderLayout>;
};
