import styled from "@emotion/styled";

export const DrawerXWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const DrawerX = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export const DrawerBody = styled.div`
  background: rgb(255, 29, 64);
  background: linear-gradient(
    180deg,
    rgba(255, 29, 64, 1) 0%,
    rgba(210, 10, 41, 1) 100%
  );
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
`;

export const DrawerTitle = styled.div`
  color: white;
  font-size: 18px;
  display: flex;
`;

export const DrawerTitleBold = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: white;
`;

export const DrawerSubsWrapper = styled.div`
  background-color: white;
  width: 100%;
  padding: 14px 20px;
  border-radius: 10px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  z-index: 3;
`;

export const DrawerSubsTitle = styled.div`
  margin-bottom: 14px;
  font-size: 15px;
`;
export const DrawerSubsTitleRed = styled.span`
  color: #ff3838;
  font-weight: 700;
  font-size: 15px;
`;
export const DrawerSubsContentsWrapper = styled.div`
  display: flex;
  font-size: 13px;
  margin-bottom: 10px;
`;
export const DrawerSubsContentsTitle = styled.div`
  margin-right: 10px;
`;
export const DrawerSubsContentsText = styled.div`
  font-weight: 700;
`;
export const DrawerSubsBtn = styled.button`
  cursor: pointer;
  color: white;
  width: 100%;
  background-color: #ff3838;
  border-radius: 16px;
  font-weight: 700;
  padding: 8px;
`;

export const DrawerGoldTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 10px;
`;
export const DrawerGoldTitle = styled.div`
  color: white;
  font-size: 16px;
  display: flex;
`;
export const DrawerGold = styled.div`
  color: white;
  font-weight: 700;
  font-size: 18px;
`;

export const DrawerBottomText = styled.button`
  color: white;
  width: 140px;
  height: 30px;
  cursor: pointer;
  border-radius: 12px;
  background-color: #b7011d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DrawerIcon = styled.img`
  width: 18px;
  cursor: pointer;
  margin-left: 10px;
  padding-bottom: 3px;
`;

export const DrawerGoldIcon = styled.img`
  margin-right: 4px;
`;

export const DrawerBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

export const DrawerBackImg = styled.div`
  position: absolute;
  background-color: #eceaea;
  width: 100%;
  height: 65%;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  bottom: 0;
  z-index: 1;
`;

export const DrawerServiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  cursor: pointer;
`;

export const DrawerServiceText = styled.div`
  font-size: 12px;
  cursor: pointer;
`;

export const DrawerServiceIcon = styled.img`
  cursor: pointer;
`;

export const DrawerServiceLine = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #f6f3f3;
  margin: 4px 0px 8px 0px;
`;

export const DrawerSiteWrapper = styled.div`
  display: flex;
  z-index: 3;
  margin-top: 15px;
`;

export const DrawerSiteTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 14px;
  cursor: pointer;
`;

export const DrawerSiteText = styled.div`
  color: #2b2b2b;
  font-size: 10px;
  margin-top: 8px;
`;

export const DrawerSite = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  background-color: white;
`;

export const DrawerSiteIcon = styled.img`
  width: 100%;
  height: 100%;
`;
