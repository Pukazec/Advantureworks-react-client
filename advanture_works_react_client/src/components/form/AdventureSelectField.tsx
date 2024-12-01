import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { useHttpContext } from '../../context/HttpContext';
import { FieldDto } from '../../utils/field/fieldDtos';

interface Props {
  field: FieldDto;
}

export const AdventureSelectField: React.FC<Props> = (props: Props) => {
  const { field } = props;
  const { get } = useHttpContext();
  const [options, setOptions] = useState<DefaultOptionType[]>();

  const fetchOptions = async () => {
    if (!field.url) {
      setOptions([]);
      return;
    }
    const data = await get<any[]>(`${field.url}`);

    if (!data) {
      return [];
    }

    const mappedOptions = data.map((field) => {
      return {
        value: field.id,
        label: field.name,
      };
    });

    setOptions(mappedOptions);
  };

  useEffect(() => {
    fetchOptions();
  }, [field]);

  return (
    <Select
      placeholder={`Enter ${field.title}`}
      disabled={field.readonly}
      options={options}
    />
  );
};
