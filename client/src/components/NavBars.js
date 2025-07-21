import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const NavBars = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const { t } = useTranslation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">{t("navbar.home")}</Nav.Link>
            {user?.isAuth && (
              <>
                <Nav.Link href="/tasks">{t("navbar.tasks")}</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <LanguageSwitcher />
            {user?.isAuth ? (
              <Nav.Link onClick={() => logOut()}>{t("auth.logout")}</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">{t("auth.login")}</Nav.Link>
                <Nav.Link href="/registration">{t("auth.register")}</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBars;
