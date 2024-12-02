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
    title: columnName,
    dataIndex: lowerCaseTitle,
    key: lowerCaseTitle,
    ...getSorter(lowerCaseTitle, fieldType),
    ...getTextSearchFilter(lowerCaseTitle),
    fieldType: fieldType,
    url: url,
    render: (value: any) => {
      switch (fieldType) {
        case FieldTypes.TEXT:
        case FieldTypes.NUMBER:
        case FieldTypes.BOOLEAN:
        case FieldTypes.DATE:
          return value;
        case FieldTypes.SELECT:
          return <ReferenceCell url={url} value={value} path={path} />;
        case FieldTypes.EMAIL:
          return <a href={`mailto:${value}`}>{value}</a>;
      }
    },
  };
};

const lowerCaseFirstLetter = (title: string): string => {
  if (title.length === 0) return title;

  const firstLetter = title.charAt(0).toLowerCase();
  const restOfString = title.slice(1);

  return firstLetter + restOfString;
};
