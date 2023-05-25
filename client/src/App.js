import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Products from "./Pages/Products/Products";
import "./App.scss"
import AboutPage from "./Pages/About/AboutPage";
import WishlistPage from "./Pages/Whishlist/Whishlist";
import Success from "./Pages/Success/Success";


const Layout = () =>{
  return(
    <div className='app'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products/:id",
        element: <Products />
      },
      {
        path: "/product/:id",
        element: <Product />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/wishlist",
        element: <WishlistPage />
      }
    ]
  },
  {
    path: "/success",
    element: <Success />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
