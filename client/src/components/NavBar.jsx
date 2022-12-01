import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar>
      <Container>
        <h2>
          <Link to="/" className="link-dark">
            Chatt
          </Link>
        </h2>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {!user && (
              <>
                <Link to="/login" className="link-dark">
                  Login
                </Link>
                <Link to="/register" className="link-dark">
                  Register
                </Link>
              </>
            )}
            {user && (
              <Link
                onClick={() => logoutUser()}
                to="/login"
                className="link-dark"
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
