import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { UserContext, UserContextInterface } from "./context/UserContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./services/auth";

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
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
