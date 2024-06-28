import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landing-page.jsx";
import LoginPage from "./components/login.jsx";
import SignupPage from "./components/sign-up.jsx";
import Homepage from "./components/home-page.jsx";
import TaskList from "./components/task-list.jsx";
import StickyWall from "./components/sticky-wall.jsx";
import PrivateRoute from "../utils/private-route.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="tasks/today" replace />} />
            <Route path="tasks">
              <Route path="today" element={<TaskList type="today" />} />
              <Route path="upcoming" element={<TaskList type="upcoming" />} />
            </Route>
            <Route path="stickywall" element={<StickyWall />} />
            <Route path="lists">
              <Route path="personal" element={<TaskList type="personal" />} />
              <Route path="work" element={<TaskList type="work" />} />
              <Route path="list-1" element={<TaskList type="list-1" />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
