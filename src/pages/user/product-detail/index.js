"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { useParams, Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isInCart, setIsInCart] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [showAddedToCart, setShowAddedToCart] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu chi tiết sản phẩm
    const mockProduct = {
      id: Number.parseInt(id),
      name: "AIR FORCE 1",
      price: 3300000,
      originalPrice: 3800000,
      image: "/placeholder.svg?height=400&width=400",
      images: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
      code: "CW2288111",
      brand: "Nike",
      description:
        "MENDE AIR FORCE 1\nChất liệu: chất dạ mềm mịn, dày\ndễ phối đồ, bắt nên những mảng\nmàu tự đặc biệt cá tính.\nKích cỡ: 1/2/3/4",
      sizes: [41, 42, 43, 44, 45],
      rating: 4.9,
      reviewCount: 4444,
    }

    // Mô phỏng dữ liệu sản phẩm liên quan
    const mockRelatedProducts = [
      {
        id: 101,
        name: "Judgment Shirt",
        price: 280000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4,
      },
      {
        id: 102,
        name: "Doberman Shirt",
        price: 350000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 5,
      },
      {
        id: 103,
        name: "GANGSTA SHIRT",
        price: 275000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4,
      },
      {
        id: 104,
        name: "Siren Shirt",
        price: 320000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 5,
      },
    ]

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const productInCart = cart.find((item) => item.id === Number.parseInt(id))

    setProduct(mockProduct)
    setRelatedProducts(mockRelatedProducts)
    setIsInCart(!!productInCart)
    if (mockProduct.sizes && mockProduct.sizes.length > 0) {
      setSelectedSize(mockProduct.sizes[0])
    }
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  const addToCart = () => {
    if (!product || !selectedSize) return

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = cart.findIndex((item) => item.id === product.id && item.size === selectedSize)

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: quantity,
        code: product.code,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setIsInCart(true)
    setShowAddedToCart(true)

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowAddedToCart(false)
    }, 3000)
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`star ${i < Math.floor(rating) ? "filled" : ""}`}>
          ★
        </span>
      ))
  }

  if (!product) {
    return <div className="loading">Đang tải...</div>
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to={`/san-pham/${id}`}>{product.name}</Link>
        </div>

        <div className="product-detail-container">
          <div className="product-images">
            <div className="main-image">
              <img src={product.image || "/placeholder.svg"} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <div className="thumbnail" key={index}>
                  <img src={img || "/placeholder.svg"} alt={`${product.name} - ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-code">Mã SP: {product.code}</div>

            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">{product.reviewCount} đánh giá</span>
            </div>

            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <div className="product-sizes">
              <div className="size-label">Size Giày:</div>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={addToCart}>
                Thêm vào giỏ
              </button>
              <button className="buy-now-btn">Mua ngay</button>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Mô tả
            </button>
            <button
              className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh giá ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-tab">
                <pre>{product.description}</pre>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab">
                <div className="rating-summary">
                  <div className="average-rating">
                    <div className="rating-number">{product.rating}</div>
                    <div className="rating-stars">{renderStars(product.rating)}</div>
                    <div className="rating-count">{product.reviewCount} đánh giá</div>
                  </div>
                  <div className="rating-bars">
                    <div className="rating-bar">
                      <span className="star-level">5 ★</span>
                      <div className="bar-container">
                        <div className="bar" style={{ width: "99%" }}></div>
                      </div>
                      <span className="percentage">99%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="star-level">4 ★</span>
                      <div className="bar-container">
                        <div className="bar" style={{ width: "1%" }}></div>
                      </div>
                      <span className="percentage">1%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="star-level">3 ★</span>
                      <div className="bar-container">
                        <div className="bar" style={{ width: "0%" }}></div>
                      </div>
                      <span className="percentage">0%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="star-level">2 ★</span>
                      <div className="bar-container">
                        <div className="bar" style={{ width: "0%" }}></div>
                      </div>
                      <span className="percentage">0%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="star-level">1 ★</span>
                      <div className="bar-container">
                        <div className="bar" style={{ width: "0%" }}></div>
                      </div>
                      <span className="percentage">0%</span>
                    </div>
                  </div>
                </div>

                <div className="review-list">
                  <div className="review-item">
                    <div className="reviewer-info">
                      <div className="reviewer-name">Nguyễn Minh Hải</div>
                      <div className="review-rating">{renderStars(5)}</div>
                    </div>
                    <div className="review-content">
                      <p>Sản phẩm rất tốt, đẹp đúng hệ, nếu có mua lần sau</p>
                      <div className="review-actions">
                        <button className="like-button">👍 Hữu ích</button>
                        <button className="dislike-button">👎 Không hữu ích</button>
                      </div>
                    </div>
                  </div>

                  <div className="review-item">
                    <div className="reviewer-info">
                      <div className="reviewer-name">TeoTeo</div>
                      <div className="review-rating">{renderStars(5)}</div>
                    </div>
                    <div className="review-content">
                      <p>Sản phẩm rất tốt, đẹp đúng hệ, nếu có mua lần sau</p>
                      <div className="review-actions">
                        <button className="like-button">👍 Hữu ích</button>
                        <button className="dislike-button">👎 Không hữu ích</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review-actions">
                  <Link to={`/danh-gia/${id}`} className="write-review-btn">
                    <span>+</span> Viết đánh giá
                  </Link>
                  <Link to={`/tat-ca-danh-gia/${id}`} className="view-all-reviews-btn">
                    Xem {product.reviewCount} đánh giá &gt;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="related-products">
          <h2 className="section-title">Có thể bạn sẽ thích</h2>
          <div className="products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div className="product-card" key={relatedProduct.id}>
                <Link to={`/san-pham/${relatedProduct.id}`}>
                  <div className="product-image">
                    <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{relatedProduct.name}</h3>
                    <div className="product-rating">{renderStars(relatedProduct.rating)}</div>
                    <p className="product-price">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddedToCart && (
        <div className="added-to-cart-notification">
          <div className="notification-content">
            <h3>Sản phẩm đã thêm.</h3>
            <p>Sản phẩm {product.name} đã được thêm vào giỏ hàng!</p>
            <Link to="/gio-hang" className="view-cart-btn">
              XEM GIỎ HÀNG
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(ProductDetail)
