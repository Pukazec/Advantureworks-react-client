import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useHttpContext } from '../../context/HttpContext';
import { routes } from '../../utils/routes/definedRoutes';

const LoginScreen: React.FC = () => {
  const { post } = useHttpContext();
  const { setJwt } = useAuthContext();
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    const result = await post<any>(routes.ROUTE_USER_LOGIN, formValues);

    if (result) {
      setJwt(result.access_token);
      navigate(routes.ROUTE_MAIN);
    }
  };

  return (
    <div className="user-management">
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          initialValue={'admin@email.com'}
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          initialValue={'123qweasd'}
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button onClick={form.submit} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;
