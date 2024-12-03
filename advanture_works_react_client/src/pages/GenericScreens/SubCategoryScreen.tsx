import BaseScreen from '../../components/BaseScreen';
import { getFieldDto } from '../../utils/field/Field';
import { FieldTypes } from '../../utils/field/fieldDtos';
import { routes } from '../../utils/routes/definedRoutes';

const SubCategoryScreen: React.FC = () => {
  return (
    <BaseScreen
      route={routes.ROUTE_SUB_CATEGORY}
      fields={[
        { ...getFieldDto('Id', FieldTypes.NUMBER), readonly: true },
        { ...getFieldDto('Guid', FieldTypes.TEXT), readonly: true },
        { ...getFieldDto('Name', FieldTypes.TEXT) },
        {
          ...getFieldDto(
            'CategoryId',
            FieldTypes.SELECT,
            routes.ROUTE_CATEGORY
          ),
        },
      ]}
    />
  );
};

export default SubCategoryScreen;
