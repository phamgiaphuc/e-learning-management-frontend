import AccountSettingSection from "@/sections/profile/account-setting-section";
import UserInformationSection from "@/sections/profile/user-information-section";
import { Typography, Tabs, Tab, Divider, Stack } from "@mui/material";
import { useCallback, useState } from "react";

type TabKey = "user-info" | "account-setting";

const ProfilePage = () => {
  const [tab, setTab] = useState<TabKey>("user-info");
  const onTabChange = useCallback((value: TabKey) => {
    setTab(value);
  }, []);
  return (
    <Stack sx={{ padding: 4, gap: 1 }}>
      <Typography fontWeight={800} variant="h5" color="#032751">
        My Profile
      </Typography>
      <Tabs value={tab} onChange={(_, value) => onTabChange(value)}>
        <Tab value="user-info" label="User Information"></Tab>
        <Tab value="account-setting" label="Account Setting"></Tab>
      </Tabs>
      <Divider />
      {tab === "user-info" && <UserInformationSection />}
      {tab === "account-setting" && <AccountSettingSection />}
    </Stack>
  );
};

export default ProfilePage;
