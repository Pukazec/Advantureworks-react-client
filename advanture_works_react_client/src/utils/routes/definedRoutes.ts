export const optionalDynamicParam = '/:dynamicParam?';
export const mandatoryDynamicParam = '/:dynamicParam';

const USER_ROUTE = '/user';

export const routes = {
  //     ┌─────────── MAIN ─────────────┐
  //     ▼                              ▼
  ROUTE_MAIN: '/',
  ROUTE_APPLICATION_ABOUT: `/About`,
  //     ┌─────── USER MANAGEMENT ──────┐
  //     ▼                              ▼
  ROUTE_USER_LOGIN: '/auth/login',
  ROUTE_USER_REGISTER: '/auth/register',
  ROUTE_USER: USER_ROUTE,
  ROUTE_EDIT_USER: `${USER_ROUTE}${mandatoryDynamicParam}`,
  //     ┌────────── ENTITIES ──────────┐
  //     ▼                              ▼
  ROUTE_BILL: '/Bill',
  ROUTE_CATEGORY: '/Category',
  ROUTE_CITY: '/City',
  ROUTE_CREDIT_CARD: '/CreditCard',
  ROUTE_CUSTOMER: '/Customer',
  ROUTE_ITEM: `/Item${mandatoryDynamicParam}`,
  ROUTE_PRODUCT: '/Product',
  ROUTE_SELLER: '/Seller',
  ROUTE_SUB_CATEGORY: '/SubCategory',
};

export const removeParam = (path: string) => {
  return path.replace(/\/:[^\\/]+/, '');
};
