import "./App.css";
import { Routes, Route } from "react-router";
// import Homepage from "./components/Home";
import Dash from "./pages/Dash";
import Health from "./pages/Health";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup /> }></Route>
          <Route path="/dash" element={<Dash />}></Route>
          <Route path="/health" element={<Health />}></Route>
        </Routes>
      </main>
      <Footer />
      {/* <p className='flex justify-center  text-amber-600'>in works</p> */}
    </div>
  );
}

export default App;
