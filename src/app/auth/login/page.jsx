"use client";
import { message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/schema/loginSchema";
import Loading from "@/app/loading";

const LoginPage = () => {
  const [userLogin, { isLoading: loading }] = useUserLoginMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await userLogin({ ...data }).unwrap();
      message.success("User logged in successfully!");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err.message);
      message.error(err.message);
    }
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <Form
            submitHandler={onSubmit}
            defaultValues={defaultValues}
            resolver={yupResolver(loginSchema)}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Email address"
                  size="large"
                  label="Email address"
                />
              </div>
              <div>
                <FormInput
                  name="password"
                  type="password"
                  placeholder="********"
                  size="large"
                  label="Password"
                />
                <div className="flex justify-end mt-1">
                  <a
                    rel="noopener noreferrer"
                    href="/"
                    className="text-xs hover:underline text-gray-400 hover:text-gray-800"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-5">
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="px-8 py-3 font-semibold rounded bg-gray-800 text-gray-100"
                >
                  Basic
                </button>
              </div>
              <p className="px-6 text-sm text-center text-gray-400">
                Dont have an account yet?{" "}
                <button
                  type="submit"
                  className="hover:underline text-violet-400"
                >
                  Sign up
                </button>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
