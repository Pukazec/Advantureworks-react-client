import { Button, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActionColumn } from '../../components/table/fixedColumns';
import { useHttpContext } from '../../context/HttpContext';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { removeParam, routes } from '../../utils/routes/definedRoutes';
import BillItemForm from './BillItemForm';

const BillItemScreen: React.FC = () => {
  const { dynamicParam } = useParams();
  const { get, deleteEntity } = useHttpContext();
  const [data, setData] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [fields, setFields] = useState<any[]>([]);

  const fetchData = async () => {
    const url = `${removeParam(routes.ROUTE_ITEM)}?${dynamicParam}`;
    const result = await get<any[]>(url);

    setData(result ?? []);
  };

  const deleteIt = (id: any) => {
    deleteEntity(`${removeParam(routes.ROUTE_ITEM)}/${id}`, true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    setFields([
      { ...getFieldDto('Id', FieldTypes.NUMBER), readonly: true },
      {
        ...getFieldDto('ProductId', FieldTypes.SELECT, routes.ROUTE_PRODUCT),
      },
      {
        ...getFieldDto(
          'ProductId',
          FieldTypes.SELECT,
          routes.ROUTE_PRODUCT,
          'productNumber'
        ),
        title: 'Number',
      },
      {
        ...getFieldDto(
          'ProductId',
          FieldTypes.SELECT,
          routes.ROUTE_PRODUCT,
          'color'
        ),
        title: 'Color',
      },
      { ...getFieldDto('Quantity', FieldTypes.NUMBER) },
      {
        ...getFieldDto(
          'ProductId',
          FieldTypes.SELECT,
          routes.ROUTE_PRODUCT,
          'price'
        ),
        title: 'Price per peace',
      },
      { ...getFieldDto('TotalPrice', FieldTypes.NUMBER) },
      {
        ...getActionColumn(deleteIt),
      },
    ]);
  }, []);

  useEffect(() => {
    if (!formOpen) {
      fetchData();
    }
  }, [formOpen]);

  return (
    <Card
      title="Bill items"
      extra={<Button onClick={() => setFormOpen(true)}>New</Button>}
    >
      <Table dataSource={data} columns={fields} />

      {formOpen ? (
        <BillItemForm
          open={formOpen}
          setOpen={setFormOpen}
          billId={Number(dynamicParam?.split('=')[1])}
        />
      ) : undefined}
    </Card>
  );
};

export default BillItemScreen;
