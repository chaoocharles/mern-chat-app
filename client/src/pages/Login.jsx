import { useContext } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
              value={loginInfo.email}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateLoginInfo({
                  ...loginInfo,
                  password: e.target.value,
                })
              }
              value={loginInfo.password}
            />
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Stack>
        </Col>
      </Form>
    </>
  );
};

export default Login;
