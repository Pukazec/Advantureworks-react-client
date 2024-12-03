import BaseScreen from '../../components/BaseScreen';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { routes } from '../../utils/routes/definedRoutes';

const ProductScreen: React.FC = () => {
  return (
    <BaseScreen
      route={routes.ROUTE_PRODUCT}
      fields={[
        { ...getFieldDto('Id', FieldTypes.NUMBER), readonly: true },
        { ...getFieldDto('Guid', FieldTypes.TEXT), readonly: true },
        { ...getFieldDto('Name', FieldTypes.TEXT) },
        { ...getFieldDto('ProductNumber', FieldTypes.TEXT) },
        { ...getFieldDto('Color', FieldTypes.TEXT) },
        {
          ...getFieldDto(
            'SubCategoryId',
            FieldTypes.SELECT,
            routes.ROUTE_SUB_CATEGORY
          ),
        },
        { ...getFieldDto('Price', FieldTypes.NUMBER) },
      ]}
    />
  );
};

export default ProductScreen;
