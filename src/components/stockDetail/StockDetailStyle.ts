import styled from "@emotion/styled";
import theme from "../../commons/theme";

interface BarStyle {
  left?: any;
  selectBar?: boolean;
}

export const StockDatailWrapper = styled.div`
  max-width: 1100px;
  /* min-width: 428px; */
  width: 100%;
`;

export const StockDetailHeader = styled.div`
  padding: 20px;
  background-color: white;
`;

export const StockDetailArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const StockDetailHeart = styled.img`
  cursor: pointer;
  width: 42px;
  height: 42px;
`;

export const StockDetailArrow = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const StockDetailHeaderContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StockDetailHeaderLeftWrapper = styled.div`
  display: flex;
`;

export const StockDetailLogo = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid var(--gray);
`;

export const StockDetailContentsWrapper = styled.div`
  margin-left: 16px;
`;

export const StockDetailTitleWrapper = styled.div`
  display: flex;
  /* align-items: flex-end; */
  flex-wrap: wrap;
  flex-direction: column;
`;

export const StockDetailTitle = styled.div`
  ${theme.fonts.s18_w700};
`;

export const StockDetailSubTitle = styled.div`
  color: #999999;
  margin-top: 4px;
  ${theme.fonts.s14_w400};
`;

export const StockDetailPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockDetailPrice = styled.div`
  color: #444444;
  ${theme.fonts.s16_w400};
  margin-top: 4px;
`;

export const StockDetailRatio = styled.div`
  color: var(--red);
  ${theme.fonts.s16_w700};
  display: flex;
  align-items: center;
`;

export const StockDetailChange = styled.div`
  color: var(--red);
  margin-left: 4px;
  ${theme.fonts.s16_w700};
  display: flex;
  align-items: center;
`;

export const StockDetailTag = styled.div`
  color: var(--tag-blue);
  margin-top: 4px;
  ${theme.fonts.s14_w400};
`;

export const StockDetailChangeButton = styled.button`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 30px;
  ${theme.fonts.s12_w700};
  color: #212121;
  width: 70px;
`;

export const StockDetailNowPriceWrapper = styled.div``;

export const StockDetailBar = styled.div`
  height: 18px;
  background-color: black;
  width: 100%;
  border-radius: 8px;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0px 20px;
  margin-top: 40px;
`;

export const StockDetailBarTextWrapper = styled.div`
  position: absolute;
  top: -30px;
  margin-left: -20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StockDetailBarText = styled.div`
  margin-bottom: -10px;
  min-width: 45px;
  /* width: 70px; */
`;

export const StockDetailBarColor = styled.div`
  height: 18px;
  background: linear-gradient(
    270deg,
    rgba(255, 29, 64, 1) 0%,
    rgba(110, 29, 29, 1) 100%
  );
  left: 0px;
  /* width: 50%; */
  border-radius: 8px;
  position: absolute;
`;

export const StockDetailDivision = styled.div`
  border-right: 1px solid white;
  height: ${(props: BarStyle) =>
    props.left === 0 || props.left === 10 || props.left === 20
      ? "10px"
      : "4px"};
  z-index: 2;
  display: flex;
  justify-content: space-between;
  width: 1px;
`;

export const StockDetailMinMaxPriceWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 8px;
`;

export const StockDetailMaxMinTextLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockDetailMaxMinTextRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const StckDetailPriceRed = styled.div`
  ${theme.fonts.s14_w700};
  color: var(--red);
`;

export const StckDetailPriceBlue = styled.div`
  ${theme.fonts.s14_w700};
  color: var(--blue);
`;

export const StckDetailPriceGray = styled.div`
  ${theme.fonts.s12_w400};
  color: #707070;
  margin-top: 4px;
`;

export const StockDetailBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--light-gray);
  padding-top: 45px;
  padding-bottom: 40px;
`;

export const StockDetailBodyTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  margin-bottom: 20px;
  align-items: flex-end;
`;

export const StockDetailBodyTitle = styled.div`
  ${theme.fonts.s18_w700};
`;

export const StockDetailBodySpan = styled.span`
  ${theme.fonts.s18_w400};
`;

export const StockDetailBodySub = styled.div`
  color: ${theme.color.black};
  ${theme.fonts.s14_w400};
`;

export const StockDetailWhiteBox = styled.div`
  border-radius: 16px;
  background-color: white;
  padding: 35px 30px 35px 30px;
`;

export const StockDivideLine = styled.div`
  border-top: 1px solid #eeeeee;
  margin: 35px 0px;
`;

export const StockDetailFinanceTitle = styled.div`
  ${theme.fonts.s18_w700};
`;

export const StockDetailFinanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
`;

export const StockDetailFinanceBtnWrapper = styled.div``;

export const StockDetailFinanceBtn = styled.button`
  padding: 6px 12px;
  background-color: ${(props: BarStyle) =>
    props.selectBar ? "#ffe8eb" : "#f6f3f3"};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 18px;
  margin-right: 8px;
  color: ${(props: BarStyle) => (props.selectBar ? "#ff1d40" : "#707070")};
  font-weight: ${(props: BarStyle) => (props.selectBar ? 700 : 400)};
`;

export const StockDetailFinanceRightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StockDetailFinanceColorBlue = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background-color: #85f3e8;
  margin-left: 10px;
`;

export const StockDetailFinanceColorYellow = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background-color: #f8e495;
  margin-left: 10px;
`;

export const StockDetailFinanceColorRed = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background-color: #f8b995;
  margin-left: 10px;
`;

export const StockDetailFinanceText = styled.div`
  margin-left: 6px;
`;

export const StockDividendWrapper = styled.div`
  background-color: #f6f3f3;
  /* padding: 24px 41px; */
  border-radius: 18px;
  display: flex;
  align-items: center;
  height: 67px;
  justify-content: space-evenly;
  margin-top: 25px;
  margin-bottom: 14px;
`;

export const StockDividendText = styled.div`
  ${theme.fonts.s16_w400};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StockDividendSpan = styled.div`
  ${theme.fonts.s14_w700};
  padding-left: 8px;
`;
export const StockDividendLine = styled.div`
  border-right: 1px solid #cbcbcb;
  width: 1px;
  height: 20px;
`;
export const StockPeerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 0px 30px;
`;

export const StockPeerTitle = styled.div`
  ${theme.fonts.s18_w700};
`;

export const StockPeerContentsWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 25px;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  justify-content: start;
  white-space: nowrap;
`;

export const StockPeerContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  cursor: pointer;
  align-items: center;
`;

export const StockPeerLogo = styled.img`
  width: 70px;
  height: 70px;
  /* height: 96px; */
  border-radius: 50%;
  background-color: white;
`;

export const StockPeerName = styled.div`
  ${theme.fonts.s18_w700};
  margin-top: 14px;
`;
export const StockPeerRatio = styled.div`
  ${theme.fonts.s16_w400};
  /* font-weight: 700; */
  /* color: var(--red); */
`;

export const StockDataLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 100vh;
  margin-bottom: -100px;
`;

export const StockDetailTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockDetailText = styled.div`
  ${theme.fonts.s12_w400};
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-top: 5px;
  border-radius: 16px;
  padding: 4px;
  color: #212121;
  background-color: var(--light-gray);
`;

export const StockDetailLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const ModalLogo = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid var(--gray);
  position: absolute;
  left: 40%;
  top: -36px;
  background-color: white;
`;

export const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

export const ModalTitle = styled.div`
  ${theme.fonts.s20_w700};
`;

export const ModalSubTitle = styled.div`
  ${theme.fonts.s16_w400};
  color: var(--text-gray);
  margin-top: 5px;
`;
export const ModalLine = styled.div`
  width: 20%;
  border-top: 2px solid var(--gray);
  margin-top: 16px;
`;

export const NoDividendWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;
`;

export const NoDividendText = styled.div`
  color: var(--gray);
  ${theme.fonts.s16_w400};
  margin-top: 8px;
`;

export const ModalXIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 90%;
  top: -20px;
`;

export const CircleIcon = styled.img``;

export const StockArrowIcon = styled.img``;
