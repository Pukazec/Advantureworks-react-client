import { ColumnType } from 'antd/es/table';
import { ReactNode } from 'react';

export enum FieldTypes {
  TEXT = 1,
  NUMBER = 2,
  BOOLEAN = 3,
  SELECT = 4,
  DATE = 5,
}

export interface FieldDto extends ColumnType<any> {
  title: ReactNode;
  fieldType: FieldTypes;
  readonly?: boolean;
  url?: string;
}
