import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { FieldTypes } from '../../utils/field/fieldDtos';

interface Props<T, U = React.Key[]> {
  selectedKeys: T;
  confirm: (param?: FilterConfirmProps) => void;
  setSelectedKeys: (selectedKeys: U) => void;
  clearFilters: () => void;
}

const TextSearchFilter: React.FC<Props<string[]>> = (
  props: Props<string[]>
) => {
  const { selectedKeys, setSelectedKeys, clearFilters, confirm } = props;

  const handleSearch = (
    confirm: (param?: FilterConfirmProps) => void
  ): void => {
    confirm();
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void
  ): void => {
    clearFilters();
    confirm();
  };

  return (
    <div>
      <Input
        ref={(input: InputRef): void => input && input.focus()}
        placeholder={'Search'}
        value={selectedKeys[0]}
        onChange={(e): void =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={(): void => handleSearch(confirm)}
        style={{ width: 200 }}
      />
      <>
        <Button
          type="primary"
          onClick={() => handleSearch(confirm)}
          size="small"
        >
          <SearchOutlined />
        </Button>
        <Button
          type="default"
          onClick={() => handleReset(clearFilters, confirm)}
          size="small"
        >
          <CloseOutlined />
        </Button>
      </>
    </div>
  );
};

export const getTextSearchFilter = (dataIndex: string): any => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: {
    selectedKeys: string[];
    confirm: (param?: FilterConfirmProps) => void;
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    clearFilters: () => void;
  }): React.ReactElement => (
    <TextSearchFilter
      setSelectedKeys={setSelectedKeys}
      selectedKeys={selectedKeys}
      confirm={confirm}
      clearFilters={clearFilters}
    />
  ),

  onFilter: (value: any, record: any) => {
    const currentValue = record[dataIndex];

    return currentValue.toString().toLowerCase().includes(value.toLowerCase());
  },
});

export const getSorter = (key: string, fieldType: FieldTypes): any => {
  return {
    sorter: (row: any, nextRow: any) => {
      const [rowValue, nextRowValue] = [row[key], nextRow[key]];

      if (fieldType === FieldTypes.NUMBER) {
        return (rowValue ?? 999999999999) - (nextRowValue ?? 999999999999);
      }
      return (rowValue ?? 'zzzzzz').localeCompare(nextRowValue ?? 'zzzzzz');
    },
  };
};
