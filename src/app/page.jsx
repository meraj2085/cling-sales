"use client";
import { Button } from "antd";
import { useState } from "react";
import { Checkbox } from "antd";
import ADTable from "@/components/ui/ADTable";

const Home = () => {
  const [arr, setArr] = useState([]);

  const onBoxChange = (value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((item) => item !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const handleSelectAll = () => {
    if (arr.length === data.length) {
      setArr([]);
      return;
    }
    setArr(data.map((item) => item.id));
  };

  const handleSendWhatsApp = (numbers) => {
    console.log("SendWhatsapp", numbers);
  };

  console.log("On Change", arr);

  const data = [
    {
      id: 1,
      mobile: "1234567890",
      city: "Dhaka",
      state: "Dhaka",
      country: "Bangladesh",
      requirement: "Sample Requirement 1",
    },
    {
      id: 2,
      mobile: "9876543210",
      city: "Chittagong",
      state: "Chittagong",
      country: "Bangladesh",
      requirement: "Sample Requirement 2",
    },
    {
      id: 3,
      mobile: "5554443333",
      city: "Rajshahi",
      state: "Rajshahi",
      country: "Bangladesh",
      requirement: "Sample Requirement 3",
    },
    {
      id: 4,
      mobile: "9998887777",
      city: "Khulna",
      state: "Khulna",
      country: "Bangladesh",
      requirement: "Sample Requirement 4",
    },
    {
      id: 5,
      mobile: "1112223333",
      city: "Sylhet",
      state: "Sylhet",
      country: "Bangladesh",
      requirement: "Sample Requirement 5",
    },
    {
      id: 6,
      mobile: "4445556666",
      city: "Barisal",
      state: "Barisal",
      country: "Bangladesh",
      requirement: "Sample Requirement 6",
    },
    {
      id: 7,
      mobile: "7778889999",
      city: "Comilla",
      state: "Chittagong",
      country: "Bangladesh",
      requirement: "Sample Requirement 7",
    },
    {
      id: 8,
      mobile: "3332221111",
      city: "Dinajpur",
      state: "Rangpur",
      country: "Bangladesh",
      requirement: "Sample Requirement 8",
    },
    {
      id: 9,
      mobile: "6667778888",
      city: "Jessore",
      state: "Khulna",
      country: "Bangladesh",
      requirement: "Sample Requirement 9",
    },
    {
      id: 10,
      mobile: "1231231234",
      city: "Narayanganj",
      state: "Dhaka",
      country: "Bangladesh",
      requirement: "Sample Requirement 10",
    },
  ];

  const isLoading = false;

  const columns = [
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Requirement",
      dataIndex: "requirement",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data) {
        return (
          <Checkbox
            onChange={(e) => onBoxChange(e.target.value)}
            value={data}
            checked={arr.includes(data)}
          />
        );
      },
    },
  ];

  return (
    <div style={{ overflowX: "auto" }} className="flex justify-center my-10">
      <div className="bg-gray-200 min-w-[900px] p-4 rounded-md">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mb-5"
        >
          <Button onClick={() => handleSelectAll()} type="primary">
            {arr.length === data.length ? "Deselect All" : "Select All"}
          </Button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              onClick={() => {
                handleSendWhatsApp(arr);
              }}
              disabled={arr.length === 0}
              type="primary"
              style={{ backgroundColor: "green" }}
            >
              Send WhatsApp
            </Button>
          </div>
        </div>

        <ADTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          showSizeChanger={true}
          showPagination={true}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default Home;
