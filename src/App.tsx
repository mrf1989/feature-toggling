import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/main";
import Welcome from "./routes/welcome";
import "./App.css";
import Login from "./routes/login";
import Admin from "./routes/admin";
import Profile from "./routes/me";
import Pricing from "./routes/pricing";
import { useContext, useEffect, useState } from "react";
import { AppContext } from ".";
import { Role } from "./models/UserType";
import Vet from "./routes/vet";
import Dates from "./routes/me/dates";
import PetForm from "./routes/pet/form";

function App() {
  document.title = "Pet Clinic";
  const appContext = useContext(AppContext);
  const [toggleRouter, setToggleRouter] = useState(appContext);
  const [user, setUser] = useState(toggleRouter.getUser());
  const [routes, setRoutes] = useState(toggleRouter.getRoutes());
  
  useEffect(() => {    
    function handleToggleRouterChange() {
      setUser(appContext.getUser());
      setRoutes(appContext.getRoutes());
      setToggleRouter(appContext);
    }

    appContext.subscribe(handleToggleRouterChange);

    return () => {
      appContext.unsubscribe(handleToggleRouterChange);
    };
  }, [appContext, toggleRouter, routes, user]);

  const allowedRoutes = routes.map((route: any) => {
    return <Route path={route.path} Component={route.component} key={route.path} />
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Welcome />} />
            {allowedRoutes}
            {
              user.role === Role.ADMIN &&
              <Route path="/admin" element={<Admin />} />
            }
            {
              user.role === Role.VET &&
              <Route path="/vet" element={<Vet />} />
            }
            {
              (user.role === Role.ADMIN || user.role === Role.VET) &&
              <Route path="/pet/add" element={<PetForm />} />
            }
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/me/dates" element={<Dates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
