import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cmsServer, CMS_TOKEN } from "../../commons/axios/axios";
import { getCookie } from "../../commons/util/cookie/cookie";
import { decrypt } from "../../commons/util/func/hash";
import { setIsSub, setUserPremium, setUserId } from "../../redux/userInfo";
import { RootState } from "../../store";
import styled from "@emotion/styled";
import theme from "../../commons/theme";
import { css } from "@emotion/react";
import DrawerContainer from "../commons/drawer/Drawer.container";
import { Button } from "@mui/material";
import Icon from "../../commons/theme/icon";

export default function TudalHeaderLayout() {
  const router = useRouter();
  const { asPath } = router;
  const dispatch = useDispatch();
  const { userPremium, userId } = useSelector(
    (state: RootState) => state.userInfo
  );

  //* 구독 중인 유저인지 아닌지 체크
  const handleGetUserPremium = useCallback(async () => {
    const userId = decrypt(getCookie("tudalUser"));
    if (userId) {
      try {
        const { data } = await cmsServer.get(
          `/tudalus-premium-users?userId=${userId}&token=${CMS_TOKEN}`
        );
        dispatch(setIsSub(dayjs(data[0].endDate).isAfter(dayjs().format())));
        dispatch(setUserPremium(data[0]));
        dispatch(setUserId(userId));
      } catch (e) {}
    }
  }, [dispatch]);

  useEffect(() => {
    const userId = decrypt(getCookie("tudalUser"));
    if (userId) {
      handleGetUserPremium();
    }
  }, [handleGetUserPremium]);

  // * Side Sheet
  const [open, setOpen] = useState(false);

  //* Side Sheet 열기 함수
  const handleOpen = () => {
    setOpen(() => !open);
  };

  return (
    <>
      <Header>
        <HeaderNavWrapper>
          <HeaderNav>
            <Icon
              width={100}
              height={100}
              style={{ cursor: "pointer" }}
              src={"/assets/images/tudalus_logo02.svg"}
              onClick={() => {
                router.push("/");
              }}
            />
          </HeaderNav>
          <HeaderNav style={{ paddingTop: "7px" }}>
            {userId ? (
              <>
                <HeaderSubsBtn
                  css={css`
                    cursor: ${dayjs(userPremium.endDate).isAfter(
                      dayjs().format()
                    )
                      ? "auto"
                      : "pointer"};
                  `}
                  onClick={() => {
                    if (dayjs(userPremium.endDate).isAfter(dayjs().format())) {
                      return;
                    } else {
                      router.push("payment");
                    }
                  }}
                >
                  {dayjs(userPremium.endDate).isAfter(dayjs().format())
                    ? "구독중"
                    : "구독 하기"}
                </HeaderSubsBtn>
                <Icon
                  width={32}
                  height={32}
                  style={{ cursor: "pointer" }}
                  src={"/assets/images/my.svg"}
                  onClick={handleOpen}
                ></Icon>
              </>
            ) : (
              <>
                <Button
                  css={css`
                    ${theme.fonts.s16_w400};
                    color: ${theme.color.black};
                    font-weight: ${asPath === "/signup" ? 700 : 400};
                  `}
                  onClick={() => router.push("/signup")}
                  href="/signup"
                >
                  회원가입
                </Button>
                <HeaderMenuLine />
                <Button
                  css={css`
                    ${theme.fonts.s16_w400};
                    color: ${theme.color.black};
                    font-weight: ${asPath === "/login" ? 700 : 400};
                  `}
                  href="/login"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  로그인
                </Button>
              </>
            )}
          </HeaderNav>
        </HeaderNavWrapper>
      </Header>
      <DrawerContainer open={open} handleOpen={handleOpen} />
    </>
  );
}

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 70px;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #f4f4f4;
`;

const HeaderNavWrapper = styled.div`
  padding: 0px ${theme.metrics.m5};
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
`;

const HeaderMenuLine = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
  border-right: 2px solid #d9d9d9;
  width: 2px;
  height: 16px;
  margin: 0px 26px;
`;

const HeaderSubsBtn = styled.button`
  color: #ff1d40;
  ${theme.fonts.s12_w700};
  border: 1px solid #ff1d40;
  border-radius: 13px;
  padding: 4px 8px;
  margin-right: 12px;
`;
