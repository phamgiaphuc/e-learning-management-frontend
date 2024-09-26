import { Autocomplete, TextField } from "@mui/material";

const NameAutocomplete = () => {
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label="Movie" />}
      options={[
        {
          label: "The Shawshank Redemption",
          value: 1,
        },
        {
          label: "The Godfather",
          value: 2,
        },
      ]}
    />
  );
};

export default NameAutocomplete;
