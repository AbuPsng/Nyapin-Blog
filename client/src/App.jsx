import HomePages from "./pages/HomePages"
import BlogListsPage from "./pages/BlogListsPage"
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import RegisterPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import BlogCreatePage from "./pages/BlogCreatePage";
import BlogUpdatePage from "./pages/BlogUpdatePage";
import MyBlogPage from "./pages/MyBlogPage";
import UsersList from "./pages/UsersList";

axios.defaults.baseURL = "https://nyapin-blog-backend-dqqb.onrender.com/api/v1"
axios.defaults.withCredentials = true

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
    path: "/blog_details/:blogId",
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
  {
    path: "/create_blog",
    element: <BlogCreatePage />
  },
  {
    path: "/update_blog/:blogId",
    element: <BlogUpdatePage />
  },
  {
    path: "/my_blogs",
    element: <MyBlogPage />
  },
  {
    path: "/all_users",
    element: <UsersList />
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
