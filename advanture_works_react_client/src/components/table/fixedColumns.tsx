import { Button, Space } from 'antd';
import { ColumnType } from 'antd/es/table';

export const getActionColumn = (
  deleteEntity: (entityId: string) => void,
  onEdit: (record: any) => void
): ColumnType => {
  return {
    title: 'Action',
    key: 'action',
    dataIndex: 'id',
    render: (id: any, record: any) => {
      return (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              onEdit(record);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              deleteEntity(id);
            }}
          >
            Delete
          </Button>
        </Space>
      );
    },
  };
};
