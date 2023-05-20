import { lazy, Suspense } from "react";
import { DarkMode } from "@mui/icons-material";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModelContext";
import { AuthContext } from "./context/authContext";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/login/Login"));
const Navbar = lazy(() => import("./components/navBar/Navbar.jsx"));
const LeftBar = lazy(() => import("./components/leftBar/LeftBar.jsx"));
const RightBar = lazy(() => import("./components/rightBar/RightBar.jsx"));
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile"));



function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client= {queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback= {<div>loading...</div>}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: 
          <Suspense fallback= {<div>loading...</div>}>
          <Home />
          </Suspense>

        },
        {
          
          path: "/profile/:id",
          element: 
          <Suspense fallback= {<div>loading...</div>}>
          <Profile />
          </Suspense>

        },
      ],
    },
    {
      path: "/login",
      element: 
      <Suspense fallback= {<div>loading...</div>}>
      <Login />
      </Suspense>

    },
    {
      path: "/register",
      element: 
      <Suspense fallback= {<div>loading...</div>}>
      <Register />
      </Suspense>
      ,
    },
  ]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
