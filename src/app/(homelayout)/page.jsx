"use client";
import { Button, message } from "antd";
import { useState } from "react";
import { Checkbox } from "antd";
import ADTable from "@/components/ui/ADTable";
import {
  useGetAllLeadsQuery,
  useUpdateLeadMutation,
} from "@/redux/api/leadsApi";
import Navbar from "../../components/Navbar";
import CSModal from "@/components/ui/Modal";
import { Input } from "antd";
import Loading from "../loading";
import { set } from "react-hook-form";
const { TextArea } = Input;

const Home = () => {
  const [updateLead, { isLoading: isUpdateLoading }] = useUpdateLeadMutation();
  const [id, setId] = useState("");
  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
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
    if (arr?.includes(value)) {
      setArr(arr?.filter((item) => item !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const generateWhatsAppRequestData = (numbers) => {
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer EAArI6pUax04BO6tRJ0PC3RAdMZAAmE2qDKp45ZBRVGVpvA4EQvhZA7zNE0NzYXYgNrcifRoZBh6rI1Y6hZCYG1OWpfkwpVAbdPil2aLHfbUDQVPnPjT7qXZBzGsGFwwsBwpsq6XzsRU60IeIQRdyQ4lqdYXjoEDZCwEhGGc4NYkWN3T2wiLUuQ0HwToLkCL1ZAsd`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        // to: numbers.join(","),
        to: "8801624959145",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      }),
    };

    return requestData;
  };

  const [textAreaData, setTextAreaData] = useState("");
  const [messageData, setMessageData] = useState("");

  const handleSelectAll = () => {
    if (arr?.length === data?.leads?.length) {
      setArr([]);
      return;
    }
    setArr(data?.leads?.map((item) => item.user_phone));
  };

  const handleSendWhatsApp = async (numbers) => {
    if (!messageData.trim()) {
      message.error("Please enter a WhatsApp message before sending.");
      return;
    }
    setLoading(true);
    const data = { numbers, message: messageData };
    const whatsappRequestData = generateWhatsAppRequestData(numbers);

    try {
      const url = "https://graph.facebook.com/v18.0/218978457961450/messages";
      const response = await fetch(url, whatsappRequestData);

      if (response.ok) {
        console.log("SendWhatsapp", { numbers, message: messageData });
        setArr([]);
        message.success("WhatsApp message sent successfully");
        setOpen(false);
      } else {
        console.error("Failed to send WhatsApp message. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      message.error("Failed to send WhatsApp message");
      setLoading(false);
    }
    setArr([]);
    setOpen(false);
    setLoading(false);
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
      dataIndex: "user_phone",
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
    {
      title: "Action",
      dataIndex: "_id",
      render: function (data) {
        return (
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
        );
      },
    },
  ];

  if (isUpdateLoading) return <Loading />;

  return (
    <>
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
        <div className="pb-10">
          <TextArea
            showCount
            maxLength={100}
            onChange={(e) => {
              setMessageData(e.target.value);
            }}
            required
            placeholder="Enter Message"
            style={{ height: 120, resize: "none" }}
          />
        </div>
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
