import { Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { SingleBlog } from "./pages/SingleBlog";
import { Toaster } from "react-hot-toast";
import { Blogs } from "./pages/Blogs";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    console.log(token);
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/blogs" /> : <Navigate to="/signup" />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blog/:id" element={<SingleBlog />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

//johnDeep
// johndee111@gmail.com
// Johndee@123
