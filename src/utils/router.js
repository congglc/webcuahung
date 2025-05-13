export const ADMIN_PATH = "/quan-tri"

export const ROUTERS = {
  USER: {
    HOME: "/",
    SHOP: "/cua-hang",
    ABOUT: "/ve-chung-toi",
    CONTACT: "/lien-he",
    SIGNUP: "/dang-ky-tai-khoan",
    SIGNIN: "/dang-nhap",
    CHECKOUT: "/thanh-toan",
    PROFILE: "/thong-tin-ca-nhan",
    PRODUCT_DETAIL: "/san-pham/:id",
    CART: "/gio-hang",
    ORDER_SUCCESS: "/dat-hang-thanh-cong",
    ORDER_HISTORY: "/lich-su-mua-hang",
    REVIEW: "/danh-gia/:id",
    ALL_REVIEWS: "/tat-ca-danh-gia/:id",
  },

  ADMIN: {
    LOGIN: `${ADMIN_PATH}/dang-nhap`,
    DASHBOARD: `${ADMIN_PATH}/dashboard`,
    PRODUCTS: `${ADMIN_PATH}/quan-ly-san-pham`,
    ADD_PRODUCT: `${ADMIN_PATH}/them-san-pham`,
    ORDERS: `${ADMIN_PATH}/don-hang`,
    CUSTOMERS: `${ADMIN_PATH}/khach-hang`,
    CATEGORIES: `${ADMIN_PATH}/danh-muc`,
    BRANDS: `${ADMIN_PATH}/thuong-hieu`,
    STATISTICS: `${ADMIN_PATH}/thong-ke`,
  },
}
