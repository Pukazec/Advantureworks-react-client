import { Form, Input, Modal, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useHttpContext } from '../../context/HttpContext';
import { routes } from '../../utils/routes/definedRoutes';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
const EditUser: React.FC<Props> = (props: Props) => {
  const { email: userName } = useAuthContext();
  const { get, put } = useHttpContext();
  const navigate = useNavigate();
  const [form] = useForm();
  const [user, setUser] = useState<any>();

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    await put<any>(routes.ROUTE_USER, formValues);
  };

  const fetchUser = async () => {
    if (userName) {
      const result = await get<any>(`${routes.ROUTE_USER}?email=${userName}`);
      setUser(result?.at(0));
    } else {
      navigate(routes.ROUTE_USER_LOGIN);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [props.visible]);

  return (
    <Modal
      open={props.visible}
      onCancel={() => props.setVisible(false)}
      onOk={() => form.submit()}
      okText="Update"
    >
      {user ? (
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
              initialValue={user.name}
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              initialValue={user.email}
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              initialValue={user.password}
              rules={[
                { required: true, message: 'Please enter your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default EditUser;
