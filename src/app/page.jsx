"use client";
import { Button } from "antd";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Checkbox, Divider, Col, Row, Flex } from 'antd';
import { useDebounced } from "@/redux/hooks";
import ADTable from "@/components/ui/ADTable";


const CheckboxGroup = Checkbox.Group;
const plainOptions = [''];
const defaultCheckedList = [''];

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const Home = () => {

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange1 = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

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
  const meta = data?.meta;

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
          <>
          
            {/* <Link href={`view/${data}`}>
              <Button icon={<EyeOutlined />}>View</Button>
            </Link> */}
            {/* <Checkbox onChange={onChange}></Checkbox> */}
            

    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange1} />
    
        
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination, filter, sorter) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  

  return (
    
    <div style={{ overflowX: "auto" }} className="flex justify-center my-10">
      <div className="bg-gray-200 min-w-[900px] p-4 rounded-md">
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button type="primary" >Primary Button</Button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button type="primary" style={{backgroundColor:'green'}}>Send What'sApp</Button>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}> Check all </Checkbox> 
      </div>
    </div>
      
        <ADTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
          scroll={{ x: true }}
        />
        
      </div>
    </div>
  );
};

export default Home;
