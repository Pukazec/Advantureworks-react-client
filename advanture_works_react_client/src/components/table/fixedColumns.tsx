import { Button, Modal, Space } from 'antd';
import { ColumnType } from 'antd/es/table';

export const getActionColumn = (
  deleteEntity: (entityId: string) => void,
  onEdit?: (record: any) => void
): ColumnType => {
  return {
    title: 'Action',
    key: 'action',
    dataIndex: 'id',
    render: (id: any, record: any) => {
      return (
        <Space size="middle">
          {onEdit && (
            <Button
              size="small"
              type="primary"
              onClick={() => {
                onEdit(record);
              }}
            >
              Edit
            </Button>
          )}
          <Button
            danger
            size="small"
            onClick={() => {
              Modal.confirm({
                title: 'Are you sure you want to delete this item?',
                onOk: () => {
                  deleteEntity(id);
                },
              });
            }}
          >
            Delete
          </Button>
        </Space>
      );
    },
  };
};
