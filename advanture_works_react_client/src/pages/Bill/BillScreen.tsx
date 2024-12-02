import { Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpContext } from '../../context/HttpContext';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { removeParam, routes } from '../../utils/routes/definedRoutes';

interface Props {
  customer?: any;
}

const BillScreen: React.FC<Props> = (props: Props) => {
  const { customer } = props;
  const { get } = useHttpContext();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  const fetchData = async () => {
    const filter = customer ? `?customerId=${customer.id}` : '';
    const result = await get<any[]>(`${routes.ROUTE_BILL}${filter}`);

    setData(result ?? []);
  };

  useEffect(() => {
    setFields([
      { ...getFieldDto('Id', FieldTypes.NUMBER), readonly: true },
      { ...getFieldDto('Guid', FieldTypes.TEXT) },
      { ...getFieldDto('Date', FieldTypes.DATE) },
      { ...getFieldDto('BillNumber', FieldTypes.TEXT) },
      {
        ...getFieldDto('CustomerId', FieldTypes.SELECT, routes.ROUTE_CUSTOMER),
      },
      {
        ...getFieldDto('SellerId', FieldTypes.SELECT, routes.ROUTE_SELLER),
      },
      {
        ...getFieldDto(
          'CreditCardId',
          FieldTypes.SELECT,
          routes.ROUTE_CREDIT_CARD
        ),
      },
      { ...getFieldDto('Comment', FieldTypes.TEXT) },
      { ...getFieldDto('Total', FieldTypes.NUMBER) },
    ]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [customer]);

  return (
    <Card title="Bills">
      <Table
        dataSource={data}
        size="small"
        columns={fields}
        style={{ width: '80%' }}
        onRow={(record) => ({
          onClick: () =>
            navigate(`${removeParam(routes.ROUTE_ITEM)}/billId=${record.id}`),
        })}
      />
    </Card>
  );
};

export default BillScreen;
