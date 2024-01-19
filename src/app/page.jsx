"use client";
import { Button, message } from "antd";
import { useState } from "react";
import { Checkbox } from "antd";
import ADTable from "@/components/ui/ADTable";
import {
  useGetAllLeadsQuery,
  useUpdateLeadMutation,
} from "@/redux/api/leadsApi";
import Navbar from "./Navbar";
import CSModal from "@/components/ui/Modal";
import { Input } from "antd";
import Loading from "./loading";
const { TextArea } = Input;

const Home = () => {
  const [updateLead, { isLoading: isUpdateLoading }] = useUpdateLeadMutation();
  const [id, setId] = useState("");
  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  query["page"] = page;
  query["limit"] = limit;

  const onPaginationChange = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [arr, setArr] = useState([]);

  const onBoxChange = (value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((item) => item !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const [textAreaData, setTextAreaData] = useState("");

  const handleSelectAll = () => {
    if (arr.length === data?.leads?.length) {
      setArr([]);
      return;
    }
    setArr(data?.leads?.map((item) => item._id));
  };

  const handleSendWhatsApp = (numbers) => {
    console.log("SendWhatsapp", numbers);
    setArr([]);
    message.success("WhatsApp message sent successfully");
    setOpen(false);
  };

  const onEditSubmit = async (data) => {
    const { status, id } = data;
    try {
      const res = await updateLead({ id, body: { status } }).unwrap();
      if (res._id) {
        message.success("Status updated Successfully");
        setEditOpen(false);
      }
    } catch (err) {
      message.error(err.message);
      setEditOpen(false);
    }
  };

  const { data, isLoading } = useGetAllLeadsQuery({ ...query });
  const meta = data?.meta;

  const columns = [
    {
      title: "Date and time",
      dataIndex: "search_date_and_time",
      render: function (data) {
        return <h1>{data ? data : "N/A"}</h1>;
      },
    },
    {
      title: "Phone",
      dataIndex: "user_phone",
      render: function (data) {
        return <h1>{data ? data : "N/A"}</h1>;
      },
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
      render: function (data) {
        return <h1>{data ? data : "N/A"}</h1>;
      },
    },
    {
      title: "State",
      dataIndex: "user_state",
      render: function (data) {
        return <h1>{data ? data : "N/A"}</h1>;
      },
    },
    {
      title: "Requirement",
      dataIndex: "user_requirement",
      render: function (data) {
        if (data) {
          let words = data.split(" ");
          let result = words.length > 2 ? words.slice(0, 2).join(" ") : data;
          result = result + "...";
          return <h1>{result}</h1>;
        } else {
          return <h1>{data ? data : "N/A"}</h1>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data) {
        return <h1>{data ? data : "N/A"}</h1>;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: function (data) {
        return (
          <>
            <Checkbox
              onChange={(e) => onBoxChange(e.target.value)}
              value={data}
              checked={arr.includes(data)}
            />
            <Button
              style={{
                margin: "0px 5px",
                marginLeft: "20px",
              }}
              onClick={() => {
                setEditOpen(true);
                setId(data);
              }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  if (isUpdateLoading) return <Loading />;

  return (
    <>
      <Navbar />
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
                  setOpen(true);
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
      <CSModal
        title="Send whatsapp message"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => handleSendWhatsApp(arr)}
      >
        <p className="my-5">Are you sure?</p>
      </CSModal>
      <CSModal
        title="Edit Status"
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        handleOk={() => onEditSubmit({ status: textAreaData, id: id })}
      >
        <div className="pb-10">
          <TextArea
            showCount
            maxLength={100}
            defaultValue={
              data?.leads?.find((item) => item._id === id)?.status || ""
            }
            onChange={(e) => {
              setTextAreaData(e.target.value);
            }}
            placeholder="Edit Status"
            style={{ height: 120, resize: "none" }}
          />
        </div>
      </CSModal>
    </>
  );
};

export default Home;
