
import "./App.css";
import { Routes, Route } from "react-router";
// import Homepage from "./components/Home";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import Dash from "./pages/Dash";
import Health from "./pages/Health";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dash" element={<Dash />}></Route>
        <Route path="/health" element={<Health />}></Route>
      </Routes>
      <Footer />
      {/* <p className='flex justify-center  text-amber-600'>in works</p> */}
    </>
  );
}

export default App;
