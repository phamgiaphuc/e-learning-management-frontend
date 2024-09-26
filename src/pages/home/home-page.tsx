import NameAutocomplete from "@/components/autocomplete/name-autocomplete";
import ThemeModeButton from "@/components/buttons/theme-mode-button";
import TempDrawer from "@/components/drawer/temp-drawer";
import ThemeModeSwitch from "@/components/switches/theme-mode-switch";
import { Stack } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Stack
        sx={{
          maxWidth: "240px",
          margin: "16px",
        }}
        rowGap={2}
      >
        <ThemeModeSwitch />
        <NameAutocomplete />
        <TempDrawer />
      </Stack>
      <ThemeModeButton />
    </>
  );
};

export default HomePage;
