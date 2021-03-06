import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';


const DialoguesTable = ({ dataSource, rowSelection, onChange, page }) => {
  const columns = [{
      align: 'left',
      dataIndex: 'name',
      title: 'Название',
      sorter: (a, b) => a.name - b.name
    }, {
      align: 'left',
      dataIndex: 'status',
      key: 'status',
      title: 'Статус',
      render: (status) => status === 'finished' ? 'Обработанный' : 'В процессе',
      sorter: (a, b) => a.status - b.status
    }, {
      align: 'center',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      title: 'Время',
      render: (date) => date.format('DD.MM.YYYY'),
      sorter: (a, b) => a.date - b.date
    }, {
      align: 'center',
      key: 'actions',
      render: (data) => (
        <NavLink to={`/dialogue/${data.id}`}>
          Подробнее
        </NavLink>
      ),
      title: 'Действия'
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.id}
      scroll={{ x: true }}
      rowSelection={rowSelection}
      pagination={page}
      onChange={onChange}
    />
  );
};

export default DialoguesTable; 