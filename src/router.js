import { Route, Routes, useLocation } from "react-router-dom"
import { ADMIN_PATH, ROUTERS } from "./utils/router"
import HomePage from "./pages/user/homepage"
import MasterUserLayout from "./pages/user/theme/masterLayout"
import ProductDetail from "pages/user/product-detail"
import Cart from "pages/user/cart"
import OrderSuccess from "pages/user/order-success"
import Checkout from "pages/user/checkout"
import Signin from "pages/user/signin"
import Signup from "pages/user/signup"
import Shop from "pages/user/shop"
import NikeBrand from "pages/user/brand/nike"
import AdidasBrand from "pages/user/brand/adidas"
import JordanBrand from "pages/user/brand/jordan"
import YeezyBrand from "pages/user/brand/yeezy"
import OtherBrands from "pages/user/brand/other"
import Sale from "pages/user/sale"
import Shoelaces from "pages/user/shoelaces"
import Review from "pages/user/review"
import AllReviews from "pages/user/all-reviews"

import MasterAdminLayout from "pages/admin/theme/masterLayout"

import Login from "pages/admin/login"
import Dashboard from "pages/admin/dashboard"
import Products from "pages/admin/products"
import AddProduct from "pages/admin/add-product"
import Orders from "pages/admin/orders"
import Brands from "pages/admin/brands"
import Categories from "pages/admin/categories"
import Customers from"pages/admin/customers"
import Statistics from "pages/admin/statistics"

const renderUserRouter = () => {
  const UserRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.USER.SHOP,
      component: <Shop />,
    },
    {
      path: ROUTERS.USER.SIGNUP,
      component: <Signup />,
    },
    {
      path: ROUTERS.USER.SIGNIN,
      component: <Signin />,
    },
    {
      path: ROUTERS.USER.CHECKOUT,
      component: <Checkout />,
    },
    {
      path: ROUTERS.USER.PRODUCT_DETAIL,
      component: <ProductDetail />,
    },
    {
      path: ROUTERS.USER.CART,
      component: <Cart />,
    },
    {
      path: ROUTERS.USER.ORDER_SUCCESS,
      component: <OrderSuccess />,
    },
    {
      path: "/thuong-hieu/nike",
      component: <NikeBrand />,
    },
    {
      path: "/thuong-hieu/adidas",
      component: <AdidasBrand />,
    },
    {
      path: "/thuong-hieu/jordan",
      component: <JordanBrand />,
    },
    {
      path: "/thuong-hieu/yeezy",
      component: <YeezyBrand />,
    },
    {
      path: "/thuong-hieu/khac",
      component: <OtherBrands />,
    },
    {
      path: "/khuyen-mai",
      component: <Sale />,
    },
    {
      path: "/day-giay",
      component: <Shoelaces />,
    },
    // For user review pages
    {
      path: "/danh-gia/:id",
      component: <Review />,
    },
    {
      path: "/tat-ca-danh-gia/:id",
      component: <AllReviews />,
    },
  ]
  return (
    <MasterUserLayout>
      <Routes>
        {UserRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterUserLayout>
  )
}

const renderAdminRouter = () => {
  const AdminRouters = [
    {
      path: ROUTERS.ADMIN.LOGIN,
      component: <Login />,
    },
    {
      path: ROUTERS.ADMIN.DASHBOARD,
      component: <Dashboard />,
    },
    {
      path: ROUTERS.ADMIN.PRODUCTS,
      component: <Products />,
    },
    {
      path: ROUTERS.ADMIN.ADD_PRODUCT,
      component: <AddProduct />,
    },
    {
      path: ROUTERS.ADMIN.ORDERS,
      component: <Orders />,
    },
    {
      path: ROUTERS.ADMIN.BRANDS,
      component: <Brands />,
    },
    {
      path: ROUTERS.ADMIN.CATEGORIES,
      component: <Categories />,
    },
    {
      path: ROUTERS.ADMIN.CUSTOMERS,
      component: <Customers />,
    },
    {
      path: ROUTERS.ADMIN.STATISTICS,
      component: <Statistics />,
    },
  ]
  return (
    <MasterAdminLayout>
      <Routes>
        {AdminRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterAdminLayout>
  )
}

const RouterCustom = () => {
  const location = useLocation()
  const isAdminRouter = location.pathname.startsWith(ADMIN_PATH)

  return isAdminRouter ? renderAdminRouter() : renderUserRouter()
}

export default RouterCustom
