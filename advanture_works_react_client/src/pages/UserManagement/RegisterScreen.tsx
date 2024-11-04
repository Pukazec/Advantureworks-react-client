import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes/definedRoutes';
import { useHttpContext } from '../../context/HttpContext';

const RegisterScreen: React.FC = () => {
  const { post } = useHttpContext();
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    const result = await post<any>(routes.ROUTE_USER_REGISTER, formValues);
    if (result) {
      navigate(routes.ROUTE_USER_LOGIN);
    }
  };

  return (
    <div className="user-management">
      <Form
        name="register"
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterScreen;
