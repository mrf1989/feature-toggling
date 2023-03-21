import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/main";
import Welcome from "./routes/welcome";
import "./App.css";
import Login from "./routes/login";
import { userState, pricingState } from "./state";
import { useRecoilValue } from "recoil";
import Admin from "./routes/admin";
import PetHostel from "./routes/pet/hostel";

function App() {
  document.title = "Featurized Pet Shop";
  const user = useRecoilValue(userState);
  const pricing = useRecoilValue(pricingState);

  const petHostel = pricing.petHostel && <Route path="/pet/hostel" element={<PetHostel />} />
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Welcome />} />
            {petHostel}
            {
              user.role === "ADMIN" &&
              <Route path="/admin" element={<Admin />} />
            }
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
