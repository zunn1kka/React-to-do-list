import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBars from "./components/NavBars";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/UserAPI";
import { Spinner } from "react-bootstrap";
import "./i18n";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .catch(() => {
          user.setIsAuth(false);
        })
        .finally(() => setLoading(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBars />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
