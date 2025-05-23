"use client"

import { memo, useEffect } from "react"
import "./style.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ROUTERS } from "utils/router"
import { formatPrice } from "utils/formatter"

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, total } = location.state || {}

  useEffect(() => {
    window.scrollTo(0, 0)

    // Nếu không có thông tin đơn hàng, chuyển hướng về trang chủ
    if (!orderId) {
      navigate(ROUTERS.USER.HOME)
    }
  }, [orderId, navigate])

  if (!orderId) {
    return null
  }

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>ĐẶT HÀNG THÀNH CÔNG</h1>
          <p className="thank-you-message">Cảm ơn bạn đã đặt hàng tại Phong Nhí</p>

          <div className="order-info">
            <div className="info-row">
              <span>Mã đơn hàng:</span>
              <span>#{orderId}</span>
            </div>
            <div className="info-row">
              <span>Tổng tiền thanh toán:</span>
              <span className="price">{formatPrice(total || 0)}</span>
            </div>
          </div>

          <div className="support-info">
            <p>Để được hỗ trợ vui lòng gọi vào hotline</p>
            <a href="tel:0123456789" className="hotline">
              0123456789
            </a>
          </div>

          <div className="action-buttons">
            <Link to={ROUTERS.USER.HOME} className="home-button">
              Quay về trang chủ
            </Link>
            <Link to={ROUTERS.USER.SHOP} className="shop-button">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(OrderSuccess)

