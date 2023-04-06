import styled from "@emotion/styled";
import { Button } from "@mui/material";
import theme from "../../commons/theme";

interface SortBtnProps {
  text?: any[];
  sort?: any;
  handleSortBtn?: (e: any) => void;
}

const SortBtnWrapper = styled.div`
  display: flex;
  margin: 16px 20px;
  overflow: auto;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
`;

const SortBtnNav: React.FC<SortBtnProps> = ({ text, sort, handleSortBtn }) => {
  return (
    <SortBtnWrapper>
      {text!.length > 0 &&
        text?.map((data) => (
          <Button
            sx={{
              backgroundColor: "white",
              marginRight: theme.metrics.m2,
              borderRadius: "18px",
              lineHeight: "100%",
              padding: `${theme.metrics.m2} ${theme.metrics.m4}`,
            }}
            key={data.value}
            style={{
              fontWeight: sort === data.name ? 700 : 700,
              border: sort === data.name ? " 1px solid #c9c6c6" : "none",
              color: sort === data.name ? "#2b2b2b" : "#c9c6c6",
            }}
            onClick={handleSortBtn}
            value={data.value}
            id={data.name}
          >
            {data.name}
          </Button>
        ))}
    </SortBtnWrapper>
  );
};
export default SortBtnNav;
