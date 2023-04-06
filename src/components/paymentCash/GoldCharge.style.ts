import styled from "@emotion/styled";

interface IGoldChargeStyleProps {
  path?: string;
  isCheck?: boolean;
  isGold?: boolean;
  isMethod?: boolean;
  isReceipt?: boolean;
}

export const GoldChargeTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GoldMyMoneyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GoldMoneyImg = styled.img`
  width: 24px;
  margin-right: 10px;
`;

export const GoldText = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: #ff3838;
  margin-right: 8px;
`;

export const GoldMyGold = styled.div`
  @media (max-width: 600px) {
    font-size: 20px;
  }
  color: #ff3838;
  font-weight: 700;
  font-size: 25px;
  display: flex;
  align-items: center;
`;

export const GoldDetailWrapper = styled.div`
  @media (max-width: 600px) {
    margin-bottom: -20px;
  }
  margin-bottom: -30px;
  border-top: 1px solid #e9e9e9;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-top: 30px;
  color: #7f7f7f;
  font-size: 13px;
`;

export const GoldDetail = styled.span`
  font-weight: 700;
  font-size: 15px;
  margin-left: 10px;
`;

export const GoldChargeSubText = styled.div`
  font-size: 13px;
`;

export const GoldChargeSubGold = styled.span`
  font-size: 13px;
  color: #2499ff;
`;

export const GoldMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "#FFF5F7" : "#f7f7f7"};
  padding: 14px 22px;
  cursor: pointer;
  margin-bottom: 10px;
  justify-content: space-between;

  border: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "1px solid #FF3838" : "none"};
`;

export const GoldMenuCircleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const GoldMenuCircle = styled.div`
  border: 2px solid #a9a9a9;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const GoldMenuCharge = styled.div`
  @media (max-width: 600px) {
    font-size: 15px;
  }
  margin-left: 22px;
  color: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "#FF3838" : "#4b4b4b"};
`;

export const GoldMenuChargeBonus = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  color: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "#FF3838" : "#a9a9a9"};
`;

export const GoldMenuChargeBonusSpan = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin: 0px 5px;
  color: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "#FF3838" : "#a9a9a9"};
`;

export const GoldResultWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GoldResultLine = styled.div`
  border-top: 1px solid #a9a9a9;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const GoldMethodWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const GoldMethodBtn = styled.button`
  @media (max-width: 600px) {
    padding: 12.5px;
  }
  padding: 15px;
  width: 100%;
  /* max-width: 256px; */
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  background-color: #ffebef;
  border: 1px solid #ff3838;
`;

export const GoldChargeResultVATWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const GoldChargeResltGold = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: ${(props: IGoldChargeStyleProps) =>
    !props.isGold ? "#4b4b4b" : "#FF3838"};
`;

export const GOldChargeResultText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #757575;
  padding-right: 8px;
  padding-left: 5px;
`;
export const GoldChargeResultLine = styled.div`
  border-left: 1px solid #4b4b4b;
  width: 1px;
  height: 15px;
  margin-top: 5px;
`;

export const GoldChargeWarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GoldChargeWarningRedText = styled.div`
  font-size: 13px;
  color: #ff3838;
`;

export const GoldChargeWarningText = styled.div`
  font-size: 16px;
  margin-bottom: 13px;
`;

export const GoldChargeWarningTextRed = styled.span`
  font-size: 16px;
  color: #ff3838;
`;

export const GoldChargeWarningImg = styled.img``;

export const GoldChargeWarningImgWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const GOldChargeVAT = styled.div`
  font-size: 15px;
  padding-left: 5px;
`;

export const GoldChargeCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  cursor: pointer;
  margin-top: 40px;
`;

export const GoldChargeCheckImg = styled.img`
  width: 30px;
`;

export const GoldChargeCheckText = styled.div`
  @media (max-width: 600px) {
    font-size: 12px;
  }
  font-size: 15px;
  color: #4b4b4b;
  padding-left: 12px;
`;

export const GoldChargeAccountWrapper = styled.div`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
  width: 100%;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

export const GoldChargeAccountSmallText = styled.div`
  @media (max-width: 600px) {
    font-size: 11px;
  }
  font-size: 13px;
`;

export const GoldChargeAccountBigText = styled.div`
  @media (max-width: 600px) {
    font-size: 12.5px;
    margin-top: 5px;
    padding-left: 0px;
  }
  font-size: 18px;
  font-weight: 700;
  padding-left: 10px;
`;

export const GoldChargeAccountLine = styled.div`
  border-top: 1px solid #d9d9d9;
  margin: 30px 0px;
`;

export const GoldChargeMethodSelect = styled.select`
  position: relative;
  width: 100%;
  border: 1px solid black;
  height: 60px;
  padding: 0.8em 20px;
  border: 1px solid #999;
  font-family: inherit;
  border-radius: 0px;
  background-color: white;
  /* background: url("src/assets/images/polygon.png") no-repeat 95% 50%; */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  font-size: 15px;
  color: #4b4b4b;
  font-weight: 700;
  ::-ms-expand {
    display: none;
  }
`;
export const GoldChageMethodOption = styled.option`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: lightcoral;
  color: #4b4b4b;
  padding: 3px 0;
  font-size: 16px;
`;

export const GoldChargePGBtn = styled.button`
  @media (max-width: 600px) {
    padding: 12.5px;
  }
  padding: 15px;
  width: 100%;
  color: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "white" : "#6B6B6B"};
  background-color: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "#FF3838" : "white"};
  cursor: pointer;
  outline: none;
  border: ${(props: IGoldChargeStyleProps) =>
    props.isCheck ? "none" : "1px solid #c7c7c7"};
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoldWarningWrapper = styled.div`
  width: 100%;
  background-color: white;
  padding-top: 40px;
  /* padding: 16px 0px 28px 22px; */
  display: flex;
  flex-direction: column;
`;

export const GoldWarningTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  padding-bottom: 10px;
  color: #4b4b4b;
`;

export const GoldWarningText = styled.span`
  @media (max-width: 600px) {
    font-size: 10px;
  }
  font-size: 13px;
  padding: 3px 0px;
  color: #4b4b4b;
`;

export const GoldChargeAccountPhone = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  box-shadow: 0px 0px 2px gray;
  padding-left: 20px;
  font-size: 16px;
  font-weight: 700;
  background-color: white;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  outline: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-input-placeholder {
    font-size: 18px;
    color: #a8a8a8;
  }
`;

export const GoldChargeAccoutPhoneWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const GoldChargeAccoutPhoneChagne = styled.button`
  width: 92px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  color: #ff3838;
  outline: none;
  box-shadow: 0px 0px 2px gray;
  margin-left: 13px;
  background-color: white;
  cursor: pointer;
`;

export const GoldChargeReceiptsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const GoldChargeReceiptsTitle = styled.div`
  @media (max-width: 600px) {
    font-size: 13px;
  }
  font-size: 18px;
  font-weight: 700;
`;

export const GoldChargeReceiptBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  cursor: pointer;
`;

export const GoldChargeReceiptsRadio = styled.button`
  background: white;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${(props: IGoldChargeStyleProps) =>
    props.isReceipt ? "#FF3838" : "#4B4B4B"};
`;

export const GoldChargeNameInput = styled.input`
  width: 100%;
  min-height: 50px;
  background-color: white;
  border: 1px solid #a9a9a9;
  margin-top: 20px;
  margin-bottom: 50px;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  outline: none;
`;

export const GoldChargeReceiptsinput = styled.input`
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #a9a9a9;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-input-placeholder {
    font-size: 15px;
    color: #a8a8a8;
  }
  outline: none;
`;

export const GoldChargeServiceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const GoldChargeServiceText = styled.span`
  color: #3476fa;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 1px solid #3476fa;
`;

export const GoldChargeReceiptsResultWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const GoldChargeReceiptsText = styled.div`
  font-size: 16px;
  @media (min-width: 680px) {
    font-size: 16px;
  }
  margin-bottom: 30px;
`;

export const GoldChargeReceiptsBoldText = styled.div`
  font-size: 14px;
  font-weight: 700;
  @media (min-width: 680px) {
    font-size: 20px;
  }
`;

export const GoldChargeReceiptsBoldSpan = styled.span`
  font-size: 14px;
  font-weight: 700;
  @media (min-width: 680px) {
    font-size: 20px;
  }
  color: #ff3838;
`;

export const GoldChargeReceiptBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  background-color: white;
  border-radius: 8px;
  margin-top: 50px;
  text-align: start;
  padding-top: 30px;
  padding-bottom: 30px;
  max-width: 600px;
  width: 100%;
`;

export const GoldChargeReceiptBox2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin-top: 10px;
  padding-top: 30px;
  max-width: 600px;
  padding-bottom: 30px;
  width: 100%;
`;

export const GoldChargeBankImg = styled.img`
  margin-right: 20px;
`;

export const GoldChargeReceiptSmallText = styled.span`
  font-size: 15px;
`;
