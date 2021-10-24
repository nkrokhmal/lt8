import * as React from 'react';
import PropTypes from 'prop-types';
import { Table as TableAntd } from 'antd';


const FieldType = {
  Date: 'date',
  Number: 'number',
  Text: 'text'
};

const getText = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  return value.props.children;
};

const Table = ({ columns, data, pagination, scroll }) => {
  const columnsFormatted = columns.map((column) => {
    switch (column.sorter) {
      case FieldType.Text:
        column.sorter = (a, b) => {
          const current = getText(a[column.key]);
          const next = getText(b[column.key]);

          return current.localeCompare(next);
        };
        break;
      case FieldType.Number:
        column.sorter = (a, b) => {
          const current = Number(getText(a[column.key]));
          const next = Number(getText(b[column.key]));

          return current - next;
        };
        break;
      case FieldType.Date:
        column.sorter = (a, b) => {
          const current = new Date(getText(a[column.key]));
          const next = new Date(getText(b[column.key]));

          return current - next;
        };
        break;
      default:
        break;
    }

    return column;
  });

  return (
    <TableAntd
      columns={columnsFormatted}
      dataSource={data}
      pagination={pagination}
      scroll={scroll}
    />);
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired
    })
  ),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({})
  ]),
  scroll: PropTypes.shape({
    x: PropTypes.bool,
    y: PropTypes.bool
  })
};

Table.defaultProps = {
  data: null,
  pagination: false
};

export default Table;
