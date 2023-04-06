import styled from "@emotion/styled";
import theme from "../../commons/theme";
export default function FooterLayout() {
  return (
    <Footer>
      <FooterWrapper>
        <FooterCompanyWrapper>
          <FooterCompany
            onClick={() => window.open("https://innofin.co.kr/", "_blank")}
          >
            회사소개
          </FooterCompany>
          <FooterCompanyLine />
          <FooterCompany
            onClick={() =>
              window.open(
                "https://innofin.notion.site/e014ba0eb5f94e6092c073b597ae821e",
                "_blank"
              )
            }
          >
            서비스 이용약관
          </FooterCompany>
          <FooterCompanyLine />
          <FooterCompany
            onClick={() =>
              window.open(
                "https://innofin.notion.site/40a0d5d37b81477bb7c3635f0b571d1d",
                "_blank"
              )
            }
          >
            개인정보처리방침
          </FooterCompany>
          <FooterCompanyLine />
          <FooterCompany
            onClick={() =>
              window.open(
                "https://innofin.notion.site/c10e373999d349d69d67977f6dd11fe5",
                "_blank"
              )
            }
          >
            개인정보 수집 및 이용
          </FooterCompany>
        </FooterCompanyWrapper>
        <FooterCompanyBottomWrapper>
          <FooterHead>(주)이노핀</FooterHead>
          <FooterContents>
            주소 : 서울특별시 서초구 강남대로 311(서초동 1338-12) 드림플러스
            11층
            <br /> 대표 : 이승엽, 손상현 <br /> 사업자등록번호 : 123-86-44800
            <br /> 통신판매번호 : 2017-서울영등포-0758 <br /> 메일 :
            tudal.app@innofin.co.kr
            <br />
            개인정보보호책임자 : 이승엽 <br /> Copyright © 2013-2021 (주)이노핀.
            All Rights Reserved.
          </FooterContents>
        </FooterCompanyBottomWrapper>
      </FooterWrapper>
    </Footer>
  );
}

export const Footer = styled.footer`
  width: 100%;
  background-color: #4b4b4b;
  color: #f7f7f7;
  display: flex;
  justify-content: center;
  padding: 40px ${theme.metrics.m8};
`;

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1060px;
`;

export const FooterCompanyWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 592px;
  margin-bottom: 25px;
  align-items: center;
  justify-content: space-between;
`;

export const FooterCompanyBottomWrapper = styled.div`
  @media (max-width: 640px) {
    flex-direction: column;
  }
  display: flex;
`;

export const FooterCompany = styled.div`
  @media only all and (max-width: 640px) {
    font-size: 10px;
  }
  font-size: 12px;
  color: white;
  cursor: pointer;
`;

export const FooterHead = styled.div`
  color: #f7f7f7;
  font-weight: 700;
  font-size: 15px;
  margin-right: 40px;
  min-width: 67px;
`;

export const FooterCompanyLine = styled.div`
  border-left: 1px solid white;
  height: 13px;
`;

export const FooterContents = styled.div`
  @media only all and (max-width: 640px) {
    font-size: 10px;
    margin-top: 25px;
  }
  color: white;
  font-size: 12px;
  line-height: 18px;
`;

export const FooterSNS = styled.img`
  @media (max-width: 640px) {
    margin-right: 20px;
    margin-left: 0px;
  }
  width: 32px;
  margin-left: 20px;
  cursor: pointer;
`;

export const FooterSNSWrapper = styled.div`
  @media (max-width: 640px) {
    justify-content: flex-start;
  }
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;
