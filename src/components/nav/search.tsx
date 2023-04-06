import { useRouter } from "next/router";
import styled from "@emotion/styled";
import theme from "../../commons/theme";
interface Props {
  isSearch: boolean;
  handleSearch?: any;
  handleSearchClick?: any;
  onEnterLogin?: any;
}
export default function SearchNav(props: Props) {
  const { isSearch, handleSearch, handleSearchClick, onEnterLogin } = props;
  const router = useRouter();
  return (
    <Wrapper>
      <SearchWrapper
        onClick={() => {
          if (!router.pathname.includes("usa-quotes")) {
            router.push(`/usa-quotes`);
          }
        }}
      >
        <SearchInput
          disabled={isSearch}
          onChange={handleSearch}
          onKeyPress={onEnterLogin}
          placeholder="궁금한 주식이 있나요?"
          style={{ cursor: isSearch ? "pointer" : "text" }}
        />
        <SearchIcon
          alt=""
          src="/assets/images/searchIcon.svg"
          onClick={handleSearchClick}
        />
      </SearchWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  /* padding: ${theme.metrics.m4} ${theme.metrics.m5} 0px ${theme.metrics
    .m5}; */
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px ${theme.metrics.m4};
  align-items: center;
  background-color: ${theme.color.whiteGray};
  cursor: pointer;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  width: 80%;
  outline: none;
  border: none;
  cursor: pointer;
  ::placeholder {
    color: ${theme.color.gray};
    ${theme.fonts.s14_w400};
  }
  padding: ${theme.metrics.m3} 0;
  background-color: ${theme.color.whiteGray};
`;

const SearchIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
