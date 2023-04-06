import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import theme from "../../commons/theme";
const HomeMenuBtn = [
  {
    value: "/",
    text: "종목추천",
  },
  {
    value: "/favorite",
    text: "관심종목",
  },
  {
    value: "/theme",
    text: "테마",
  },
  {
    value: "/index",
    text: "지수",
  },
];
export default function HomeNav() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Wrapper>
      <HomeMenuWrapper>
        {HomeMenuBtn.map((data) => (
          <Button
            key={data.text}
            css={css`
              border-radius: 0;
              border-bottom: ${data.value === pathname
                ? `2px solid ${theme.color.black}`
                : "none"};
              color: ${data.value === pathname
                ? theme.color.black
                : theme.color.gray};
              font-size: ${theme.fonts.s16_w400};
              font-weight: ${data.value === pathname ? 700 : 400};
              padding-bottom: ${theme.metrics.m2};
              margin-right: ${theme.metrics.m2};
              cursor: pointer;
            `}
            onClick={() => {
              router.push(`${data.value}`);
            }}
          >
            {data.text}
          </Button>
        ))}
      </HomeMenuWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: 0px ${theme.metrics.m5};
  display: flex;
  flex-direction: column;
`;

const HomeMenuWrapper = styled.nav`
  display: flex;
  margin-top: ${theme.metrics.m5};
`;
