import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserContext, UserContextInterface } from "./context/UserContext";
import { getCurrentUser } from "./services/auth.service";
import { IUser } from "./types/user.type";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isSigedUp, setIsSigedUp] = useState(false);

  const setCurrentUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      setUser(response?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!user) setCurrentUser();
  }, [setCurrentUser, user]);

  const AppUserContext: UserContextInterface = {
    user,
    setUser,
  };

  return (
    <div className="App">
      <UserContext.Provider value={AppUserContext}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/:id" element={<Profile />} />
            </Route>
            <Route
              path="/login"
              element={
                <Login setIsSigedUp={setIsSigedUp} isSigedUp={isSigedUp} />
              }
            />
            <Route
              path="/signup"
              element={<Signup setIsSigedUp={setIsSigedUp} />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
