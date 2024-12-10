import { InputAdornment, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SearchIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onHandleKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (searchRef.current) {
          navigate(`/search?key=${searchRef.current.value}`);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <TextField
      inputRef={searchRef}
      onKeyDown={onHandleKey}
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
          borderWidth: 1,
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
