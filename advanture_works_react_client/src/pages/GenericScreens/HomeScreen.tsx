import { Image } from 'antd';

const HomeScreen: React.FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 64px)', background: 'black' }}>
      <Image style={{ width: '100vw' }} src="./catto.jpg" />;
    </div>
  );
};

export default HomeScreen;
