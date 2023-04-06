import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { memo } from "react";
import theme from "../../commons/theme";
interface IMainTitleProps {
  sort?: string;
  title?: string;
  isTheme?: boolean;
  subTitle?: string;
  isButton?: boolean;
  buttonText?: string;
  handleButtonClick?: any;
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 22px 28px 22px;
`;

const TitleTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  ${theme.fonts.s16_w700};
`;

const SubTitle = styled.span`
  margin-right: 6px;
  ${theme.fonts.s16_w400};
  font-weight: 400;
`;

const SortTitle = styled.span`
  ${theme.fonts.s14_w700};
`;

// const Button = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 700;
//   border-radius: 30px;
//   padding: 4px 8px;
//   background-color: white;
// `;

const CircleIcon = styled.img`
  margin-left: -3px;
  width: 22px;
  height: 22px;
`;

const MainTitle: React.FC<IMainTitleProps> = ({
  sort,
  title,
  isTheme,
  subTitle,
  isButton,
  buttonText,
  handleButtonClick,
}) => {
  return (
    <TitleWrapper>
      <TitleTextWrapper>
        <Title>
          {title}
          <SortTitle
            css={css`
              ${isTheme ? theme.fonts.s20_w400 : theme.fonts.s16_w400}
            `}
          >
            {sort}
          </SortTitle>
          <SubTitle
            css={css`
              ${isTheme ? theme.fonts.s20_w400 : theme.fonts.s16_w400}
            `}
          >
            {subTitle}
          </SubTitle>
        </Title>
      </TitleTextWrapper>
      {isButton && (
        <Button
          onClick={handleButtonClick}
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 700;
            border-radius: 30px;
            padding: 4px 8px;
            background-color: white;
            color: black;
          `}
        >
          {buttonText !== "더 보기" && (
            <CircleIcon src={"/assets/images/wonCircle.svg"} alt="won" />
          )}
          {buttonText}
        </Button>
      )}
    </TitleWrapper>
  );
};

export default memo(MainTitle);
