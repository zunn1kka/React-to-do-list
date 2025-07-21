import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { CodeSlash, HeartFill, LightningCharge } from "react-bootstrap-icons";
import "../styles/Home.css";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/Consts";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useTranslation } from "react-i18next";

const Home = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { t } = useTranslation();

  const handleButtonClick = () => {
    navigate(isLogin ? "/tasks" : "/login");
  };

  return (
    <div className="home-page">
      <Container className="py-5 text-center">
        <div className="hero-section mb-5">
          <h1 className="display-4 fw-bold mb-3">
            {user.isAuth ? t("home.userTitle") : t("home.guestTitle")}
            <HeartFill color="#dc3545" />
          </h1>
          <p className="lead text-muted">
            {user.isAuth ? t("home.subtitle") : t("home.guestSubtitle")}
          </p>
        </div>

        <Card className="shadow-lg mb-4">
          <Card.Body className="p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-4 mb-md-0">
                <CodeSlash size={80} className="text-primary mb-3" />
                <h2>{t("home.aboutTitle")}</h2>
                <p className="text-muted">{t("home.aboutText")}</p>
              </div>
              <div className="features ms-md-1" style={{ minWidth: "400px" }}>
                <div className="feature-item mb-4">
                  <LightningCharge size={24} className="text-warning me-2" />
                  <span>{t("home.features.taskManagement")}</span>
                </div>
                <div className="feature-item mb-4">
                  <LightningCharge size={24} className="text-warning me-2" />
                  <span>{t("home.features.statusTracking")}</span>
                </div>
                <div className="feature-item">
                  <LightningCharge size={24} className="text-warning me-2" />
                  <span>{t("home.features.deadlines")}</span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <div className="cta-section mt-5 p-4 rounded-3 bg-light">
          {user.isAuth ? (
            <>
              <h3 className="mb-4">{t("home.cta.user")}</h3>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/tasks")}
                className="px-4 py-2"
              >
                {t("navbar.tasks")}
              </Button>
            </>
          ) : (
            <>
              <h3 className="mb-4">
                {t("home.cta.guest")}{" "}
                {isLogin ? t("auth.login") : t("auth.register")}
              </h3>
              <Button
                variant="primary"
                size="lg"
                onClick={handleButtonClick}
                className="px-4 py-2"
              >
                {isLogin ? t("navbar.tasks") : t("auth.login")}
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
});

export default Home;
