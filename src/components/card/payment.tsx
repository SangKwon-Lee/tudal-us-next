import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import theme from "../../commons/theme";
import Icon from "../../commons/theme/icon";

interface Props {
  product: any;
  canBuy: boolean;
  subtractGold: {
    remainGold: number;
    remainBonusGold: number;
    remainUserGold: number;
    remainUserBonusGold: number;
  };
  userGold: {
    bonusGold: number;
    created_at: string;
    created_by: null;
    gold: number;
    id: number;
    updated_at: string;
    updated_by: null;
    userId: number;
  };
  tudlaUsHistory: any;
  handleUserGoldSubtract: () => void;
}

export default function PaymentCard(props: Props) {
  const {
    canBuy,
    handleUserGoldSubtract,
    product,
    subtractGold,
    tudlaUsHistory,
    userGold,
  } = props;
  const router = useRouter();
  return (
    <>
      <Body>
        <Contents>
          <Icon
            width={20}
            height={20}
            src="./assets/images/iconBack.svg"
            onClick={() => {
              router.push("/");
            }}
          />
          <PaymentBodyWrapper>
            <Icon
              width={40}
              height={40}
              src={
                canBuy
                  ? "/assets/images/plusIcon.png"
                  : "/assets/images/miusIcon.png"
              }
            ></Icon>
            <PaymetnTitleWrapper>
              {canBuy ? (
                <PaymentTitle>TudalUS 한 달 구독 하기</PaymentTitle>
              ) : (
                <PaymentTitle>결제할 골드가 부족합니다</PaymentTitle>
              )}
            </PaymetnTitleWrapper>
            <PaymentContents>
              <PaymentContentsTitle>상품명 : tudalus</PaymentContentsTitle>
              <PaymentContentsWrapper
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <PaymentContentsSubTitle>결제방식</PaymentContentsSubTitle>
                <PaymentContentsSubText style={{ color: "#00B06A" }}>
                  구독({product[0].period}일)
                </PaymentContentsSubText>
              </PaymentContentsWrapper>
              <PaymentContentsWrapper>
                <PaymentContentsSubTitle>
                  결제시 구독기간
                </PaymentContentsSubTitle>
                <PaymentContentsSubText>
                  {dayjs(tudlaUsHistory.endDate).isAfter(dayjs().format())
                    ? dayjs(tudlaUsHistory.endDate)
                        .add(product[0].period, "day")
                        .format("YYYY년 MM월 DD일")
                    : dayjs()
                        .add(product[0].period, "day")
                        .format("YYYY년 MM월 DD일")}
                  &nbsp;까지
                </PaymentContentsSubText>
              </PaymentContentsWrapper>
            </PaymentContents>
            <PaymentContents>
              <PaymentContentsTitle>
                결제할 골드 : -{product[0].gold}개
              </PaymentContentsTitle>
              <PaymentContentsWrapper
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <PaymentContentsSubTitle>골드</PaymentContentsSubTitle>
                <PaymentContentsSubText>
                  -{product[0].gold * 0.9}개
                </PaymentContentsSubText>
              </PaymentContentsWrapper>
              <PaymentContentsWrapper>
                <PaymentContentsSubTitle>
                  보너스 골드 (구매금액의 10%까지 차감)
                </PaymentContentsSubTitle>
                <PaymentContentsSubText>
                  -{product[0].gold / 10}개
                </PaymentContentsSubText>
              </PaymentContentsWrapper>
            </PaymentContents>
            <PaymentContents style={{ borderBottom: "5px solid #f7f7f7" }}>
              {canBuy ? (
                <PaymentContentsTitle>
                  결제 후 남은 골드 : &nbsp;
                  {subtractGold.remainUserGold +
                    subtractGold.remainUserBonusGold}
                  개
                </PaymentContentsTitle>
              ) : (
                <PaymentContentsTitle>
                  보유 중인 골드 : &nbsp;
                  {userGold.gold}개
                </PaymentContentsTitle>
              )}
              <PaymentContentsWrapper
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <PaymentContentsSubTitle>골드</PaymentContentsSubTitle>
                {canBuy ? (
                  <PaymentContentsSubText>
                    {subtractGold.remainUserGold}개
                  </PaymentContentsSubText>
                ) : (
                  <PaymentContentsSubText>
                    {userGold.gold}개
                  </PaymentContentsSubText>
                )}
              </PaymentContentsWrapper>
              <PaymentContentsWrapper>
                <PaymentContentsSubTitle>보너스 골드</PaymentContentsSubTitle>
                {canBuy ? (
                  <PaymentContentsSubText>
                    {subtractGold.remainUserBonusGold}개
                  </PaymentContentsSubText>
                ) : (
                  <PaymentContentsSubText>
                    {userGold.bonusGold}개
                  </PaymentContentsSubText>
                )}
              </PaymentContentsWrapper>
            </PaymentContents>
          </PaymentBodyWrapper>
          <PaymentBtn
            onClick={() => {
              canBuy ? handleUserGoldSubtract() : router.push("/paymentcash");
            }}
          >
            {canBuy ? (
              "골드로 결제하기"
            ) : (
              <>
                <Icon
                  width={24}
                  height={24}
                  src={"/assets/images/goldWhite.png"}
                />
                즉시 결제하기
              </>
            )}
          </PaymentBtn>
        </Contents>
      </Body>
    </>
  );
}

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
