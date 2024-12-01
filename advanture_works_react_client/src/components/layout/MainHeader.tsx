import { Menu, Space } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { Header } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import EditUser from '../../pages/UserManagement/EditUser';
import { routes } from '../../utils/routes/definedRoutes';

const MainHeader: React.FC = () => {
  const { email, jwt, logout } = useAuthContext();
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemType<MenuItemType>[] | undefined>();
  const [editShown, setEditShown] = useState<boolean>(false);

  useEffect(() => {
    const userItems = [];
    const accessToken = jwt();
    if (accessToken) {
      userItems.push({
        key: '101',
        label: email() ?? 'no user name',
        onClick: () => {
          setEditShown(true);
        },
      });
      userItems.push({
        key: '102',
        label: 'Logout',
        onClick: logout,
      });
    } else {
      userItems.push({
        key: '101',
        label: 'Login',
        onClick: () => {
          navigate(routes.ROUTE_USER_LOGIN);
        },
      });
      userItems.push({
        key: '102',
        label: 'Register',
        onClick: () => {
          navigate(routes.ROUTE_USER_REGISTER);
        },
      });
    }

    setItems(userItems);
  }, [jwt()]);

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        items={[
          {
            key: '0',
            label: 'Home',
            onClick: () => {
              navigate(routes.ROUTE_MAIN);
            },
          },
          {
            key: '1',
            label: 'Bill',
            onClick: () => {
              navigate(routes.ROUTE_BILL);
            },
          },
          {
            key: '2',
            label: 'Category',
            onClick: () => {
              navigate(routes.ROUTE_CATEGORY);
            },
          },
          {
            key: '3',
            label: 'City',
            onClick: () => {
              navigate(routes.ROUTE_CITY);
            },
          },
          {
            key: '4',
            label: 'Credit Card',
            onClick: () => {
              navigate(routes.ROUTE_CREDIT_CARD);
            },
          },
          {
            key: '5',
            label: 'Customer',
            onClick: () => {
              navigate(routes.ROUTE_CUSTOMER);
            },
          },
          {
            key: '6',
            label: 'Item',
            onClick: () => {
              navigate(routes.ROUTE_ITEM);
            },
          },
          {
            key: '7',
            label: 'Product',
            onClick: () => {
              navigate(routes.ROUTE_PRODUCT);
            },
          },
          {
            key: '8',
            label: 'Seller',
            onClick: () => {
              navigate(routes.ROUTE_SELLER);
            },
          },
          {
            key: '9',
            label: 'Sub Category',
            onClick: () => {
              navigate(routes.ROUTE_SUB_CATEGORY);
            },
          },
        ]}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Space>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Space>
      <EditUser visible={editShown} setVisible={setEditShown} />
    </Header>
  );
};

export default MainHeader;
