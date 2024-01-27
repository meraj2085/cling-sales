"use client";
import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserRegisterMutation } from "@/redux/api/usersApi";
import { loginSchema } from "@/schema/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const AddSalesPerson = () => {
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const res = await userRegister({ ...data }).unwrap();
      if (res) {
        message.success("Sales person added in successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex pt-[150px] justify-center">
      <div>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-800">
          <div className="mb-8 text-center">
            {/* <h1 className="my-3 text-4xl font-bold">Create</h1> */}
            <p className="text-lg text-gray-800">Add new sales person</p>
          </div>
          <Form
            submitHandler={onSubmit}
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
              </div>
            </div>
            <div className="space-y-2 mt-5">
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="px-8 py-3 font-semibold rounded bg-gray-800 text-gray-100"
                >
                  Add Sales Person
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddSalesPerson;
