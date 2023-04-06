import styled from "@emotion/styled";

export const BackGround = styled.div`
  width: 100%;
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.div`
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

export const Contents = styled.section`
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

export const Title = styled.h3`
  @media (max-width: 640px) {
    font-size: 16px;
  }
  display: flex;
  align-items: center;
`;
