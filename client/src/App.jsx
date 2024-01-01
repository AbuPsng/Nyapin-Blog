import Template from "./components/Template"
import HomePages from "./pages/HomePages"
import BlogListsPage from "./pages/BlogListsPage"


import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import RegisterPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UserDetailsPage from "./pages/UserDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePages />,
  },
  {
    path: "/blog_lists",
    element: <BlogListsPage />
  },
  {
    path: "/blog_details",
    element: <BlogDetailsPage />
  },
  {
    path: "/sign_up",
    element: <RegisterPage />
  },
  {
    path: "/sign_in",
    element: <LoginPage />
  },
  {
    path: "/my_details",
    element: <UserDetailsPage />
  },
]);

function App() {

  return (
    <>
      <Template>
        <RouterProvider router={router}>

        </RouterProvider>
      </Template>
    </>
  )
}

export default App
