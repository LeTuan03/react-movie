
import FavoritesPage from "../components/FavoritesPage/FavoritesPage";
import Login from "../components/Login";
import Blogs from "../components/pages/Blogs/Blogs";
import Category from "../components/pages/Category/Category";
import HomePage from "../components/pages/HomePage/HomePage";
import Profile from "../components/pages/Profile/Profile";
export const privateRouters = [
  { path: "/", component: HomePage },
  { path: "/login", component: Login, layout: null },
  { path: "/category", component: Category },
  { path: "/blogs", component: Blogs },
  { path: "/favorites", component: FavoritesPage },
  { path: "/profile", component: Profile },
];
