"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"

const Review = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(null)
  const [reviewText, setReviewText] = useState("")
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])

  useEffect(() => {
    // Mô phỏng lấy thông tin sản phẩm từ API
    const mockProduct = {
      id: Number.parseInt(id),
      name: "AIR FORCE 1",
      price: 3300000,
      image: "/placeholder.svg?height=100&width=100",
      code: "CW2288111",
    }

    // Lấy thông tin người dùng từ localStorage (nếu đã đăng nhập)
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    if (userInfo.name) {
      setUserName(userInfo.name)
    }

    setProduct(mockProduct)
  }, [id])

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleImageUpload = (e) => {
    e.preventDefault()
    const files = Array.from(e.target.files)

    if (files.length + images.length > 5) {
      setError("Bạn chỉ có thể tải lên tối đa 5 ảnh")
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    // Tạo URL preview cho các ảnh
    const newImageUrls = files.map((file) => URL.createObjectURL(file))
    setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls])

    setError("")
  }

  const removeImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newImageUrls = [...imagePreviewUrls]
    URL.revokeObjectURL(newImageUrls[index]) // Giải phóng URL
    newImageUrls.splice(index, 1)
    setImagePreviewUrls(newImageUrls)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userName.trim()) {
      setError("Vui lòng nhập tên của bạn")
      return
    }

    if (!reviewText.trim()) {
      setError("Vui lòng nhập nội dung đánh giá")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Mô phỏng gửi đánh giá lên server
    setTimeout(() => {
      // Lưu đánh giá vào localStorage để mô phỏng
      const reviews = JSON.parse(localStorage.getItem("productReviews") || "{}")
      const productReviews = reviews[id] || []

      const newReview = {
        id: Date.now(),
        productId: id,
        userName,
        rating,
        text: reviewText,
        date: new Date().toISOString(),
        imageCount: images.length,
      }

      productReviews.unshift(newReview)
      reviews[id] = productReviews
      localStorage.setItem("productReviews", JSON.stringify(reviews))

      setIsSubmitting(false)

      // Chuyển hướng về trang chi tiết sản phẩm
      navigate(`/san-pham/${id}?tab=reviews`)
    }, 1500)
  }

  if (!product) {
    return <div className="loading">Đang tải...</div>
  }

  return (
    <div className="review-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to={`/san-pham/${id}`}>{product.name}</Link> &gt;{" "}
          <span>Viết đánh giá</span>
        </div>

        <div className="review-container">
          <h1>Đánh giá sản phẩm</h1>

          <div className="product-info">
            <div className="product-image">
              <img src={product.image || "/placeholder.svg"} alt={product.name} />
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="product-code">Mã SP: {product.code}</p>
            </div>
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên của bạn</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nhập tên của bạn"
                required
              />
            </div>

            <div className="form-group rating-group">
              <label>Đánh giá của bạn</label>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1

                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRatingChange(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={30}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="form-group">
              <label>Nội dung đánh giá</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>Thêm hình ảnh (tối đa 5 ảnh)</label>
              <div className="image-upload-container">
                <div className="image-upload">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={images.length >= 5}
                  />
                  <label htmlFor="image-upload" className={images.length >= 5 ? "disabled" : ""}>
                    + Thêm ảnh
                  </label>
                </div>

                <div className="image-previews">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="image-preview">
                      <img src={url || "/placeholder.svg"} alt={`Preview ${index}`} />
                      <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => navigate(`/san-pham/${id}`)}>
                Hủy
              </button>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default memo(Review)
