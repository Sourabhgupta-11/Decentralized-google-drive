import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import MyFiles from "./pages/MyFiles";
import MySharedFiles from "./pages/SharedFiles";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Connect/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/my-files" element={<MyFiles/>} />
        <Route exact path="/shared-files" element={<MySharedFiles/>} />
      </Routes>
    </Router>
  );
}

export default App;
