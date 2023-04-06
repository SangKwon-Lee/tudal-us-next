import styled from "@emotion/styled";
import { RootState } from "../../store";
import theme from "../../commons/theme";
import { memo, useCallback, useEffect } from "react";
import { apiServer } from "../../commons/axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { setExchangeData } from "../../redux/exchangeData";
import { priceToString } from "../../commons/util/func/priceToString";

const Exchange = () => {
  const dispatch = useDispatch();
  // * 환율 정보 데이터
  const { exchangeData } = useSelector(
    (state: RootState) => state.exchangeData
  );
  // * 환율 데이터 받아오는 함수
  const getExchange = useCallback(async () => {
    if (Number(exchangeData.currency) === 0) {
      try {
        const { data, status } = await apiServer.get(`/tudalus/currency`);
        if (status === 200 && data.data) {
          dispatch(setExchangeData(data.data));
        }
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getExchange();
  }, [getExchange]);

  return (
    <ExchangeWrapper>
      <ExchangeTitleWrapper>
        <ExchangeTitle>1달러에 얼마지 ?</ExchangeTitle>
        <ExchangeRightWrapper>
          <ExchageNum>{priceToString(exchangeData.currency)}원</ExchageNum>
          <ExchangeSubTitle>{exchangeData.date}기준</ExchangeSubTitle>
        </ExchangeRightWrapper>
      </ExchangeTitleWrapper>
    </ExchangeWrapper>
  );
};

export default memo(Exchange);

const ExchangeWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ExchangeTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExchangeTitle = styled.div`
  ${theme.fonts.s20_w400};
`;

const ExchageNum = styled.h1``;

const ExchangeSubTitle = styled.div`
  color: ${theme.color.black};
  ${theme.fonts.s12_w400};
`;

const ExchangeRightWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
