import styled from "@emotion/styled";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getCookie } from "../../commons/util/cookie/cookie";
import { decrypt } from "../../commons/util/func/hash";
import { cmsServer, CMS_TOKEN } from "../../commons/axios/axios";
interface Props {
  isOpen: boolean;
  open: boolean;
  handleClose: () => void;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "280px",
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 4,
  paddingBottom: 0,
  border: "none",
  borderRadius: "16px",
  outline: "none",
};

export default function HomeBtnModal(props: Props) {
  const { handleClose, isOpen, open } = props;
  const userId = decrypt(getCookie("tudalUser"));

  // * 홈 화면 버튼 추가 클릭
  const handleGoPage = () => {
    window.open(
      "https://www.notion.so/innofin/8e639c3a2a6c4d929c499ddae1b4f75e",
      "_blank"
    );
    handleClose();
  };

  // * 홈 팝업 다시 보지 않기 클릭
  const handleNoPopup = async () => {
    try {
      let newData = {
        userId,
        isOpen: true,
      };
      const { status } = await cmsServer.post(
        `/tudalus-add-home-popups?token=${CMS_TOKEN}`,
        newData
      );
      if (status === 200) {
        handleClose();
      }
      handleClose();
    } catch (e) {}
  };
  return (
    <>
      {!isOpen && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
              </div>
              <HomeModalIcon
                alt="home"
                src={"/assets/images/homeaddModal.svg"}
              ></HomeModalIcon>
              <HomeModalWrapper>
                <HomeModalTitle>
                  투달유에스를
                  <br />
                  홈화면에 추가해보세요
                </HomeModalTitle>
                <HomeModalLine></HomeModalLine>
                <HomeModalText>
                  투달유에스를 홈화면에 추가하면
                  <br />
                  매일 추천종목을 놓치지 않고
                  <br />
                  확인 할 수 있어요
                </HomeModalText>
                <HomeBottomBtnWrapper>
                  <HomeBottomBtnLeft onClick={handleNoPopup}>
                    다시 보지 않기
                  </HomeBottomBtnLeft>
                  <HomeBottomBtnRight onClick={handleGoPage}>
                    홈 화면 추가
                  </HomeBottomBtnRight>
                </HomeBottomBtnWrapper>
              </HomeModalWrapper>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

const HomeModalIcon = styled.img`
  position: absolute;
  left: 37%;
  top: -36px;
`;

const HomeModalWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const HomeModalTitle = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: 700;
`;

const HomeModalLine = styled.div`
  width: 100%;
  border-top: 1px solid #f6f3f3;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const HomeModalText = styled.div`
  text-align: center;
  font-size: 12px;
  color: #707070;
  font-weight: normal;
`;

const HomeBottomBtnWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
`;

const HomeBottomBtnLeft = styled.button`
  width: 100%;
  padding: 16px 0px;
  background-color: #ff647c;
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-bottom-left-radius: 16px;
  cursor: pointer;
`;

const HomeBottomBtnRight = styled.button`
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  padding: 16px 0px;
  color: white;
  background-color: #ff1d40;
  border-bottom-right-radius: 16px;
  cursor: pointer;
`;
