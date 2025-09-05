import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ROUTES, AUTH_ROUTES } from "./constants/index";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PropertiesPage from "./pages/PropertiesPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import MyProperties from "./pages/MyProperties";
import LikedProperties from "./pages/LikedProperties";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = AUTH_ROUTES.includes(location.pathname as typeof AUTH_ROUTES[number]);
  
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROPERTIES} element={<PropertiesPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.ADD_PROPERTY} element={<AddProperty />} />
          <Route path={ROUTES.MY_PROPERTIES} element={<MyProperties />} />
          <Route path={ROUTES.PROPERTY_DETAILS} element={<PropertyDetails />} />
          <Route path={ROUTES.FAVORITES} element={<LikedProperties />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
