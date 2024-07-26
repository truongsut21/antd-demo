// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./features/login/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ForgotPassword from "./features/fogotPassword/ForgotPassword";
import DashBoard from "./features/dashBoard/DashBoard";
import OtpPassword from "./features/otpPassword/OtpPassword";
import CreatePassword from "./features/createPassword/CreatePassword";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-password" element={<OtpPassword />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/dash-board" element={<DashBoard />} />

          {/* Place new routes over this */}
          {/* <Route path="/app/*" element={<Layout />} /> */}

          {/* <Route
            path="*"
            element={
              <Navigate to={token ? "/app/welcome" : "/login"} replace />
            }
          /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
