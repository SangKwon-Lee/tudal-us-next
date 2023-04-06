import dayjs from "dayjs";
import Script from "next/script";
import { useEffect, useState } from "react";
import { apiServer, cmsServer, CMS_TOKEN } from "../../commons/axios/axios";
import { getCookie } from "../../commons/util/cookie/cookie";
import { decrypt } from "../../commons/util/func/hash";
import PaymentCashPresenter from "./paymentCash.Presenter";
const PaymentCashContainer = () => {
  const userId = decrypt(getCookie("tudalUser"));
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

  //* 상품 정보
  const [product, setProduct] = useState({
    period: 0,
    gold: 0,
    name: "",
  });

  // * 결제 전 잠깐 모달
  const [modalOpen, setModalOpen] = useState(false);

  //* 충전 정보
  const [money, setMoney] = useState("16500");
  const [isCheck, setIsCheck] = useState(false);

  //* 투달러스 구독 내역
  const [tudlaUsHistory, setTudlaUsHistory] = useState([
    {
      created_at: "",
      endDate: "",
      id: 0,
      startDate: "",
      subscription: false,
      type: "",
      updated_at: "",
      userId: 0,
    },
  ]);

  //* 유저 골드 및 회원 정보 불러오기
  const handleGetUserGold = async () => {
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
      } catch (e) {
        alert("회원정보가 없습니다.");
      }
    }
  };

  //* 유저의 구독 정보 불러오기
  const handelGetPremiumUser = async () => {
    try {
      //* 기존에 구독한 적이 있는지
      const { data, status } = await cmsServer.get(
        `/tudalus-premium-users?userId=${userId}&token=${CMS_TOKEN}`
      );
      if (status === 200 && data[0]) {
        setTudlaUsHistory(data[0]);
      }
    } catch (e) {}
  };

  //* 상품 정보 불러오기
  const handleGetProduct = async () => {
    try {
      const { data, status } = await cmsServer.get(
        `/subscription-products?name=tudalUs&token=${CMS_TOKEN}`
      );
      if (status === 200 && data[0]) {
        setProduct(data[0]);
      }
    } catch (e) {}
  };

  //* 유저의 구독 정보 업데이트
  // const handleUserSubscription = async () => {
  //   const createData = {
  //     userId,
  //     startDate: dayjs().add(9, "hour"),
  //     endDate: dayjs().add(30, "day").add(9, "hour"),
  //     type: "gold",
  //     subscription: true,
  //   };
  //   try {
  //     const { status } = await cmsServer.post(
  //       `/tudalus-premium-users?token=${CMS_TOKEN}`,
  //       createData
  //     );
  //     if (status === 200) {
  //       alert("결제가 완료되었습니다.");
  //       //* maxx카드 연동
  //       try {
  //         const { status } = await apiServer.put(
  //           `/marketing/tudalus/maxx/${userId}/isSubs`
  //         );
  //         if (status === 200) {
  //           window.location.replace("https://us.tudal.co.kr");
  //         }
  //       } catch (e) {}
  //     }
  //   } catch (e) {
  //     alert("오류가 생겼습니다.");
  //   }
  // };

  //*이노페이 결제 결과 (결제 함수 2번 째)
  const innopay_result = async (data: any) => {
    if (data.data.message === "close") {
      window.location.href = "https://us.tudal.co.kr";
      return;
    } else if (data.data.message !== "close") {
      window.location.href = "https://us.tudal.co.kr";
      return;
      // var result = JSON.parse(data.data);
      //* 아래 데이터는 필요할 경우 사용하세요
      // var mid = data.data.MID; // 가맹점 MID
      // var tid = data.data.TID; // 거래고유번호
      // var amt = data.data.Amt; // 금액
      // var moid = data.data.MOID; // 주문번호
      // var authdate = data.data.AuthDate; // 승인일자
      // var authcode = data.data.AuthCode; // 승인번호
      // var resultcode = data.data.ResultCode; // 결과코드(PG)
      // var resultmsg = data.data.ResultMsg; // 결과메세지(PG)
      // var errorcode = data.data.ErrorCode; // 에러코드(상위기관)
      // var errormsg = data.data.ErrorMsg; // 에러메세지(상위기관)
      // var EPayCl = data.data.EPayCl;
      // if (result.ResultCode === "3001") {
      //   postPayment(result);
      // } else {
      //   alert("결제 오류가 발생했습니다.");
      //   window.removeEventListener("message", innopay_result);
      //   window.location.href = "https://us.tudal.co.kr";
      // }
    }
  };

  //* 이노페이 결제 (결제 함수 1번 째)
  const handleInnoPay = async () => {
    const code = `${dayjs().format("YYYYMMDDHHmmss")}`;
    try {
      //@ts-ignore
      await innopay.goPay({
        // 필수 파라미터
        PayMethod: "CSMS", // 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)
        MID: "pgsbcn111m", // 가맹점 MID
        MerchantKey:
          "GzV1sy9fFQp1FTc+MHWmi9Wpr/8mcgKEeSEn4Zg6pHhUZEnFY0EEgrupAPuOseGP4Dcg2nYM8Yj7SDzK4HOlTg==", // 가맹점 라이센스키
        GoodsName: "TudalUS", // 상품명
        Amt: money, // 결제금액(과세)
        BuyerName: userData.name, // 고객명
        BuyerTel: userData.phoneNumber, // 고객전화번호
        BuyerEmail: "@naver.com", // 고객이메일
        ResultYN: "N", // 결제결과창 출력유뮤
        Moid: code + String(userId), // 가맹점에서 생성한 주문번호 셋팅
        Currency: "", // 통화코드가 원화가 아닌 경우만 사용(KRW/USD)
      });
    } catch (e) {}
    //* 결제 결과가 아래로 전달 (InnoPayResult 함수 실행)
    window.addEventListener("message", innopay_result);
  };

  // ! 지금은 사용하지 않는 코드입니다. 무통장입금 기능을 사용하지 않습니다.
  // * 다음 스텝 및 결제 정보 저장
  // const handleSavePaymentInfo = async () => {
  //   const code = `${dayjs().format("YYYYMMDDHHmmss")}`;
  //   const expirationDate = `${dayjs()
  //     .add(3, "day")
  //     .set("hour", 0)
  //     .set("minute", 0)
  //     .set("second", 0)
  //     .format("YYYYMMDDHHmmss")}`;
  //   try {
  //     const { status } = await apiServer.post(`/golds/web/depositInfo`, {
  //       userId,
  //       userName:
  //         userData?.name +
  //         userData?.phoneNumber.slice(
  //           userData?.phoneNumber.length - 4,
  //           userData?.phoneNumber.length
  //         ),
  //       category: "골드충전(tudalus)",
  //       chargeCode: code,
  //       gold: 150,
  //       bonusGold: 15,
  //       receiptType: reciptsCategory,
  //       receiptNumber: inputCharge.number,
  //       depositAmount: inputCharge.money,
  //       isExpired: 0,
  //       expirationDate,
  //       isCharged: 0,
  //     });
  //     if (status === 200) {
  //       setStep(1);
  //       window.scrollTo(0, 0);
  //     }
  //   } catch (e) {
  //     alert("에러가 발생했습니다. 처음부터 다시 시도해주세요.");
  //   }
  // };

  // * 결제 동의 체크
  const handleIsCheck = () => {
    setIsCheck(() => !isCheck);
  };

  // *결제 전 잠깐 모달 오픈 함수
  const handleModalOpen = () => {
    setModalOpen(() => !modalOpen);
  };

  useEffect(() => {
    if (userId) {
      handleGetProduct();
      handelGetPremiumUser();
      handleGetUserGold();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <Script
        type="text/javascript"
        src="https://pg.innopay.co.kr/ipay/js/jquery-2.1.4.min.js"
      ></Script>
      <Script
        type="text/javascript"
        src="https://pg.innopay.co.kr/ipay/js/innopay-2.0_euc-kr.js"
        charSet="utf-8"
      ></Script>
      <PaymentCashPresenter
        money={money}
        isCheck={isCheck}
        product={product}
        modalOpen={modalOpen}
        handleIsCheck={handleIsCheck}
        handleInnoPay={handleInnoPay}
        tudlaUsHistory={tudlaUsHistory}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
};

export default PaymentCashContainer;
