import styled from "@emotion/styled";

interface ILayout {
  children: React.ReactNode;
}

export const BrowserWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Layout({ children }: ILayout) {
  return <BrowserWrapper>{children}</BrowserWrapper>;
}
