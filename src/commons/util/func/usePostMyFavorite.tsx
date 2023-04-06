import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setMyFavorites } from "../../../redux/userInfo";
import { cmsServer, CMS_TOKEN } from "../../axios/axios";
import { getCookie } from "../cookie/cookie";
import { decrypt } from "./hash";

const userId = decrypt(getCookie("tudalUser"));
const usePostMyFavorite = () => {
  const dispatch = useDispatch();
  const { myFavorites } = useSelector((state: RootState) => state.userInfo);
  const PostMyFavorites = async (symbol: string, price: number) => {
    let newData = {
      userId,
      symbol,
      price,
    };
    if (userId) {
      try {
        const { data, status } = await cmsServer.post(
          `tudalus-favorites?token=${CMS_TOKEN}`,
          newData
        );
        if (status === 200) {
          if (data === "관심종목은 최대 20개까지만 추가할 수 있습니다.") {
            alert(data);
            return;
          }
        }
        try {
          const { data, status } = await cmsServer.get(
            `tudalus-favorites?userId=${userId}&token=${CMS_TOKEN}`
          );
          if (status === 200 && data) {
            dispatch(setMyFavorites(data));
          }
        } catch (e) {}
      } catch (e) {}
    } else {
      alert("로그인 후 이용 가능합니다.");
    }
  };

  return { PostMyFavorites, myFavorites };
};

export default usePostMyFavorite;
