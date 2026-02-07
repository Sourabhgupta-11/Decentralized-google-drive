import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import MyFiles from "./pages/MyFiles";
import MySharedFiles from "./pages/SharedFiles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-files" element={<MyFiles />} />
        <Route path="/shared-files" element={<MySharedFiles />} />
      </Routes>
    </Router>
  );
}

export default App;
