import MainLayout from '../../components/layout/MainLayout';
import BillScreen from '../../pages/Bill/BillScreen';
import BillItemScreen from '../../pages/BillItems/BillItemsScreen';
import CustomerScreen from '../../pages/Customer/CustomerScreen';
import CategoryScreen from '../../pages/GenericScreens/CategoryScreen';
import CityScreen from '../../pages/GenericScreens/CityScreen';
import CreditCardScreen from '../../pages/GenericScreens/CreditCardScreen';
import HomeScreen from '../../pages/GenericScreens/HomeScreen';
import ProductScreen from '../../pages/GenericScreens/ProductScreen';
import SellerScreen from '../../pages/GenericScreens/SellerScreen';
import SubCategoryScreen from '../../pages/GenericScreens/SubCategoryScreen';
import LoginScreen from '../../pages/UserManagement/LoginScreen';
import RegisterScreen from '../../pages/UserManagement/RegisterScreen';
import { routes } from './definedRoutes';

export const routeElements = [
  // HOME
  {
    path: routes.ROUTE_MAIN,
    element: (
      <MainLayout>
        <HomeScreen />
      </MainLayout>
    ),
  },
  // LOGIN
  {
    path: routes.ROUTE_USER_LOGIN,
    element: (
      <MainLayout>
        <LoginScreen />,
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_USER_REGISTER,
    element: (
      <MainLayout>
        <RegisterScreen />,
      </MainLayout>
    ),
  },
  // Entities
  {
    path: routes.ROUTE_BILL,
    element: (
      <MainLayout>
        <BillScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_CATEGORY,
    element: (
      <MainLayout>
        <CategoryScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_CITY,
    element: (
      <MainLayout>
        <CityScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_CREDIT_CARD,
    element: (
      <MainLayout>
        <CreditCardScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_CUSTOMER,
    element: (
      <MainLayout>
        <CustomerScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_ITEM,
    element: (
      <MainLayout>
        <BillItemScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_PRODUCT,
    element: (
      <MainLayout>
        <ProductScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_SELLER,
    element: (
      <MainLayout>
        <SellerScreen />
      </MainLayout>
    ),
  },
  {
    path: routes.ROUTE_SUB_CATEGORY,
    element: (
      <MainLayout>
        <SubCategoryScreen />
      </MainLayout>
    ),
  },
];
