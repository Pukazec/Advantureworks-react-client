import MainLayout from '../../components/layout/MainLayout';
import CustomerScreen from '../../pages/Customer/CustomerScreen';
import HomeScreen from '../../pages/HomeScreen';
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
  // {
  //   path: routes.ROUTE_BILL,
  //   element: (
  //     <MainLayout>
  //       <BillScreen />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: routes.ROUTE_CATEGORY,
  //   element: (
  //     <MainLayout>
  //       <CategoryScreen />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: routes.ROUTE_CITY,
  //   element: (
  //     <MainLayout>
  //       <CityScreen />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: routes.ROUTE_CREDIT_CARD,
  //   element: (
  //     <MainLayout>
  //       <CreditCardScreen />
  //     </MainLayout>
  //   ),
  // },
  {
    path: routes.ROUTE_CUSTOMER,
    element: (
      <MainLayout>
        <CustomerScreen />
      </MainLayout>
    ),
  },
  // {
  //   path: routes.ROUTE_ITEM,
  //   element: (
  //     <MainLayout>
  //       <ItemScreen />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: routes.ROUTE_PRODUCT,
  //   element: (
  //     <MainLayout>
  //       <ProductScreen />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: routes.ROUTE_SELLER,
  //   element: (
  //     <MainLayout>
  //       <SellerScreen />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: routes.ROUTE_SUB_CATEGORY,
  //   element: (
  //     <MainLayout>
  //       <SubCategoryScreen />
  //     </MainLayout>
  //   ),
  // },
];
