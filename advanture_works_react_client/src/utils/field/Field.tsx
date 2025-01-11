import numeral from 'numeral';
import {
  getSorter,
  getTextSearchFilter,
} from '../../components/table/columnFilterSorter';
import ReferenceCell from '../../components/table/ReferenceCell';
import { FieldDto, FieldTypes } from './fieldDtos';

export const getFieldDto = (
  columnName: string,
  fieldType: FieldTypes,
  url?: string,
  path?: string
): FieldDto => {
  const lowerCaseTitle = lowerCaseFirstLetter(columnName);
  return {
    title: columnName.endsWith('Id') ? columnName.slice(0, -2) : columnName,
    dataIndex: lowerCaseTitle,
    key: lowerCaseTitle,
    ...getSorter(lowerCaseTitle, fieldType),
    ...getTextSearchFilter(lowerCaseTitle),
    fieldType: fieldType,
    url: url,
    render: (value: any) => {
      switch (fieldType) {
        case FieldTypes.NUMBER:
          return numeral(value).format('0.00');
        case FieldTypes.TEXT:
        case FieldTypes.DATE:
          return value;
        case FieldTypes.BOOLEAN:
          return value ? 'Yes' : 'No';
        case FieldTypes.SELECT:
          return <ReferenceCell url={url} value={value} path={path} />;
        case FieldTypes.EMAIL:
          return <a href={`mailto:${value}`}>{value}</a>;
      }
    },
  };
};

// ES5
function lowerCaseFirstLetter(title: string): string {
  if (title.length === 0) {
    return title;
  }

  var firstLetter = title.charAt(0).toLowerCase();
  var restOfString = title.slice(1);

  return firstLetter + restOfString;
}
