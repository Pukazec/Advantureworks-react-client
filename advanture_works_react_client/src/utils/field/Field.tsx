import {
  getSorter,
  getTextSearchFilter,
} from '../../components/table/columnFilterSorter';
import ReferenceCell from '../../components/table/ReferenceCell';
import { FieldDto, FieldTypes } from './fieldDtos';

export const getFieldDto = (
  columnName: string,
  fieldType: FieldTypes,
  url?: string
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
    render: (value: any) =>
      fieldType === FieldTypes.SELECT && url ? (
        <ReferenceCell url={url} value={value} />
      ) : (
        value
      ),
  };
};

const lowerCaseFirstLetter = (title: string): string => {
  if (title.length === 0) return title;

  const firstLetter = title.charAt(0).toLowerCase();
  const restOfString = title.slice(1);

  return firstLetter + restOfString;
};
