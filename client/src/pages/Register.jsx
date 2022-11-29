import { useContext } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, name: e.target.value })
              }
              value={registerInfo.name}
            />
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, email: e.target.value })
              }
              value={registerInfo.email}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                })
              }
              value={registerInfo.password}
            />
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Stack>
        </Col>
      </Form>
    </>
  );
};

export default Register;
