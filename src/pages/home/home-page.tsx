import { testAxios } from "@/apis/test/test.api";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    testAxios();
  }, []);

  return <div>Home page</div>;
};

export default HomePage;
