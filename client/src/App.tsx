import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import Create from "./Pages/Create";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import NotFound from "./components/Error/NotFound";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/p/:id" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Register />} />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route path="/:username" element={<Profile />} />
      <Route path="/edit" element={<EditProfile />} />
      <Route path="*" element={<NotFound err="Requested page" />} />
    </Routes>
  );
};

export default App;
