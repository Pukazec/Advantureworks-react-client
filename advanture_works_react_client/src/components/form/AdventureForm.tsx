import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useHttpContext } from '../../context/HttpContext';
import { FieldDto, FieldTypes } from '../../utils/field/fieldDtos';

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  fields: FieldDto[];
  apiPath: string;
  selectedEntity: any | undefined;
}

const AdventureForm: React.FC<Props> = (props: Props) => {
  const { open, setOpen, fields, selectedEntity } = props;
  const [form] = useForm();
  const { post, put } = useHttpContext();
  const [renderedForm, setRenderedForm] = useState<JSX.Element>();

  const renderForm = () => {
    setRenderedForm(
      <>
        {fields?.slice(0, -1).map((field) => {
          let input: JSX.Element = <></>;

          switch (field.fieldType) {
            case FieldTypes.TEXT:
              input = (
                <Input
                  placeholder={`Enter ${field.title}`}
                  disabled={field.readonly}
                />
              );
              break;
            case FieldTypes.NUMBER:
              input = (
                <InputNumber
                  placeholder={`Enter ${field.title}`}
                  disabled={field.readonly}
                />
              );
              break;
            case FieldTypes.BOOLEAN:
              input = <Checkbox disabled={field.readonly} />;
              break;
            case FieldTypes.DATE:
              input = (
                <DatePicker
                  showTime
                  placeholder={`Enter ${field.title}`}
                  disabled={field.readonly}
                />
              );
              break;
            case FieldTypes.SELECT: {
              input = (
                <Select
                  placeholder={`Enter ${field.title}`}
                  disabled={field.readonly}
                />
              );
              break;
            }
          }
          return (
            <Form.Item
              key={field.key}
              label={field.title}
              name={field.dataIndex}
            >
              {input}
            </Form.Item>
          );
        })}
      </>
    );
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    if (selectedEntity) {
      put<any>(`${props.apiPath}/${selectedEntity.id}`, values);
    } else {
      post<any>(props.apiPath, values);
    }
    closeForm();
  };

  const closeForm = () => {
    setRenderedForm(undefined);
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    renderForm();
  }, [open]);

  return renderedForm ? (
    <Modal
      open={open}
      onCancel={closeForm}
      onOk={() => form.submit()}
      okText="Save"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedEntity}
      >
        {renderedForm}
      </Form>
    </Modal>
  ) : (
    <Spin />
  );
};

export default AdventureForm;
