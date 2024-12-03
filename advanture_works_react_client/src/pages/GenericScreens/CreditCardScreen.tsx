import BaseScreen from '../../components/BaseScreen';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { routes } from '../../utils/routes/definedRoutes';

const CreditCardScreen: React.FC = () => {
  return (
    <BaseScreen
      route={routes.ROUTE_CREDIT_CARD}
      fields={[
        { ...getFieldDto('Id', FieldTypes.NUMBER), readonly: true },
        { ...getFieldDto('Guid', FieldTypes.TEXT), readonly: true },
        { ...getFieldDto('Type', FieldTypes.TEXT) },
        { ...getFieldDto('CardNumber', FieldTypes.TEXT) },
        { ...getFieldDto('ExpirationMonth', FieldTypes.NUMBER) },
        { ...getFieldDto('ExpirationYear', FieldTypes.NUMBER) },
      ]}
    />
  );
};

export default CreditCardScreen;
