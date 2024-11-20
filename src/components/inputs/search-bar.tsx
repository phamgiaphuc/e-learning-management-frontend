import { InputAdornment, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search for courses..."
      sx={{
        width: "24rem",
        "& .MuiInputBase-root": {
          height: "2.7rem",
        },
        "& .MuiOutlinedInput-root": {
          fontWeight: 300,
          fontSize: 16,
          color: grey[900],
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main",
          borderWidth: "2px",
          borderRadius: "0.1rem",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="#1575E3" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
