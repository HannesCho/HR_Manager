import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { UserContext, UserContextInterface } from "./context/UserContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./services/auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Add from "./pages/Add";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [user]);

  const sampleAppContext: UserContextInterface = {
    user,
    setUser,
  };

  return (
    <div className="App">
      <UserContext.Provider value={sampleAppContext}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/:id" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
