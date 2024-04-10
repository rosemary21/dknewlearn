import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import './App.css'
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {

  return (   
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
