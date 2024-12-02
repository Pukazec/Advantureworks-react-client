import { Card, Form, InputNumber, Modal, Select, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useHttpContext } from '../../context/HttpContext';
import { removeParam, routes } from '../../utils/routes/definedRoutes';

const { Option } = Select;

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  billId: number;
}

const ProductForm: React.FC<Props> = ({ open, setOpen, billId }) => {
  const [form] = useForm();
  const { get, post } = useHttpContext();
  const [categories, setCategories] = useState<any[]>();
  const [subcategories, setSubcategories] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>();
  const [filteredProducts, setFilteredProducts] = useState<any[]>();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    form.resetFields(['subcategoryId', 'productId']);
    setFilteredSubcategories(
      subcategories?.filter((sc) => sc.categoryId === categoryId)
    );
    setFilteredProducts([]);
    setSelectedProduct(null);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    form.resetFields(['productId']);
    setFilteredProducts(
      products?.filter((p) => p.subCategoryId === subcategoryId)
    );
    setSelectedProduct(null);
  };

  const handleProductChange = (productId: string) => {
    const product = products?.find((p) => p.id === productId) || null;
    setSelectedProduct(product);
  };

  const closeForm = () => {
    form.resetFields();
    setFilteredSubcategories([]);
    setFilteredProducts([]);
    setSelectedProduct(null);
    setOpen(false);
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    values.billId = billId;
    values.totalPrice = values.quantity * selectedProduct?.price;

    post<any>(removeParam(routes.ROUTE_ITEM), values);
    closeForm();
  };

  const fetchEnumerationItems = async () => {
    const newCategories = await get<any[]>(routes.ROUTE_CATEGORY);
    setCategories(newCategories);
    const newSubcategories = await get<any[]>(routes.ROUTE_SUB_CATEGORY);
    setSubcategories(newSubcategories);
    const newProducts = await get<any[]>(routes.ROUTE_PRODUCT);
    setProducts(newProducts);
  };

  useEffect(() => {
    if (!open) {
      closeForm();
    }
  }, [open]);

  useEffect(() => {
    fetchEnumerationItems();
  }, []);

  return (
    <Modal
      open={open}
      onCancel={closeForm}
      onOk={() => form.submit()}
      okText="Save"
    >
      {categories && subcategories && products ? (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              placeholder="Select a category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Subcategory"
            name="subcategoryId"
            rules={[
              { required: true, message: 'Please select a subcategory!' },
            ]}
          >
            <Select
              placeholder="Select a subcategory"
              onChange={handleSubcategoryChange}
              disabled={filteredSubcategories?.length === 0}
            >
              {filteredSubcategories?.map((subcategory) => (
                <Option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Product"
            name="productId"
            rules={[{ required: true, message: 'Please select a product!' }]}
          >
            <Select
              placeholder="Select a product"
              onChange={handleProductChange}
              disabled={filteredProducts?.length === 0}
            >
              {filteredProducts?.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter a quantity!' }]}
          >
            <InputNumber min={1} placeholder="Enter quantity" />
          </Form.Item>

          {selectedProduct && (
            <Card
              title="Selected Product Information"
              style={{ marginTop: 20 }}
            >
              <p>
                <strong>ID:</strong> {selectedProduct.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>Color:</strong> {selectedProduct.color}
              </p>
              <p>
                <strong>Product Number:</strong> {selectedProduct.productNumber}
              </p>
            </Card>
          )}
        </Form>
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default ProductForm;
