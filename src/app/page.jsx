"use client";
import { Button } from "antd";
import { useState } from "react";
import { Checkbox } from "antd";
import ADTable from "@/components/ui/ADTable";
import { useGetAllLeadsQuery } from "@/redux/api/leadsApi";

const Home = () => {
  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  query["page"] = page;
  query["limit"] = limit;

  const onPaginationChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  const [arr, setArr] = useState([]);

  const onBoxChange = (value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((item) => item !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const handleSelectAll = () => {
    if (arr.length === data?.leads?.length) {
      setArr([]);
      return;
    }
    setArr(data?.leads?.map((item) => item._id));
  };

  const handleSendWhatsApp = (numbers) => {
    console.log("SendWhatsapp", numbers);
  };

  const { data, isLoading } = useGetAllLeadsQuery({ ...query });
  const meta = data?.meta;

  const columns = [
    {
      title: "Mobile",
      dataIndex: "user_phone",
    },
    {
      title: "City",
      dataIndex: "user_city",
    },
    {
      title: "State",
      dataIndex: "user_state",
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
      dataIndex: "_id",
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
            {arr.length === data?.length ? "Deselect All" : "Select All"}
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
          dataSource={data?.leads}
          pageSize={limit}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          showPagination={true}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default Home;
