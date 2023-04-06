import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import "react-modern-drawer/dist/index.css";
import { priceToString } from "../../../commons/util/func/priceToString";
import { deleteCookie } from "../../../commons/util/func/hash";
import { apiServer } from "../../../commons/axios/axios";
import { Cookies } from "react-cookie";

import {
  ServiceArr,
  ServiceArr2,
  ServiceArrType,
} from "../../../commons/util/options/Services";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../redux/userInfo";
import { RootState } from "../../../store";
import {
  DrawerBody,
  DrawerXWrapper,
  DrawerX,
  DrawerTitle,
  DrawerTitleBold,
  DrawerGoldTitleWrapper,
  DrawerGoldTitle,
  DrawerGoldIcon,
  DrawerGold,
  DrawerBtnWrapper,
  DrawerBottomText,
  DrawerSubsWrapper,
  DrawerSubsTitle,
  DrawerSubsTitleRed,
  DrawerSubsContentsWrapper,
  DrawerSubsContentsTitle,
  DrawerSubsContentsText,
  DrawerSubsBtn,
  DrawerServiceWrapper,
  DrawerServiceText,
  DrawerServiceIcon,
  DrawerServiceLine,
  DrawerSiteWrapper,
  DrawerSiteTextWrapper,
  DrawerSite,
  DrawerSiteIcon,
  DrawerSiteText,
  DrawerBackImg,
} from "./Drawer.style";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
interface DrawerProps {
  open: boolean;
  handleOpen: () => void;
}
const DrawerSSR = dynamic(
  import("react-modern-drawer").then((mod) => mod.default),
  { ssr: false }
); // disable ssr
const DrawerContainer: React.FC<DrawerProps> = ({ handleOpen, open }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId, userPremium } = useSelector(
    (state: RootState) => state.userInfo
  );

  const [userData, setUserData] = useState({
    birthday: "",
    ci: "",
    createdAt: "",
    deletedAt: null,
    di: "",
    gender: "",
    isDeleted: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    role: "",
    telecomCode: "",
    updatedAt: "",
    userId: 0,
  });

  const [userGold, setUserGold] = useState({
    bonusGold: 0,
    created_at: "",
    created_by: null,
    gold: 0,
    id: 0,
    updated_at: "",
    updated_by: null,
    userId: 0,
  });

  const [userLoading, setUserLoading] = useState(false);

  //* 유저 골드 및 회원 정보 불러오기
  const handleGetUserGold = useCallback(async () => {
    setUserLoading(true);
    if (userId) {
      try {
        const { data, status: goldStatus } = await apiServer.get(
          `/golds/${userId}`,
          {
            headers: {
              pragma: "no-cache",
            },
          }
        );
        const { data: userData, status } = await apiServer.get(
          `/user/${userId}`,
          {
            headers: {
              pragma: "no-cache",
            },
          }
        );
        if (status === 200 && userData[0]) {
          setUserData(userData[0]);
        }
        if (goldStatus === 200 && data) {
          if (data.msg === "골드 내역이 없는 사용자 입니다.") {
            setUserGold(data);
          } else {
            setUserGold(data[0]);
          }
        }
        setUserLoading(false);
      } catch (e) {
        deleteCookie("tudalUser");
        //@ts-ignore
        // var receiver = document.getElementById("receiver").contentWindow;
        // receiver.postMessage("logout", "https://tudal.co.kr");
        alert("회원정보가 없습니다.");
      }
    }
  }, [userId]);

  useEffect(() => {
    handleGetUserGold();
  }, [userId, handleGetUserGold]);

  // * 로그아웃
  const handleLogout = () => {
    handleOpen();
    const cookies = new Cookies();
    cookies.remove("tudalUser");
    dispatch(setLogout());
    alert("로그아웃 됐습니다");
    router.push("/");
  };

  return (
    <>
      <DrawerSSR
        open={open}
        direction="right"
        size={"80%"}
        zIndex={99999}
        overlayOpacity={0.4}
        style={{ maxWidth: "450px" }}
        onClose={handleOpen}
      >
        <DrawerBody>
          <DrawerXWrapper>
            <DrawerX
              src={"/assets/images/Xicon.svg"}
              onClick={handleOpen}
              alt="xicon"
            />
          </DrawerXWrapper>
          {!userLoading && (
            <>
              <DrawerTitle>
                <DrawerTitleBold>{userData.name}님,</DrawerTitleBold>
                환영합니다.
              </DrawerTitle>
              <DrawerGoldTitleWrapper>
                <DrawerGoldTitle>
                  <DrawerGoldIcon
                    src={"/assets/images/gold.svg"}
                    alt="DrawerGoldIcon"
                  />
                  총 보유 골드
                </DrawerGoldTitle>
                <DrawerGold>
                  {priceToString(userGold.gold + userGold.bonusGold)}골드
                </DrawerGold>
              </DrawerGoldTitleWrapper>
              <DrawerBtnWrapper>
                <DrawerBottomText onClick={() => router.push("/paymentcash")}>
                  <DrawerGoldIcon
                    src={"/assets/images/circle.svg"}
                    alt="card"
                  />
                  카드결제
                </DrawerBottomText>
                <DrawerBottomText onClick={() => router.push("/payment")}>
                  <DrawerGoldIcon src={"/assets/images/paper.svg"} alt="gold" />
                  골드결제
                </DrawerBottomText>
              </DrawerBtnWrapper>
              <DrawerSubsWrapper>
                {dayjs(userPremium.endDate).isAfter(dayjs().format()) ? (
                  <>
                    <DrawerSubsTitle>
                      투달유에스
                      <DrawerSubsTitleRed>
                        &nbsp;구독중&nbsp;
                      </DrawerSubsTitleRed>
                      입니다
                    </DrawerSubsTitle>
                  </>
                ) : (
                  <>
                    <DrawerSubsTitle>
                      투달유에스 구독회원이 아닙니다
                    </DrawerSubsTitle>
                  </>
                )}

                <DrawerSubsContentsWrapper>
                  <DrawerSubsContentsTitle>기간</DrawerSubsContentsTitle>
                  {dayjs(userPremium.endDate).isAfter(dayjs().format()) ? (
                    <DrawerSubsContentsText>
                      {dayjs(userPremium.startDate).format("YYYY.MM.DD")}~
                      {dayjs(userPremium.endDate).format("YYYY.MM.DD")}
                    </DrawerSubsContentsText>
                  ) : (
                    <DrawerSubsContentsText>-</DrawerSubsContentsText>
                  )}
                </DrawerSubsContentsWrapper>
                <DrawerSubsContentsWrapper>
                  <DrawerSubsContentsTitle>기간</DrawerSubsContentsTitle>
                  {dayjs(userPremium.endDate).isAfter(dayjs().format()) ? (
                    <DrawerSubsContentsText>
                      D-
                      {Math.floor(
                        dayjs(userPremium.endDate).diff(dayjs(), "day", true)
                      ) > 0
                        ? Math.floor(
                            dayjs(userPremium.endDate).diff(
                              dayjs(),
                              "day",
                              true
                            )
                          )
                        : 0}
                    </DrawerSubsContentsText>
                  ) : (
                    <DrawerSubsContentsText>-</DrawerSubsContentsText>
                  )}
                </DrawerSubsContentsWrapper>
                <DrawerSubsBtn onClick={() => router.push("/payment")}>
                  {dayjs(userPremium.endDate).isAfter(dayjs().format())
                    ? "구독 연장하기"
                    : "구독 하기"}
                </DrawerSubsBtn>
              </DrawerSubsWrapper>
              <DrawerSubsWrapper>
                {ServiceArr2.map((data: ServiceArrType, index: number) => (
                  <div key={index}>
                    <DrawerServiceWrapper
                      onClick={() => {
                        window.open(data.link, "_blank");
                      }}
                    >
                      <DrawerServiceText
                        onClick={() => {
                          window.open(data.link, "_blank");
                        }}
                      >
                        {data.text}
                      </DrawerServiceText>
                      <DrawerServiceIcon
                        alt="DrawerServiceIcon"
                        src={"/assets/images/rightArrow.svg"}
                        onClick={() => {
                          window.open(data.link, "_blank");
                        }}
                      />
                    </DrawerServiceWrapper>
                    {index === 0 && <DrawerServiceLine />}
                  </div>
                ))}
              </DrawerSubsWrapper>
              <DrawerSubsWrapper>
                {ServiceArr.map((data: ServiceArrType, index: number) => (
                  <div key={index}>
                    <DrawerServiceWrapper
                      onClick={() => {
                        window.open(data.link, "_blank");
                      }}
                    >
                      <DrawerServiceText
                        onClick={() => {
                          window.open(data.link, "_blank");
                        }}
                      >
                        {data.text}
                      </DrawerServiceText>
                      <DrawerServiceIcon
                        alt="DrawerServiceIcon"
                        src={"/assets/images/rightArrow.svg"}
                        onClick={() => {
                          window.open(data.link, "_blank");
                        }}
                      />
                    </DrawerServiceWrapper>
                    <DrawerServiceLine />
                  </div>
                ))}
                <DrawerServiceWrapper onClick={handleLogout}>
                  <DrawerServiceText onClick={handleLogout}>
                    로그아웃
                  </DrawerServiceText>
                  <DrawerServiceIcon
                    src={"/assets/images/rightArrow.svg"}
                    alt="arrow"
                    onClick={handleLogout}
                  />
                </DrawerServiceWrapper>
              </DrawerSubsWrapper>
            </>
          )}
          <DrawerSiteWrapper>
            <DrawerSiteTextWrapper
              onClick={() => {
                window.open("https://tudal.co.kr");
              }}
            >
              <DrawerSite>
                <DrawerSiteIcon
                  src={"/assets/images/tudalSite.svg"}
                  alt="DrawerSiteIcon"
                />
              </DrawerSite>
              <DrawerSiteText>투자의 달인</DrawerSiteText>
            </DrawerSiteTextWrapper>
            <DrawerSiteTextWrapper
              onClick={() => {
                window.open("https://contents.premium.naver.com/tudal/master");
              }}
            >
              <DrawerSite>
                <DrawerSiteIcon
                  src={"/assets/images/premium.png"}
                  alt="premium"
                />
              </DrawerSite>
              <DrawerSiteText>프리미엄 컨텐츠</DrawerSiteText>
            </DrawerSiteTextWrapper>
          </DrawerSiteWrapper>
        </DrawerBody>
        <DrawerBackImg></DrawerBackImg>
      </DrawerSSR>
    </>
  );
};

export default DrawerContainer;
