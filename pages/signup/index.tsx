import { useState, useEffect, ReactElement } from "react";
import { apiServer } from "../../src/commons/axios/axios";
import { changeBirth } from "../../src/commons/util/func/changeBirth";
import useScrollReset from "../../src/commons/util/func/useScrollReset";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import theme from "../../src/commons/theme";
import { Modal } from "react-bootstrap";
import { isFrugalPhone, isPhone } from "../../src/commons/util/func/isPhone";
import {
  phoneArr,
  phoneArr2,
  signupArr,
} from "../../src/components/commons/option/signup";
import HeaderLayout from "../../src/components/layout/header";

interface SignupStyle {
  isActive?: boolean;
}

const SignupPage = () => {
  useScrollReset();
  const navigate = useRouter();

  // * 회원가입 정보 관리
  const [signupInput, setSignupInput] = useState({
    name: "",
    birth: "",
    gender: "",
    phoneNumber: "",
    telecomCode: "",
  });

  // * 동의체크
  const [isCheck, setIsCheck] = useState([false, false, false, false, false]);

  //* 알뜰폰 보기
  const [isView, setIsView] = useState(false);

  //* ARS 인증 버튼
  const [isAuth, setIsAuth] = useState({
    isBtn: true,
    isAuthOk: false,
  });

  //* ARS 인증 코드
  const [isAuthCode, setIsAuthCode] = useState("");

  // * 이미 가입된 회원 모달 Open
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (
      isCheck[0] &&
      isCheck[1] &&
      isCheck[2] &&
      isCheck[3] &&
      signupInput.birth &&
      signupInput.name &&
      signupInput.phoneNumber &&
      signupInput.telecomCode &&
      signupInput.gender
    ) {
      setIsAuth({
        ...isAuth,
        isBtn: true,
      });
    } else {
      setIsAuth({
        ...isAuth,
        isBtn: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck, signupInput]);

  // * ARS 인증 받기
  const handlAuthArs = async () => {
    const { name, gender, phoneNumber, birth, telecomCode } = signupInput;
    try {
      const { data: checkUser, status: checkUserStatus } = await apiServer.post(
        `/user/checkProps`,
        {
          phoneNumber: signupInput.phoneNumber,
        }
      );

      if (checkUserStatus === 200 && checkUser) {
        if (checkUser.length > 0) {
          setModalOpen(true);
          return;
        }
      }
      const newData = {
        name,
        telecomCode,
        phoneNumber,
        birthday: changeBirth(birth),
        gender,
        nation: "1",
      };
      const { data, status } = await apiServer.post(`/user/authArs`, newData);
      if (status === 200 && data.result === "00") {
        const { authNumber, authReqNumber, requestTime } = data;
        setIsAuthCode(authNumber);
        window.scrollTo(0, 0);
        handelRequestVerification(authNumber, authReqNumber, requestTime);
      } else {
        alert("인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      alert("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // * ARS 인증 검증
  const handelRequestVerification = async (
    authNumber: string,
    authReqNumber: string,
    requestTime: string
  ) => {
    const { name, gender, phoneNumber, birth, telecomCode } = signupInput;
    try {
      const newData = {
        name,
        phoneNumber,
        telecomCode,
        gender,
        birthday: changeBirth(birth),
        nation: "1",
        authNumber,
        authReqNumber,
        requestTime,
      };
      const { data, status } = await apiServer.post(`/user/verifyArs`, newData);
      if (status === 200 && data.result === "00") {
        const { ci, di } = data;
        handleSignup(ci, di);
        handleFetchArsResult(authReqNumber, requestTime);
      } else {
        alert("인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      alert("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // * ARS 검증 결과
  const handleFetchArsResult = async (
    authReqNumber: string,
    requestTime: string
  ) => {
    const { data, status } = await apiServer.post(`/user/fetchArsResult`, {
      requestTime,
      authReqNumber,
    });
    if (status === 200 && data.isVerify === "Y") {
      setIsAuthCode("");
      setIsAuth({
        ...isAuth,
        isAuthOk: true,
      });
    } else {
      alert("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  //* 회원가입
  const handleSignup = async (ci: string, di: string) => {
    const { name, gender, phoneNumber, birth, telecomCode } = signupInput;
    try {
      const { data: checkUser, status } = await apiServer.post(
        `/user/checkProps`,
        {
          phoneNumber: signupInput.phoneNumber,
        }
      );
      if (status === 200 && checkUser) {
        let newUser = {};
        // 이미 가입된 유저의 경우
        if (checkUser.length > 0) {
          newUser = {
            name,
            phoneNumber,
            telecomCode,
            gender,
            birthday: changeBirth(birth),
            nation: "1",
            ci,
            di,
            userId: checkUser[0].userId,
            type: "reuse",
          };
        } else {
          newUser = {
            name,
            phoneNumber,
            telecomCode,
            gender,
            birthday: changeBirth(birth),
            nation: "1",
            ci,
            di,
            type: "new",
          };
        }
        const { data: createUser, status: createStatus } = await apiServer.post(
          `/user`,
          newUser
        );
        if (createStatus === 200) {
          if (Array.isArray(createUser)) {
            if (createUser.length > 0) {
              try {
                /**
                 * 신규 가입시 마케팅 연동 기능. userId가 없는거나 번호 조회시 해당 유저가 없었을 때
                 */
                //@ts-ignore
                if (!newUser?.userId || checkUser.data.length === 0) {
                  // 맥스 시스템즈 연동
                  const eventResponse = await apiServer.get(
                    `/marketing/maxx/signup/${signupInput.phoneNumber}`
                  );
                  if (eventResponse.status === 200) {
                    const eventUser =
                      eventResponse.data && eventResponse.data.length > 0
                        ? eventResponse.data[0]
                        : null;
                    if (
                      eventUser &&
                      eventUser.name.trim() === signupInput.name.trim()
                    ) {
                      await apiServer.put(
                        `/marketing/maxx/signup/${eventUser.id}`
                      );
                    }
                  }
                }
              } catch (e) {}
            }
            alert("회원가입에 성공하였습니다.");
          }
        }
      }
    } catch (e) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  //* 정보 관리 함수
  const handleSignupInput = (e: any) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
    setIsView(false);
  };

  // * 체크 관리 함수
  const handleCheck = (e: any) => {
    if (e.target.id === "all") {
      if (isCheck.filter((data: boolean) => data === true).length === 5) {
        setIsCheck(isCheck.map(() => false));
      } else {
        setIsCheck(isCheck.map(() => true));
      }
    } else {
      let newCheck = [...isCheck];
      newCheck[Number(e.target.id)] = !isCheck[Number(e.target.id)];
      setIsCheck(newCheck);
    }
  };

  // * 알뜰폰 보기
  const handelIsView = () => {
    setIsView(() => !isView);
  };

  // *이미 가입된 회원 모달 오픈 함수
  const handleModalOpen = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Body>
        {isAuthCode.length === 0 && !isAuth.isAuthOk ? (
          <>
            <Contents>
              <Title>투달유에스 회원가입</Title>
              <LoginSubText>
                투달유에스 회원가입만해도 <br />
                <LoginSubTextBold>
                  투자의 달인, 투달유에스, 뉴스스탁 서비스까지 한 번에
                </LoginSubTextBold>
                &nbsp; 이용하실 수 있습니다.
              </LoginSubText>
              <LoginInputTitle>이름</LoginInputTitle>
              <LoginInput
                name="name"
                placeholder="실명을 입력해주세요."
                onChange={handleSignupInput}
              />
              <LoginSubText>
                입력하신 정보는 외부에 노출되지 않도록 안전하게 관리됩니다.
              </LoginSubText>
              <LoginInputTitle>생년월일</LoginInputTitle>
              <SignupBirthWrapper>
                <SignupBirthInput
                  name="birth"
                  maxLength={6}
                  placeholder="생년월일 6자리"
                  onChange={handleSignupInput}
                />
                <SignupBirthDash></SignupBirthDash>
                <SignupBirthInput
                  name="gender"
                  maxLength={1}
                  style={{ maxWidth: "63px" }}
                  onChange={handleSignupInput}
                />
                {new Array(6).fill(6).map((__: any, index: any) => (
                  <SignupBirthCircle key={index} />
                ))}
              </SignupBirthWrapper>
              <LoginInputTitle>휴대폰번호</LoginInputTitle>
              <LoginInput
                maxLength={11}
                name="phoneNumber"
                placeholder="휴대폰 번호 11자리"
                onChange={handleSignupInput}
              />
              <SignupPhoneBtnWrapper>
                {phoneArr.map((data: any, index: any) => (
                  <SignupPhoneBtn
                    key={index}
                    name={data.name}
                    value={data.value}
                    onClick={handleSignupInput}
                    isActive={signupInput.telecomCode === data.value}
                  >
                    {data.text}
                  </SignupPhoneBtn>
                ))}
                <SignupPhoneAddWrapper>
                  <SignupPhoneBtn
                    onClick={handelIsView}
                    isActive={isFrugalPhone(signupInput.telecomCode)}
                  >
                    {isPhone(signupInput.telecomCode)}
                    <SignupBtnArrow src={"/assets/images/downArrow02.png"} />
                  </SignupPhoneBtn>
                  {isView && (
                    <SignupPhonePositionWrapper>
                      {phoneArr2.map((data: any, index: any) => (
                        <SignupPhonePositionBtn
                          key={index}
                          name={data.name}
                          value={data.value}
                          onClick={handleSignupInput}
                          isActive={signupInput.telecomCode === data.value}
                        >
                          {data.text}
                        </SignupPhonePositionBtn>
                      ))}
                    </SignupPhonePositionWrapper>
                  )}
                </SignupPhoneAddWrapper>
              </SignupPhoneBtnWrapper>
              <SignupCheckBody>
                <TitleBtn onClick={handleCheck} id="all">
                  <Title id="all">
                    <CheckImg
                      src={
                        isCheck.filter((data: boolean) => data === true)
                          .length === 5
                          ? "/assets/images/checkColor.png"
                          : "/assets/images/checkGray.png"
                      }
                      id="all"
                    />
                    모든 서비스 약관에 동의합니다.
                  </Title>
                </TitleBtn>
                <SignupCheckLine />
                {signupArr.map((data: any, index: any) => (
                  <SignupCheckWrapper key={index}>
                    <CheckImg
                      id={index}
                      src={
                        isCheck[index]
                          ? "/assets/images/checkColor.png"
                          : "/assets/images/checkGray.png"
                      }
                    />
                    <SignupCheckText onClick={handleCheck} id={index}>
                      {data.text}
                    </SignupCheckText>
                    <SingupCheckDetail
                      onClick={() => window.open(data.link, "_blank")}
                    >
                      내용보기
                    </SingupCheckDetail>
                  </SignupCheckWrapper>
                ))}
              </SignupCheckBody>
              <SignupARSText>
                아래 ARS인증 버튼을 눌러 회원가입을 완료해주세요!
              </SignupARSText>
              <SignupCheckBtn disabled={!isAuth.isBtn} onClick={handlAuthArs}>
                ARS 인증받기
              </SignupCheckBtn>
            </Contents>
          </>
        ) : isAuthCode.length !== 0 && !isAuth.isAuthOk ? (
          <>
            <Contents>
              <SignupArsBody>
                <SignupArsWrapper>
                  <SignupArsNum>{isAuthCode[0]}</SignupArsNum>
                  <SignupArsNum>{isAuthCode[1]}</SignupArsNum>
                  <SignupArsNum>{isAuthCode[2]}</SignupArsNum>
                  <SignupArsNum>{isAuthCode[3]}</SignupArsNum>
                </SignupArsWrapper>
                <SignupArsText>
                  수신되는 ARS 전화를 받은 후, <br />
                  안내 음성에 따라 위의 <br />
                  인증번호 4자리를 입력해주세요
                </SignupArsText>
                <SignupSubText>
                  <SignupImg src={"/assets/images/alt.png"} /> 착신전환 기능
                  또는 수신차단 앱 사용시ARS인증이 불가합니다.
                </SignupSubText>
              </SignupArsBody>
            </Contents>
          </>
        ) : (
          <>
            <SignupSuccessBody>
              <SignupSuccessWrapper>
                <SignupSuccessImg src={"/assets/images/welcome.svg"} />
                <SignupSuccessText>
                  투달유에스 회원가입에 성공하였습니다.
                </SignupSuccessText>
                <SignupSuccessSubText>
                  투달유에스 로그인 한번으로
                  <br />
                  투자의달인, 투달유에스, 뉴스스탁 서비스를 함께 이용하실 수
                  있습니다.
                </SignupSuccessSubText>
                <SignupSuccessBtn
                  onClick={() => {
                    navigate.push("/");
                  }}
                >
                  홈으로 가기
                </SignupSuccessBtn>
              </SignupSuccessWrapper>
            </SignupSuccessBody>
          </>
        )}
      </Body>
      <Modal
        open={modalOpen}
        onClose={handleModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          top: "30%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <SignupModalWrapper>
          <SignupModalTitle>
            이미 가입된 회원입니다. <br /> 바로 로그인하시겠습니까?
          </SignupModalTitle>
          <SignupModalBtnWrapper>
            <SignupModalBtnCancle onClick={handleModalOpen}>
              취소
            </SignupModalBtnCancle>
            <SignupModalBtnOk
              onClick={() => {
                navigate.push("/login");
              }}
            >
              확인
            </SignupModalBtnOk>
          </SignupModalBtnWrapper>
        </SignupModalWrapper>
      </Modal>
    </>
  );
};

export default SignupPage;

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout title="투달유에스 | 회원가입">{page}</HeaderLayout>;
};

const SignupBirthWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const SignupBirthInput = styled.input`
  @media (max-width: 600px) {
    margin-top: 5px;
  }
  width: 100%;
  max-width: 250px;
  height: 67px;
  min-height: 67px;
  padding-left: 20px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  outline: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    font-size: 15px;
    color: #a9a9a9;
  }
  :focus {
    border: 2px solid black;
  }
`;

const SignupBirthDash = styled.div`
  width: 20px;
  height: 4px;
  background-color: black;
  margin: 0px 7px;
`;

const SignupBirthCircle = styled.div`
  @media (max-width: 600px) {
    margin-top: 5px;
  }
  max-width: 15px;
  width: 100%;
  height: 15px;
  /* height: 100%; */
  border-radius: 50%;
  background-color: black;
  margin-left: 15px;
`;

const SignupPhoneBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  height: 46px;
  margin-bottom: 80px;
`;

const SignupPhoneBtn = styled.button`
  @media (max-width: 600px) {
    font-size: 11px;
  }
  background-color: ${(props: SignupStyle) =>
    props.isActive ? "#FFEBEF" : "#f7f7f7"};
  border: ${(props: SignupStyle) =>
    props.isActive ? "1px solid #FF3838" : "none"};
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 121px;
  padding: 15px 0px;
  margin-right: 16px;
  :hover {
    background-color: #ffebef;
  }
`;

const SignupBtnArrow = styled.img`
  @media (max-width: 600px) {
    width: 11px;
  }
  margin-left: 5px;
  width: 14px;
`;

const SignupPhoneAddWrapper = styled.div`
  width: 100%;
  max-width: 121px;
`;

const SignupPhonePositionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 121px;
  padding: 5px;
  background-color: #f7f7f7;
  margin-top: 5px;
`;

const SignupPhonePositionBtn = styled.button`
  @media (max-width: 600px) {
    font-size: 11px;
  }
  background-color: ${(props: SignupStyle) =>
    props.isActive ? "#FFEBEF" : "#f7f7f7"};
  border: ${(props: SignupStyle) =>
    props.isActive ? "1px solid #FF3838" : "none"};
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 121px;
  padding: 15px 0px;
  :hover {
    background-color: #ffebef;
  }
`;

const TitleBtn = styled.div`
  cursor: pointer;
`;

const CheckImg = styled.img`
  width: 20px;
  margin-right: 12px;
`;

const SignupCheckBody = styled.div`
  @media (max-width: 600px) {
    padding: 20px;
  }
  border: 1px solid #e9e9e9;
  padding: 30px;
  border-radius: 10px;
`;

const SignupCheckLine = styled.div`
  border-top: 1px solid #e9e9e9;
  width: 100%;
  margin-top: 30px;
`;

const SignupCheckWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  align-items: center;
  margin-top: 27px;
`;

const SignupCheckText = styled.div`
  @media (max-width: 600px) {
    font-size: 12px;
    flex-wrap: wrap;
    width: 100%;
  }
  font-size: 14px;
  color: #7f7f7f;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SignupCheckBtn = styled.button`
  width: 100%;
  padding: 20px 0px;
  cursor: pointer;
  background-color: #ff3838;
  color: white;
  border-radius: 5px;
  margin-top: 15px;
  :disabled {
    background-color: #f7f7f7;
    color: #4b4b4b;
  }
`;

const SingupCheckDetail = styled.button`
  @media (max-width: 600px) {
    font-size: 11px;
    padding: 5px 12.5px;
  }
  width: 100px;
  font-size: 12px;
  margin-left: auto;
  padding: 5px 14.5px;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  cursor: pointer;
`;

const SignupARSText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const SignupArsBody = styled.div`
  @media (max-width: 680px) {
    padding-top: 50px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-bottom: 100px;
  align-items: center;
`;

const SignupArsWrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const SignupArsNum = styled.div`
  background-color: #f7f7f7;
  width: 74px;
  height: 80px;
  display: flex;
  margin-right: 5px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  border-radius: 10px;
`;

const SignupArsText = styled.h3`
  @media (max-width: 680px) {
    font-size: 16px;
  }
  text-align: center;
  line-height: 30px;
`;

const SignupSubText = styled.div`
  @media (max-width: 680px) {
    font-size: 10px;
  }
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const SignupImg = styled.img`
  margin-right: 12px;
`;

const SignupSuccessBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SignupSuccessWrapper = styled.div`
  @media (max-width: 680px) {
    padding-top: 50px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const SignupSuccessImg = styled.img`
  @media (max-width: 680px) {
    width: 250px;
  }
  width: 300px;
`;

const SignupSuccessText = styled.div`
  @media (max-width: 680px) {
    font-size: 18px;
  }
  font-weight: 700;
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const SignupSuccessSubText = styled.div`
  @media (max-width: 680px) {
    font-size: 12px;
  }
  text-align: center;
  font-size: 18px;
  margin-bottom: 80px;
`;

const SignupSuccessBtn = styled.button`
  width: 256px;
  height: 58px;
  font-size: 15px;
  color: white;
  background-color: #4b4b4b;
  font-weight: 700;
  border-radius: 5px;
`;

const SignupModalWrapper = styled.div`
  width: 300px;
  height: 177px;
  padding: 40px 30px;
  background-color: white;
  border-radius: 10px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignupModalTitle = styled.div`
  font-size: 15px;
  text-align: center;
  font-weight: 700;
`;

const SignupModalBtnWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const SignupModalBtnOk = styled.button`
  width: 100%;
  max-width: 140px;
  font-weight: 700;
  height: 36px;
  background-color: #ff3838;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const SignupModalBtnCancle = styled.button`
  width: 100%;
  height: 36px;
  margin-right: 10px;
  border-radius: 10px;
  max-width: 140px;
  cursor: pointer;
  font-weight: 700;
  background-color: #e9e9e9;
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

const LoginSubText = styled.div`
  font-size: 12px;
  padding-top: 8px;
`;
const LoginSubTextBold = styled.span`
  font-size: 12px;
  padding-top: 8px;
  font-weight: 700;
`;

const LoginInputTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 67px;
  min-height: 67px;
  padding-left: 20px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  outline: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    font-size: 15px;
    color: #a9a9a9;
  }
  :focus {
    border: 2px solid black;
  }
`;
