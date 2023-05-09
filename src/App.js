import './App.css';
import CRUD from './components/CRUD';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<ProtectedPage/>} path="protected" exact />
            <Route element={<Login/>} path="login" />
            <Route element={<Register/>} path="register" />
            <Route element={<CRUD/>} path="events" />
            <Route element={<Home/>} path="/" />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
      </BrowserRouter>
  );
}

export default App;
