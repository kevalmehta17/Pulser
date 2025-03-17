import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Blog } from "./pages/Blog";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/'blog/:id'" element={<Blog />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
