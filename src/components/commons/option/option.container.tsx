import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface IOptionProps {
  handleInputCharge: (e: any) => void;
  inputCharge: {
    check: boolean;
    money: number;
    method: string;
  };
}
const BasicSelect: React.FC<IOptionProps> = ({
  handleInputCharge,
  inputCharge,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
          name="method"
          value={inputCharge.method}
          onChange={handleInputCharge}
          sx={{
            backgroundColor: "white",
            outline: "none",
            fontSize: "15px",
            paddingLeft: "8px",
          }}
        >
          <MenuItem
            sx={{
              fontSize: "15px",
              fontFamily: "Noto Sans Kr",
            }}
            value="CARD"
          >
            신용카드
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
