import dayjs from "dayjs";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { apiServer, cmsServer, CMS_TOKEN } from "../../src/commons/axios/axios";
import { getCookie } from "../../src/commons/util/cookie/cookie";
import { decrypt } from "../../src/commons/util/func/hash";
import PaymentCard from "../../src/components/card/payment";
import HeaderLayout from "../../src/components/layout/header";
import toast from "react-hot-toast";
export const getServerSideProps: GetServerSideProps = async (context) => {
  let userData = {
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
  };
  let userGold = {
    bonusGold: 0,
    created_at: "",
    created_by: null,
    gold: 0,
    id: 0,
    updated_at: "",
    updated_by: null,
    userId: 0,
  };
  const userId = decrypt(context.req.cookies?.tudalUser);
  try {
    const { data, status: goldStatus } = await apiServer.get(
      `/golds/${userId}`,
      {
        headers: {
          pragma: "no-cache",
        },
      }
    );
    const { data: user, status } = await apiServer.get(`/user/${userId}`, {
      headers: {
        pragma: "no-cache",
      },
    });
    if (status === 200 && user[0]) {
      userData = user[0];
    }
    if (goldStatus === 200 && data) {
      if (data.msg === "골드 내역이 없는 사용자 입니다.") {
        userGold = data;
      } else {
        userGold = data[0];
      }
    }
  } catch (e) {}

  return {
    props: {
      userData,
      userGold,
    },
  };
};

interface Props {
  userData: {
    birthday: "";
    ci: "";
    createdAt: "";
    deletedAt: null;
    di: "";
    gender: "";
    isDeleted: "";
    name: "";
    nickname: "";
    phoneNumber: "";
    role: "";
    telecomCode: "";
    updatedAt: "";
    userId: 0;
  };
  userGold: {
    bonusGold: 0;
    created_at: "";
    created_by: null;
    gold: 0;
    id: 0;
    updated_at: "";
    updated_by: null;
    userId: 0;
  };
}

export default function PaymentPage(props: Props) {
  const { userData, userGold } = props;
  const userId = decrypt(getCookie("tudalUser"));
  const router = useRouter();

  //* 상품 정보
  const [product, setProduct] = useState([
    {
      period: 0,
      gold: 0,
      name: "",
    },
  ]);

  //* 골드 계산
  const [subtractGold, setSubtractGold] = useState({
    remainGold: 0,
    remainBonusGold: 0,
    remainUserGold: 0,
    remainUserBonusGold: 0,
  });

  //* 골드가 부족한지
  const [canBuy, setCanBuy] = useState(true);

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
  const handleGetProduct = useCallback(async () => {
    try {
      const { data, status } = await cmsServer.get(
        `/subscription-products?name=tudalUS&token=${CMS_TOKEN}`
      );
      if (status === 200 && data[0]) {
        setProduct(data);
        //* 상품 가격의 10%만 보너스 골드로 차감
        const Subtractgold = data[0].gold * 0.9;
        const SubtractBonus = data[0].gold * 0.1;
        const diffBonusGold =
          userGold.bonusGold - SubtractBonus < 0
            ? Math.abs(userGold.bonusGold - SubtractBonus)
            : 0;
        //* 차감되는 골드
        const remainGold = diffBonusGold + Subtractgold;
        //* 차감되는 보너스 골드
        const remainBonusGold =
          userGold.bonusGold - SubtractBonus > 0
            ? SubtractBonus
            : userGold.bonusGold;
        setSubtractGold({
          ...subtractGold,
          remainGold,
          remainBonusGold,
          remainUserGold: userGold.gold - remainGold,
          remainUserBonusGold: userGold.bonusGold - remainBonusGold,
        });
        if (userGold.gold < data[0].gold * 0.9) {
          setCanBuy(false);
          // router.push("/paymentcash");
        } else {
          setCanBuy(true);
        }

        if (
          userGold.gold > data[0].gold * 0.9 &&
          userGold.bonusGold > userGold.gold - remainGold
        ) {
          setCanBuy(false);
          // router.push("/paymentcash");
        } else {
          setCanBuy(true);
        }
      }
    } catch (e) {}
  }, [subtractGold, userGold.bonusGold, userGold.gold]);

  const handleUserGoldSubtract = async () => {
    //* 골드가 부족할 경우
    if (!canBuy) {
      toast.error("골드가 부족합니다.");
      return;
    }
    try {
      const code = `${moment().format("YYYYMMDDHHmmss")}`;
      const { status } = await apiServer.post(`golds/${userId}/subtract`, {
        amount: subtractGold.remainGold,
        bonusAmount: subtractGold.remainBonusGold,
        category: "투달유에스", // '골드충전'
        code,
        type: "subtract",
        isExpired: false,
        datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
        payment: "",
      });
      if (status === 200) {
        handleUserSubscription();
      }
    } catch (e) {
      toast.error("오류가 발생했습니다.");
    }
  };

  //* 유저의 구독 정보 업데이트
  const handleUserSubscription = async () => {
    const createData = {
      userId,
      startDate: dayjs().add(9, "hour"),
      endDate: dayjs().add(30, "day").add(9, "hour"),
      type: "gold",
      subscription: true,
    };
    try {
      const { status } = await cmsServer.post(
        `/tudalus-premium-users?token=${CMS_TOKEN}`,
        createData
      );
      if (status === 200) {
        toast.success("결제가 완료됐습니다.");
        //* maxx카드 연동
        try {
          const { status } = await apiServer.put(
            `/marketing/tudalus/maxx/${userId}/isSubs`
          );
          if (status === 200) {
            router.push("/");
          }
        } catch (e) {}
      }
    } catch (e) {
      toast.error("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (userId) {
      handelGetPremiumUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (userData.userId !== 0) {
      handleGetProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
      <PaymentCard
        canBuy={canBuy}
        product={product}
        userGold={userGold}
        subtractGold={subtractGold}
        tudlaUsHistory={tudlaUsHistory}
        handleUserGoldSubtract={handleUserGoldSubtract}
      />
    </>
  );
}

PaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout title="투달유에스 | 구독결제">{page}</HeaderLayout>;
};
