"use client";

import { Table } from "antd";

const ADTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
  scroll,
}) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
      scroll={scroll}
      rowClassName={getRowClassName}
    />
  );
};

export default ADTable;
