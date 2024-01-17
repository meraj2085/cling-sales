"use client";
import { Button } from "antd";
import { useState } from "react";
import { Checkbox, Modal } from "antd";
import ADTable from "@/components/ui/ADTable";
import { useGetAllLeadsQuery } from "@/redux/api/leadsApi";
import Navbar from "./Navbar"
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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSend=()=>{
    handleSendWhatsApp(arr)
  }


  const { data, isLoading } = useGetAllLeadsQuery({ ...query });
  const meta = data?.meta;

  const columns = [
    {
      title: "Phone",
      dataIndex: "user_phone",
    },
    {
      title: "Area",
      dataIndex: "user_area",
      render: function (data) {
        return <h1>{data ? data : "N/A"}</h1>;
      },
    },
    {
      title: "City",
      dataIndex: "user_city",
    },
    {
      title: "State",
      dataIndex: "user_state",
    },

    // {
    //   title: "Country",
    //   dataIndex: "user_country",
    // },
    {
      title: "Requirement",
      dataIndex: "user_requirement",
      render: function (data) {
        if(data){
          let words = data.split(" ");
          let result = words.length > 2 ? words.slice(0, 2).join(" ") : data;
          // console.log(result+"...")
          result=result+"..."
          return<h1>{result}</h1>
        }
        else{
          return <h1>{data ? data : "N/A"}</h1>;
        }
        
      },
    },
    {
      title: "Date and time",
      dataIndex: "search_date_and_time",
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
    <>
    <Navbar/>
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
                showModal();
                // handleSendWhatsApp(arr);
              }}
              // onClick={showModal}
              disabled={arr.length === 0}
              type="primary"
              style={{ backgroundColor: "green" }}
            >
              Send WhatsApp
            </Button>
            
          </div>
        </div>
        <Modal
        open={open}
        title="WhatsApp Message"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={
            // handleOk
           handleSend
           }>
            Send message
          </Button>,
         
        ]}
      >
        <h1>Are you sure you want to submit?</h1>
      </Modal>

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
    </>
  );
};

export default Home;
