import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="App">
      <h1>React</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
