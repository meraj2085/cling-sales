"use client";

import { useUserLoginMutation } from "@/redux/api/authApi";
import { Button } from "antd";

const Home = () => {
  const [userLogin, { isLoading: loading }] = useUserLoginMutation();
  const onSubmit = async () => {
    try {
      const res = await userLogin({
        office_email: "employee@dino.com",
        password: "Dino-123",
      }).unwrap();
      console.log(res);
      message.success("User logged in successfully!");
    } catch (err) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => onSubmit()} type="dashed" danger>
        Dashed
      </Button>
    </div>
  );
};

export default Home;
