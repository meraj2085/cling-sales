"use client";

import { useUserLoginMutation } from "@/redux/api/authApi";
import { Button } from "antd";

const Home = () => {
  const [userLogin, { isLoading: loading }] = useUserLoginMutation();

  return (
    <div>
      <h1>Home Page</h1>
      <Button type="dashed" danger>
        Dashed
      </Button>
    </div>
  );
};

export default Home;
