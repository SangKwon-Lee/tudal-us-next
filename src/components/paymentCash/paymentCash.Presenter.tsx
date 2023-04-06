import dayjs from "dayjs";
import { Title } from "../commons/ui/commonStyle";
import {
  GoldResultWrapper,
  GoldMyMoneyWrapper,
  GoldChargeResultVATWrapper,
  GoldChargeResltGold,
  GOldChargeResultText,
  GoldChargeResultLine,
  GOldChargeVAT,
  GoldResultLine,
  GoldChargeCheckImg,
  GoldChargeCheckText,
  GoldChargeCheckWrapper,
  GoldChargePGBtn,
  GoldChargeServiceText,
  GoldChargeServiceWrapper,
  GoldMethodBtn,
  GoldMethodWrapper,
  GoldMoneyImg,
  GoldWarningText,
  GoldWarningTitle,
  GoldWarningWrapper,
  GoldChargeWarningImg,
  GoldChargeWarningImgWrapper,
  GoldChargeWarningRedText,
  GoldChargeWarningText,
  GoldChargeWarningTextRed,
  GoldChargeWarningWrapper,
} from "./GoldCharge.style";
import { Modal } from "@mui/material";
import { priceToString } from "../../commons/util/func/priceToString";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Icon from "../../commons/theme/icon";
import theme from "../../commons/theme";
interface PaymentCashProps {
  product: {
    period: number;
    gold: number;
    name: string;
  };
  money: string;
  isCheck: boolean;
  modalOpen: boolean;
  tudlaUsHistory: any;
  handleIsCheck: () => void;
  handleInnoPay: () => void;
  handleModalOpen: () => void;
}

const PaymentCashPresenter: React.FC<PaymentCashProps> = ({
  money,
  isCheck,
  product,
  modalOpen,
  handleIsCheck,
  handleInnoPay,
  tudlaUsHistory,
  handleModalOpen,
}) => {
  const navigate = useRouter();
  return (
    <Body>
      <Contents>
        <ThemeDetailArrow
          src="./assets/images/iconBack.svg"
          onClick={() => {
            navigate.push("/");
          }}
        />
        <PaymentBodyWrapper>
          <Icon
            width={40}
            height={40}
            src={"/assets/images/plusIcon.png"}
          ></Icon>
          <PaymetnTitleWrapper>
            <PaymentTitle>투달유에스 한 달 구독 하기</PaymentTitle>
          </PaymetnTitleWrapper>
          <PaymentContents>
            <PaymentContentsTitle>상품명 : 투달유에스</PaymentContentsTitle>
            <PaymentContentsWrapper
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <PaymentContentsSubTitle>결제방식</PaymentContentsSubTitle>
              <PaymentContentsSubText style={{ color: "#00B06A" }}>
                구독({product.period}일)
              </PaymentContentsSubText>
            </PaymentContentsWrapper>
            <PaymentContentsWrapper>
              <PaymentContentsSubTitle>결제시 구독기간</PaymentContentsSubTitle>
              <PaymentContentsSubText>
                {dayjs(tudlaUsHistory.endDate).isAfter(dayjs().format())
                  ? dayjs(tudlaUsHistory.endDate)
                      .add(product.period, "day")
                      .format("YYYY년 MM월 DD일")
                  : dayjs()
                      .add(product.period, "day")
                      .format("YYYY년 MM월 DD일")}
                &nbsp;까지
              </PaymentContentsSubText>
            </PaymentContentsWrapper>
          </PaymentContents>
          <PaymentContents>
            <PaymentContentsTitle>골드 상세</PaymentContentsTitle>
            <PaymentContentsWrapper style={{ marginTop: "10px" }}>
              <PaymentContentsSubTitle>충전되는 골드</PaymentContentsSubTitle>
              <PaymentContentsSubText>165개</PaymentContentsSubText>
            </PaymentContentsWrapper>
            <PaymentContentsWrapper style={{ marginTop: "10px" }}>
              <PaymentContentsSubTitle>차감되는 골드</PaymentContentsSubTitle>
              <PaymentContentsSubText>-{product.gold}개</PaymentContentsSubText>
            </PaymentContentsWrapper>
          </PaymentContents>
          <GoldResultWrapper>
            <GoldMyMoneyWrapper>
              <Title>결제금액</Title>
              <GoldChargeResultVATWrapper>
                <GoldChargeResltGold isGold={true}>
                  {priceToString(money)}
                  <GOldChargeResultText>원</GOldChargeResultText>
                </GoldChargeResltGold>
                <GoldChargeResultLine />
                <GOldChargeVAT>vat포함</GOldChargeVAT>
              </GoldChargeResultVATWrapper>
            </GoldMyMoneyWrapper>
            <GoldResultLine />
            <GoldChargeWarningWrapper>
              <GoldChargeWarningImgWrapper>
                <GoldChargeWarningImg
                  src={"/assets/images/warning.svg"}
                  alt="warning"
                />
                <GoldChargeWarningRedText>
                  입금 전 잠깐!
                </GoldChargeWarningRedText>
              </GoldChargeWarningImgWrapper>
              <GoldChargeWarningText>
                SMS인증 결제 시
                <GoldChargeWarningTextRed>
                  &nbsp;현대, 하나, 삼성카드는&nbsp;
                </GoldChargeWarningTextRed>
                사용이 불가능합니다.
              </GoldChargeWarningText>
              <GoldChargeWarningText>
                결제 후 적용까지
                <GoldChargeWarningTextRed>
                  &nbsp;최대 2분이&nbsp;
                </GoldChargeWarningTextRed>
                소요될 수 있습니다.
              </GoldChargeWarningText>
            </GoldChargeWarningWrapper>
          </GoldResultWrapper>
        </PaymentBodyWrapper>
      </Contents>
      <Contents>
        <Title
          style={{
            marginBottom: "50px",
          }}
        >
          결제수단을 선택해주세요
        </Title>
        <GoldMethodWrapper>
          <GoldMethodBtn
            style={{ marginRight: "20px" }}
            name="method"
            value={"CSMS"}
          >
            SMS인증결제
          </GoldMethodBtn>
        </GoldMethodWrapper>

        <GoldChargeCheckWrapper id="check" onClick={handleIsCheck}>
          <GoldChargeCheckImg
            id="check"
            src={
              isCheck
                ? "/assets/images/checkColor.png"
                : "/assets/images/checkGray.png"
            }
          />
          <GoldChargeCheckText id="check">
            구매하는 골드의 가격정보를 확인하였으며, 구매에 동의하시겠습니까?
            <br />
            (전사상거래법 제8조 2항)
          </GoldChargeCheckText>
        </GoldChargeCheckWrapper>
        <GoldChargePGBtn
          name="btn_pay"
          isCheck={isCheck}
          disabled={!isCheck}
          onClick={() => {
            handleModalOpen();
            // handleInnoPay();
          }}
        >
          {isCheck ? (
            <GoldMoneyImg src={"/assets/images/goldWhite.png"} alt="gold" />
          ) : (
            <GoldMoneyImg src={"/assets/images/money.png"} alt="gold" />
          )}
          투달유에스 구독 결제
        </GoldChargePGBtn>
        <GoldWarningWrapper>
          <GoldWarningTitle>결제시 주의사항</GoldWarningTitle>
          <GoldWarningText>
            ∙ 골드 충전 시 결제금액에 VAT(부가세 10%)가 포함되어 있습니다.
          </GoldWarningText>
          <GoldWarningText>
            ∙ 신용카드 결제시 일시불 결제만 가능합니다.
          </GoldWarningText>
          <GoldWarningText>
            ∙ 결제가 완료되기 전에 결제창을 닫으면 결제가 완료되지 않을 수
            있습니다.
          </GoldWarningText>
          <GoldWarningText>
            ∙ 골드 충전 시 지급되는 보너스 골드는 환불금액에 포함되지 않습니다.
          </GoldWarningText>
          <GoldWarningText>
            ∙ 결제관련 문의는 카카오톡으로 연락주시기 바랍니다.
          </GoldWarningText>
          <GoldWarningText>
            ∙ 잔여 포인트 환불 시, 사용이력이 있는 경우 이용수수료 10% 공제 후
            환불됩니다.
          </GoldWarningText>
        </GoldWarningWrapper>
        <GoldChargeServiceWrapper>
          <GoldChargeServiceText
            onClick={() => {
              window.open(
                "https://app.tudal.co.kr/terms/service.html",
                "_blank"
              );
            }}
          >
            서비스 이용약관
          </GoldChargeServiceText>
        </GoldChargeServiceWrapper>
      </Contents>
      <Modal
        open={modalOpen}
        onClose={handleModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          top: "30%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <SignupModalWrapper style={{ fontSize: "14px" }}>
          <SignupModalTitle style={{ marginBottom: "8px" }}>
            결제 전 잠깐!
          </SignupModalTitle>
          SMS인증 결제 시
          <GoldChargeWarningTextRed>
            현대, 하나, 삼성카드는
          </GoldChargeWarningTextRed>
          사용이 불가능합니다.
          <SignupModalBtnWrapper>
            <SignupModalBtnCancle onClick={handleModalOpen}>
              취소
            </SignupModalBtnCancle>
            <SignupModalBtnOk
              onClick={() => {
                handleInnoPay();
              }}
            >
              결제
            </SignupModalBtnOk>
          </SignupModalBtnWrapper>
        </SignupModalWrapper>
      </Modal>
    </Body>
  );
};

export default PaymentCashPresenter;
const SignupModalWrapper = styled.div`
  width: 300px;
  height: 177px;
  padding: 40px 30px;
  background-color: white;
  border-radius: 10px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const SignupModalBtnOk = styled.button`
  width: 100%;
  max-width: 140px;
  font-weight: 700;
  height: 36px;
  background-color: #ff3838;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;
const SignupModalTitle = styled.div`
  font-size: 15px;
  text-align: center;
  font-weight: 700;
`;
const SignupModalBtnWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;
const SignupModalBtnCancle = styled.button`
  width: 100%;
  height: 36px;
  margin-right: 10px;
  border-radius: 10px;
  max-width: 140px;
  cursor: pointer;
  font-weight: 700;
  background-color: #e9e9e9;
`;

const PaymentBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  align-items: center;
`;

const PaymetnTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  margin-bottom: 48px;
`;
const PaymentTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const PaymentContents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px 0px;
  border-top: 5px solid #f7f7f7;
`;

const PaymentContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentContentsTitle = styled.div`
  ${theme.fonts.s16_w700};
`;

const PaymentContentsSubTitle = styled.div`
  ${theme.fonts.s12_w400};
  color: #6b6b6b;
`;

const PaymentContentsSubText = styled.div`
  ${theme.fonts.s12_w700};
`;

const PaymentBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 54px;
  background-color: #ff3838;
  color: white;
  ${theme.fonts.s16_w700};
  align-items: center;
  border-radius: 10px;
  margin-top: 100px;
  margin-bottom: 100px;
  cursor: pointer;
`;

const Body = styled.div`
  @media (max-width: 640px) {
    padding: 30px 10px 30px 10px;
  }
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.02);
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.section`
  display: flex;
  background-color: white;
  max-width: 592px;
  width: 100%;
  padding: 30px;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
`;
const ThemeDetailArrow = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 24px;
  cursor: pointer;
  z-index: 1;
`;
