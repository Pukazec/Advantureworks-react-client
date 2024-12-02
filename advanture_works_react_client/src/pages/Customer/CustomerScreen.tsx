import { Button, Card, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import AdventureForm from '../../components/form/AdventureForm';
import { getActionColumn } from '../../components/table/fixedColumns';
import { useHttpContext } from '../../context/HttpContext';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { routes } from '../../utils/routes/definedRoutes';
import BillScreen from '../Bill/BillScreen';

const CustomerScreen: React.FC = () => {
  const { get, deleteEntity } = useHttpContext();
  const [data, setData] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
      { ...getFieldDto('Email', FieldTypes.EMAIL) },
      { ...getFieldDto('Telephone', FieldTypes.TEXT) },
      {
        ...getFieldDto('CityId', FieldTypes.SELECT, routes.ROUTE_CITY),
      },
      {
        ...getActionColumn(deleteIt, (record: any) => {
          setSelectedEntity(record);
          setFormOpen(true);
        }),
      },
    ]);
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
        columns={fields}
        onRow={(record) => ({
          onClick: () => {
            setSelectedEntity(record);
            setModalOpen(true);
          },
        })}
      />

      {formOpen ? (
        <AdventureForm
          open={formOpen}
          setOpen={setFormOpen}
          fields={fields}
          apiPath={routes.ROUTE_CUSTOMER}
          selectedEntity={selectedEntity}
        />
      ) : undefined}

      {selectedEntity && !formOpen && (
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          width={'100vw'}
        >
          <BillScreen customer={selectedEntity} />
        </Modal>
      )}
    </Card>
  );
};

export default CustomerScreen;
