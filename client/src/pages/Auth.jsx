import React, { useState, useContext } from "react";
import { Button, Card, Container, Form, Nav, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/Consts";
import { login, registration } from "../http/UserAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useTranslation } from "react-i18next";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [loginValue, setLogin] = useState("");
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const { t } = useTranslation();
  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(loginValue, passwordValue);
      } else {
        data = await registration(loginValue, emailValue, passwordValue);
      }
      user.setUser(data.user);
      user.setIsAuth(true);
      window.location.href = "/";
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">
          {isLogin ? t("auth.login") : t("auth.register")}
        </h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder={t("form.username")}
            value={loginValue}
            onChange={(e) => setLogin(e.target.value)}
          />
          {isLogin ? (
            ""
          ) : (
            <Form.Control
              className="mt-3"
              placeholder={t("form.email")}
              value={emailValue}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <Form.Control
            className="mt-3"
            placeholder={t("form.password")}
            value={passwordValue}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        <Row className="align-items-center justify-content-between mt-4">
          <Col xs="auto">
            {isLogin ? (
              <div>
                <span className="me-2">{t("auth.noAccount")}</span>
                <Nav.Link href="/registration" style={{ display: "inline" }}>
                  {t("auth.register")}
                </Nav.Link>
              </div>
            ) : (
              <div>
                <span className="me-2">{t("auth.haveAccount")}</span>
                <Nav.Link href="/login" style={{ display: "inline" }}>
                  {t("auth.login")}
                </Nav.Link>
              </div>
            )}
          </Col>
          <Col xs="auto">
            <Button variant="outline-dark" onClick={click}>
              {isLogin ? t("auth.login") : t("auth.register")}
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
});

export default Auth;
