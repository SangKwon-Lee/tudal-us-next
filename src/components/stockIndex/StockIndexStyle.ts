import styled from "@emotion/styled";
import theme from "../../commons/theme";

export const StockIndexWrapper = styled.div`
  max-width: 1100px;
  /* min-width: 428px; */
  width: 100%;
  padding-top: 46px;
  padding-bottom: 20px;
  background-color: var(--light-gray);
`;

export const StockIndexWhiteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
`;

export const StockIndexMin = styled.div`
  ${theme.fonts.s12_w400};
  color: #707070;
`;

export const StockIndexTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StockIndexTitle = styled.div`
  ${theme.fonts.s20_w700};
`;

export const StockRatioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StockIndexNum = styled.div`
  ${theme.fonts.s20_w700};
  color: var(--blue);
  margin-right: ${theme.metrics.m3};
`;

export const StockIndexRatio = styled.div`
  padding: ${theme.metrics.m1} ${theme.metrics.m2};
  background-color: #e4f2ff;
  border-radius: 8px;
  ${theme.fonts.s16_w700};
`;

export const StockIndexLine = styled.div`
  border-top: 1px solid var(--gray);
  margin: 18px 0px;
  ${theme.fonts.s14_w400};
`;

export const StockIndexContents = styled.div`
  color: var(--text-gray);
  margin-bottom: 20px;
  ${theme.fonts.s14_w400};
`;
