import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
// import OrderDetails from './Pages/OrderDetails';
import SaleOrderForm from './Pages/SaleOrderForm';
import OrderDetails from './Pages/OrderDetails';
import {
  RecoilRoot,
} from 'recoil';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    const loggedIn = localStorage.getItem('isLogin') === 'true';
    setIsLogin(loggedIn);
    
    if (loggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <RecoilRoot>
    <Routes>
      <Route path="/" element={<OrderDetails />} />
      <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
      <Route path="/" element={isLogin ? <Navigate to="/" /> : <Navigate to="/login" />} />
    </Routes>
    </RecoilRoot>
  );
};

export default App;
