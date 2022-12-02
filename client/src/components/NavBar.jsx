import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="light" className="mb-4">
      <Container>
        <h2>
          <Link to="/" className="link-dark text-decoration-none">
            ChattApp
          </Link>
        </h2>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {!user && (
              <>
                <Link to="/login" className="link-dark text-decoration-none">
                  Login
                </Link>
                <Link to="/register" className="link-dark text-decoration-none">
                  Register
                </Link>
              </>
            )}
            {user && (
              <Link
                onClick={() => logoutUser()}
                to="/login"
                className="link-dark text-decoration-none"
              >
                Logout
              </Link>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
