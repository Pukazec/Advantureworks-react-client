import { Button, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import AdventureForm from '../../components/form/AdventureForm';
import { getActionColumn } from '../../components/table/fixedColumns';
import { useHttpContext } from '../../context/HttpContext';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { routes } from '../../utils/routes/definedRoutes';

const CustomerScreen: React.FC = () => {
  const { get, deleteEntity } = useHttpContext();
  const [data, setData] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [fields, setFields] = useState<any[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any>();

  const fetchData = async () => {
    const result = await get<any[]>(routes.ROUTE_CUSTOMER);

    setData(result ?? []);
  };

  const deleteIt = (id: any) => {
    deleteEntity(`${routes.ROUTE_CUSTOMER}/${id}`, true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    setFields([
      { ...getFieldDto('Id', FieldTypes.NUMBER), readonly: true },
      { ...getFieldDto('Name', FieldTypes.TEXT) },
      { ...getFieldDto('Surname', FieldTypes.TEXT) },
      { ...getFieldDto('Email', FieldTypes.TEXT) },
      { ...getFieldDto('Telephone', FieldTypes.TEXT) },
      {
        ...getFieldDto('CityId', FieldTypes.SELECT, routes.ROUTE_CITY),
      },
      {
        ...getActionColumn(deleteIt, setSelectedEntity),
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedEntity) {
      setFormOpen(true);
    }
  }, [selectedEntity]);

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
      <Table dataSource={data} columns={fields} />

      {formOpen ? (
        <AdventureForm
          open={formOpen}
          setOpen={setFormOpen}
          fields={fields}
          apiPath={routes.ROUTE_CUSTOMER}
          selectedEntity={selectedEntity}
        />
      ) : undefined}
    </Card>
  );
};

export default CustomerScreen;
