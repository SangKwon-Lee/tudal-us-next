import { useDispatch, useSelector } from "react-redux";
import { setMyFavorites } from "../../../redux/userInfo";
import { RootState } from "../../../store";
import { cmsServer, CMS_TOKEN } from "../../axios/axios";

const useGetMyFavorite = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { userId } = userInfo;
  const dispatch = useDispatch();
  //* 나의 관심종목 불러오기
  const getMyFavorites = async () => {
    if (userId) {
      try {
        const { data, status } = await cmsServer.get(
          `tudalus-favorites?userId=${userId}&token=${CMS_TOKEN}`
        );
        if (status === 200 && data) {
          dispatch(setMyFavorites(data));
        }
      } catch (e) {}
    }
  };

  return {
    getMyFavorites,
  };
};

export default useGetMyFavorite;
