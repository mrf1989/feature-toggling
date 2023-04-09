import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/main";
import Welcome from "./routes/welcome";
import "./App.css";
import Login from "./routes/login";
import { userState, routesState } from "./state";
import { useRecoilValue } from "recoil";
import Admin from "./routes/admin";
import Profile from "./routes/me";

function App() {
  document.title = "Pet Clinic";
  const user = useRecoilValue(userState);
  const routes = useRecoilValue(routesState);

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
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
