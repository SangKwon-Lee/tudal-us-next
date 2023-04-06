import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import TudalHeaderLayout from "./tudalHeader";
interface Props {
  children: React.ReactNode;
  title: string;
}
export const BrowserWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function HeaderLayout({ children, title }: Props) {
  const router = useRouter();
  const { asPath } = router;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="투달유에스" />
        <link rel="canonical" href={`https://us.tudal.co.kr${asPath}`}></link>
        <meta name="company" content="투자의달인" />
        <meta
          name="keywords"
          content="투달유에스,이노핀,미국주식,핀테크,빅데이터,미국주식앱,미국주식앱추천,미국주식투자앱,증권앱,미국주식어플리케이션,모바일어플리케이션,종목상담,종목상담앱,미국주식투자어플리케이션,모바일앱,인공지능,로보어드바이저,미국주식분석,미국주식종목추천,미국주식로봇,미국주식인공지능,가치투자,미국주식알고리즘"
        />
      </Head>
      <TudalHeaderLayout />
      <BrowserWrapper>{children}</BrowserWrapper>
    </>
  );
}