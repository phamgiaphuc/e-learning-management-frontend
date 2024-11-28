import UserInformationSection from "@/sections/profile/user-information-section";
import { Typography, Tabs, Tab, Divider } from "@mui/material";
import { useCallback, useState } from "react";

type TabKey = "user-info" | "account-setting";

const ProfilePage = () => {
  const [tab, setTab] = useState<TabKey>("user-info");
  const onTabChange = useCallback((value: TabKey) => {
    setTab(value);
  }, []);
  return (
    <>
      <Typography fontWeight={800} fontSize={30} color="#032751" marginLeft={2}>
        My Profile
      </Typography>
      <Tabs
        value={tab}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(_, value) => onTabChange(value)}
      >
        <Tab value="user-info" label="User Information"></Tab>
        <Tab value="account-setting" label="Account Setting"></Tab>
      </Tabs>
      <Divider />
      {tab === "user-info" && <UserInformationSection />}
    </>
  );
};

export default ProfilePage;
