import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimatedBg from "./components/AnimatedBg";
import Landing from "./pages/Landing";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import MyFiles from "./pages/MyFiles";
import MySharedFiles from "./pages/SharedFiles";

function App() {
  return (
    <Router>
      <AnimatedBg />
      <Routes>
        <Route exact path="/"        element={<Landing />} />
        <Route exact path="/connect" element={<Connect />} />
        <Route exact path="/home"    element={<Home />} />
        <Route exact path="/my-files"     element={<MyFiles />} />
        <Route exact path="/shared-files" element={<MySharedFiles />} />
      </Routes>
    </Router>
  );
}

export default App;
