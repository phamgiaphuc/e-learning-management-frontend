import { InputAdornment, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search for courses..."
      sx={{
        display: "flex",
        fontFamily: "Poppins, sans-serif",
        lineHeight: "24px",
        width: "25rem",
        "& .MuiInputBase-root": {
          height: "2.7rem",
        },
        "& .MuiOutlinedInput-root": {
          fontWeight: "300",
          fontFamily: "Poppins, sans-serif",
          lineHeight: "24px",
          fontSize: "16px",
          color: grey[900],
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "secondary.main",
          borderWidth: "2px",
          borderRadius: "0.1rem",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="#1575E3" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
