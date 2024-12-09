import { Button, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useHttpContext } from '../context/HttpContext';
import AdventureForm from './form/AdventureForm';
import { getActionColumn } from './table/fixedColumns';

interface Props {
  route: string;
  fields: any[];
}

const BaseScreen: React.FC<Props> = ({ route, fields }) => {
  // deconstructing
  const { get, deleteEntity } = useHttpContext();
  const [data, setData] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<any>();

  const fetchData = async () => {
    const result = await get<any[]>(route);

    setData(result ?? []);
  };

  const deleteIt = (id: any) => {
    // template literal
    deleteEntity(`${route}/${id}`, true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!formOpen) {
      setSelectedEntity(undefined);
      fetchData();
    }
  }, [formOpen]);

  return (
    <Card
      title="Customers"
      extra={<Button onClick={() => setFormOpen(true)}>New</Button>}
    >
      <Table
        dataSource={data}
        columns={[
          ...fields,
          {
            ...getActionColumn(deleteIt, (record: any) => {
              setSelectedEntity(record);
              setFormOpen(true);
            }),
          },
        ]}
      />

      {formOpen ? (
        <AdventureForm
          open={formOpen}
          setOpen={setFormOpen}
          fields={fields}
          apiPath={route}
          selectedEntity={selectedEntity}
        />
      ) : undefined}
    </Card>
  );
};

export default BaseScreen;
