import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/main";
import Welcome from "./routes/welcome";
import "./App.css";
import Login from "./routes/login";
import Admin from "./routes/admin";
import Profile from "./routes/me";
import Pricing from "./routes/pricing";
import { useContext, useEffect, useState } from "react";
import { FeatureContext } from ".";

function App() {
  document.title = "Pet Clinic";
  const featureContext = useContext(FeatureContext);
  const [featureRetriever, setFeatureRetriever] = useState(featureContext);
  const [user, setUser] = useState(featureRetriever.getUser());
  const [routes, setRoutes] = useState(featureRetriever.getRoutes());
  
  useEffect(() => {    
    function handleFeatureRetrieverChange() {
      setUser(featureContext.getUser());
      setRoutes(featureContext.getRoutes());
      setFeatureRetriever(featureContext);
    }

    featureContext.subscribe(handleFeatureRetrieverChange);

    return () => {
      featureContext.unsubscribe(handleFeatureRetrieverChange);
    };
  }, [featureContext, featureRetriever, routes, user]);

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
              user.role === "ADMIN" &&
              <Route path="/admin" element={<Admin />} />
            }
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
