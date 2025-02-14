import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Categories,
  CreateCategory,
  // CreateOrder,
  CreateProduct,
  // CreateReview,
  // CreateUser,
  EditCategory,
  // EditOrder,
  EditProduct,
  // EditReview,
  // EditUser,
  // HelpDesk,
  HomeLayout,
  Landing,
  LandingV2,
  Login,
  Notifications,
  // Orders,
  Products,
  Profile,
  Register,
  // Reviews,
  // Users,
} from "./pages";
import { ProductProvider } from "./context/ProductContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/landing-v2",
        element: <LandingV2 />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/products/:id",
        element: <EditProduct />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/create-category",
        element: <CreateCategory />,
      },
      {
        path: "/categories/:id",
        element: <EditCategory />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {

    
  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;
