import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import Example from "./components/Example";
import { Form } from "./components/Form";
import App from "./App.tsx";
import { Timer } from "./components/Timer";
import { UsersPage } from "./features/users/pages/UsersPage";
import { ApiUsersPage } from "./features/api-users/pages/ApiUsersPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/about">About</Link>
        {" | "}
        <Link to="/example">Example</Link>
        {" | "}
        <Link to="/timer">Timer</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/Form" element={<Form />} />
        <Route path="/example" element={<Example />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/api-users" element={<ApiUsersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;