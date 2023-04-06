import { useRouter } from "next/router";
import { useState, useRef, useEffect, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { apiServer, cmsServer, CMS_TOKEN } from "../../src/commons/axios/axios";
import { setCookie, getCookie } from "../../src/commons/util/cookie/cookie";
import { encrypted } from "../../src/commons/util/func/hash";
import { setUserId } from "../../src/redux/userInfo";
import styled from "@emotion/styled";
import theme from "../../src/commons/theme";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
import toast from "react-hot-toast";
import HeaderLayout from "../../src/components/layout/header";

const tridRegex = /(?=[tT][rR][iI][dD]=).*/g;
const sourceRegex = /(?=[sS][oO][uU][rR][cC][eE]=).*/g;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  //* 로그인 정보
  const [loginInput, setLoginInput] = useState({
    name: "",
    phone: "",
    authCode: "",
  });

  //* 인증 관련 상태
  const [auth, setAuth] = useState({
    send: false,
    ok: false,
    code: "",
    timer: false,
    error: false,
    timeout: false,
  });

  //* 타이머 관련 상태 및 함수 useEffect
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);
  useEffect(() => {
    if (auth.timer) {
      //@ts-ignore
      timerId.current = setInterval(() => {
        //@ts-ignore
        setMin(parseInt(time.current / 60));
        //@ts-ignore
        setSec(time.current % 60);
        time.current -= 1;
      }, 1000);
      //@ts-ignore
      return () => clearInterval(timerId.current);
    }
  }, [auth.timer]);

  // *타이머
  useEffect(() => {
    if (auth.timer) {
      if (time.current <= -1) {
        //@ts-ignore
        clearInterval(timerId.current);
        // dispatch event
      }
    }
  }, [sec, auth.timer]);

  //* 로그인 정보 인풋
  const handleLoginInput = (e: any) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  //* 인증번호 발송 함수
  const handleSMSSend = async () => {
    const randomCode = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    try {
      const { data } = await apiServer.post("/user/checkProps", {
        phoneNumber: loginInput.phone,
      });
      if (data.length === 0) {
        alert("회원정보가 없습니다.");
        return;
      }
      if (data[0].name === loginInput.name) {
        try {
          const { data } = await apiServer.post("/auth/smsSend", {
            phone: loginInput.phone,
            message: `[투자의달인] 인증번호는 [${randomCode}]입니다.`,
          });
          if (data.code === "00") {
            setAuth({
              ...auth,
              send: true,
              code: randomCode,
              timer: true,
              timeout: false,
            });
            setTimeout(() => {
              setAuth({
                ...auth,
                code: "",
                send: true,
                timer: false,
                timeout: true,
              });
            }, 60 * 3 * 1000 + 2000);
          } else {
            alert(
              "SMS 인증요청  5회를 모두 사용하였습니다. \n 24시간 이후 다시 요청해 주시기 바랍니다."
            );
          }
        } catch (e) {}
      } else {
        alert("회원정보가 일치하지 않습니다.");
        return;
      }
    } catch (e) {
      alert("회원정보가 없습니다.");
      return;
    }
  };

  //* 인증번호 체크 후 로그인
  const handleLogin = async () => {
    if (auth.timeout) {
      alert("입력시간이 초과되었습니다.");
      return;
    }
    if (auth.code === loginInput.authCode) {
      try {
        const result = await apiServer.post("/user/checkProps", {
          phoneNumber: loginInput.phone,
        });
        await apiServer.delete("/auth/smsSend", {
          data: {
            phone: loginInput.phone,
          },
        });
        setAuth({
          ...auth,
          code: "",
        });
        let encryptedUserId = encrypted(result.data[0].userId);
        setCookie("tudalUser", encryptedUserId);
        dispatch(setUserId(result.data[0].userId));
        let newData = {
          userId: result.data[0].userId,
          // isOpen: true,
        };

        await cmsServer.post(
          `/tudalus-add-home-popups?token=${CMS_TOKEN}`,
          newData
        );
        //* maxx카드 연동
        const TRIDCOOKIE = getCookie("maxxTRID") || "";
        const SOURCECOOKIE = getCookie("maxxSOURCE") || "";
        const TRID = TRIDCOOKIE.match(tridRegex)?.join().replace("TRID=", "");
        const SOURCE = SOURCECOOKIE.match(sourceRegex)
          ?.join()
          .replace("SOURCE=", "");
        if (TRID) {
          let maxxData = {
            userId: result.data[0].userId,
            trId: TRID,
            source: SOURCE,
          };
          try {
            await apiServer.post(`/marketing/tudalus/maxx/login`, maxxData);
          } catch (e) {}
        }
        toast.success("로그인에 성공하였습니다.");
        navigate.push("/");
      } catch (e) {
        toast.error("입력하신 정보를 다시 확인해주세요.");
      }
    } else {
      toast.error("입력하신 정보를 다시 확인해주세요.");
      setAuth({
        ...auth,
        error: true,
      });
    }
  };

  //* 엔터 키 누를 시 로그인 실행
  const onEnterLogin = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Body>
        <>
          <Contents>
            <Title>TudalUS 회원인증 로그인</Title>
            <LoginSubText>
              TudalUS 회원가입인증으로 가입/로그인을 진행합니다.
            </LoginSubText>
            <LoginInputTitle>이름</LoginInputTitle>
            <LoginInput
              name="name"
              placeholder="실명을 입력해주세요."
              onChange={handleLoginInput}
              disabled={auth.ok}
            />
            <LoginSubText>
              입력하신 정보는 외부에 노출되지 않도록 안전하게 관리됩니다.
            </LoginSubText>
            <LoginInputTitle>휴대폰번호</LoginInputTitle>
            <LoginInputWrapper>
              <LoginInput
                onWheel={(e) => {
                  //@ts-ignore
                  e.target.blur();
                }}
                type="number"
                placeholder="01012345678"
                name="phone"
                onChange={handleLoginInput}
                disabled={auth.ok}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSMSSend();
                  }
                }}
              />
              <Button
                css={css`
                  width: 100%;
                  max-width: 167px;
                  ${theme.fonts.s16_w400};
                  height: 67px;
                  background-color: #ff3838;
                  color: white;
                  outline: none;
                  border-radius: 10px;
                  border: none;
                  cursor: pointer;
                  margin-left: 20px;
                  :disabled {
                    background-color: #f7f7f7;
                    color: #a9a9a9;
                  }
                  :hover {
                    background-color: #ffa6a6;
                  }
                `}
                disabled={!loginInput.name || !loginInput.phone || auth.timer}
                onClick={handleSMSSend}
              >
                인증번호 발송
              </Button>
            </LoginInputWrapper>
            <LoginAuthInputBox>
              <LoginInput
                type="number"
                placeholder="인증번호를 입력해주세요"
                name="authCode"
                disabled={!auth.send}
                onChange={handleLoginInput}
                onKeyPress={onEnterLogin}
              />
              {auth.send && <LoginTimer>{`${min} : ${sec}`}</LoginTimer>}
            </LoginAuthInputBox>
            <LoginError>
              ∙ 인증번호가 오지 않으면 입력하신 정보가 정확한지 확인해 주세요.
              <br />∙ 인증번호 발송은 5회로 제한됩니다.
              <br />
              {auth.timeout && "∙ 입력시간이 초과되었습니다."}
            </LoginError>
            <Button
              disabled={!auth.send}
              onClick={handleLogin}
              css={css`
                width: 100%;
                height: 67px;
                color: white;
                ${theme.fonts.s18_w400};
                background-color: #ff3838;
                border-radius: 10px;
                border: none;
                outline: none;
                cursor: pointer;
                margin-top: 50px;
                :disabled {
                  background-color: #f7f7f7;
                  color: #a9a9a9;
                }
                :hover {
                  background-color: #ffa6a6;
                }
              `}
            >
              회원인증 로그인
            </Button>
          </Contents>
        </>
      </Body>
    </>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout title="투달유에스 | 로그인">{page}</HeaderLayout>;
};

const LoginSubText = styled.div`
  ${theme.fonts.s12_w400};
  padding-top: 8px;
`;

const LoginInputTitle = styled.div`
  ${theme.fonts.s16_w500};
  margin-top: 50px;
  margin-bottom: 10px;
`;

const LoginInputWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 67px;
  min-height: 67px;
  padding-left: 20px;
  ${theme.fonts.s16_w400};
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  outline: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    ${theme.fonts.s16_w400};
    color: #a9a9a9;
  }
  :focus {
    border: 2px solid black;
  }
`;

const LoginError = styled.div`
  margin-top: 15px;
  color: #ff3838;
  ${theme.fonts.s12_w400};
  line-height: 120%;
`;

const LoginAuthInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LoginTimer = styled.div`
  ${theme.fonts.s14_w400};
  position: absolute;
  color: #ff383899;
  margin-right: 20px;
`;

const Body = styled.div`
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

const Contents = styled.section`
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

const Title = styled.h3`
  ${theme.fonts.s16_w700};
  display: flex;
  align-items: center;
`;
