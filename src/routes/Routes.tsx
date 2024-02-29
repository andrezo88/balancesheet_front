import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AddBalance from "../pages/addBalance/AddBalance";
import AllBalances from "../pages/allBalances/AllBalances";
import Home from "../pages/home/Home";
import LoginUser from "../pages/login/Login";
import RegisterUser from "../pages/register/Register";
import { isAuthenticated } from "../middlewares/Auth";


interface PrivateRouteProps {
 children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
 return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
 return (
  <Router>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<RegisterUser />} />
    <Route path="/login" element={<LoginUser />} />
    <Route path="*" element={<Navigate to="/404" />} />
    <Route
     path="/add-balance"
     element={
      <PrivateRoute>
       <AddBalance />
      </PrivateRoute>
     }
    />
    <Route
     path="/all-balances"
     element={
      <PrivateRoute>
       <AllBalances />
      </PrivateRoute>
     }
    />
   </Routes>
  </Router>
 );
};

export default AppRoutes;
