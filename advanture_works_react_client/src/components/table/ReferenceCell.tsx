import { useEffect, useState } from 'react';
import { useHttpContext } from '../../context/HttpContext';

interface Props {
  url: string | undefined;
  value: any;
  path?: string;
}

const ReferenceCell: React.FC<Props> = (props: Props) => {
  const { url, value, path } = props;
  const { get } = useHttpContext();
  const [entity, setEntity] = useState<any>();

  useEffect(() => {
    const getEntity = async () => {
      if (!value) {
        return;
      }
      const result = await get<any>(`${url}?id=${value}`);
      setEntity(result);
    };

    if (value) {
      getEntity();
    }
  }, [value]);

  if (!entity) {
    return <span></span>;
  }

  if (path) {
    return <span>{entity[0]?.[path]}</span>;
  }

  return <span>{entity[0]?.name}</span>;
};

export default ReferenceCell;
