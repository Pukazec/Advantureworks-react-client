import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ReactNode } from 'react';
import MainHeader from './MainHeader';

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = (props: Props) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <MainHeader />
      <Content style={{ height: '100%' }}>{props.children}</Content>
    </Layout>
  );
};

export default MainLayout;
