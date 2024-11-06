import { useEffect, useState } from 'react';
import { useHttpContext } from '../../context/HttpContext';

interface Props {
  url: string;
  value: any;
}

const ReferenceCell: React.FC<Props> = (props: Props) => {
  const { url, value } = props;
  const { get } = useHttpContext();
  const [entity, setEntity] = useState<any>();

  useEffect(() => {
    if (value) {
      getEntity();
    }
  }, [value]);

  const getEntity = async () => {
    if (!value) {
      return;
    }
    const result = await get<any>(`${url}?id=${value}`);
    setEntity(result);
  };

  console.log(entity && entity[0]?.name);

  return <span>{entity ? entity[0]?.name : ''}</span>;
};

export default ReferenceCell;
