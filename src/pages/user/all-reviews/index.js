"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { useParams, Link } from "react-router-dom"
import { FaThumbsUp, FaThumbsDown, FaFilter, FaSearch } from "react-icons/fa"

const AllReviews = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [ratingFilter, setRatingFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewsPerPage] = useState(5)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu chi tiết sản phẩm
    const mockProduct = {
      id: Number.parseInt(id),
      name: "AIR FORCE 1",
      price: 3300000,
      image: "/placeholder.svg?height=100&width=100",
      code: "CW2288111",
      rating: 4.9,
      reviewCount: 4444,
    }

    // Mô phỏng dữ liệu đánh giá
    const mockReviews = [
      {
        id: 1,
        productId: id,
        userName: "Nguyễn Minh Hải",
        rating: 5,
        text: "Sản phẩm rất tốt, đẹp đúng hệ, nếu có mua lần sau",
        date: "2023-03-15T08:30:00Z",
        likes: 12,
        dislikes: 2,
        images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
      {
        id: 2,
        productId: id,
        userName: "TeoTeo",
        rating: 5,
        text: "Sản phẩm rất tốt, đẹp đúng hệ, nếu có mua lần sau",
        date: "2023-03-14T14:20:00Z",
        likes: 8,
        dislikes: 1,
        images: [],
      },
      {
        id: 3,
        productId: id,
        userName: "Lê Văn Minh",
        rating: 4,
        text: "Giày đẹp, form vừa, đóng gói cẩn thận. Giao hàng hơi chậm một chút nhưng vẫn ok.",
        date: "2023-03-10T10:45:00Z",
        likes: 5,
        dislikes: 0,
        images: ["/placeholder.svg?height=100&width=100"],
      },
      {
        id: 4,
        productId: id,
        userName: "Phạm Thị Hương",
        rating: 5,
        text: "Mình mua cho con trai, cháu rất thích. Giày đẹp, chất lượng tốt, đúng size.",
        date: "2023-03-05T16:30:00Z",
        likes: 10,
        dislikes: 1,
        images: [],
      },
      {
        id: 5,
        productId: id,
        userName: "Hoàng Văn Nam",
        rating: 3,
        text: "Giày ok nhưng hơi chật so với size thông thường mình hay đi. Nên đặt tăng 0.5 size.",
        date: "2023-02-28T09:10:00Z",
        likes: 15,
        dislikes: 3,
        images: [
          "/placeholder.svg?height=100&width=100",
          "/placeholder.svg?height=100&width=100",
          "/placeholder.svg?height=100&width=100",
        ],
      },
      {
        id: 6,
        productId: id,
        userName: "Trần Quốc Bảo",
        rating: 5,
        text: "Đây là đôi giày thứ 3 mình mua ở shop, rất ưng ý về chất lượng và dịch vụ.",
        date: "2023-02-20T11:25:00Z",
        likes: 7,
        dislikes: 0,
        images: [],
      },
      {
        id: 7,
        productId: id,
        userName: "Nguyễn Thị Mai",
        rating: 4,
        text: "Giày đẹp, nhưng màu sắc hơi khác một chút so với hình. Nhưng vẫn ổn.",
        date: "2023-02-15T13:40:00Z",
        likes: 4,
        dislikes: 1,
        images: ["/placeholder.svg?height=100&width=100"],
      },
      {
        id: 8,
        productId: id,
        userName: "Đỗ Văn Hùng",
        rating: 5,
        text: "Mua làm quà tặng bạn, bạn rất thích. Sẽ ủng hộ shop dài dài.",
        date: "2023-02-10T10:15:00Z",
        likes: 9,
        dislikes: 0,
        images: [],
      },
      {
        id: 9,
        productId: id,
        userName: "Vũ Thị Hà",
        rating: 2,
        text: "Hơi thất vọng vì giày bị lỗi nhỏ ở phần đế. Shop phản hồi chậm.",
        date: "2023-02-05T15:50:00Z",
        likes: 3,
        dislikes: 5,
        images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
      {
        id: 10,
        productId: id,
        userName: "Lý Văn Tùng",
        rating: 5,
        text: "Giày chuẩn auth, đẹp xuất sắc. Sẽ giới thiệu cho bạn bè.",
        date: "2023-01-30T09:30:00Z",
        likes: 20,
        dislikes: 1,
        images: ["/placeholder.svg?height=100&width=100"],
      },
    ]

    // Kiểm tra xem có đánh giá nào trong localStorage không
    const savedReviews = JSON.parse(localStorage.getItem("productReviews") || "{}")
    const userReviews = savedReviews[id] || []

    // Kết hợp đánh giá mẫu với đánh giá của người dùng
    const allReviews = [...userReviews, ...mockReviews]

    setProduct(mockProduct)
    setReviews(allReviews)
    setFilteredReviews(allReviews)
  }, [id])

  useEffect(() => {
    // Lọc và sắp xếp đánh giá
    let filtered = [...reviews]

    // Lọc theo rating
    if (ratingFilter !== "all") {
      filtered = filtered.filter((review) => review.rating === Number.parseInt(ratingFilter))
    }

    // Lọc theo từ khóa
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.userName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sắp xếp
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating)
        break
      case "mostLiked":
        filtered.sort((a, b) => b.likes - a.likes)
        break
      default:
        break
    }

    setFilteredReviews(filtered)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [reviews, ratingFilter, searchTerm, sortBy])

  // Tính toán đánh giá hiển thị trên trang hiện tại
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview)

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`star ${i < Math.floor(rating) ? "filled" : ""}`}>
          ★
        </span>
      ))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleLikeReview = (reviewId) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return { ...review, likes: review.likes + 1 }
      }
      return review
    })

    setReviews(updatedReviews)
  }

  const handleDislikeReview = (reviewId) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return { ...review, dislikes: review.dislikes + 1 }
      }
      return review
    })

    setReviews(updatedReviews)
  }

  if (!product) {
    return <div className="loading">Đang tải...</div>
  }

  return (
    <div className="all-reviews-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to={`/san-pham/${id}`}>{product.name}</Link> &gt;{" "}
          <span>Tất cả đánh giá</span>
        </div>

        <div className="reviews-container">
          <div className="reviews-header">
            <div className="product-info">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>
              <div className="product-details">
                <h1>{product.name}</h1>
                <div className="product-rating">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="rating-value">{product.rating}</span>
                  <span className="review-count">({filteredReviews.length} đánh giá)</span>
                </div>
              </div>
            </div>

            <Link to={`/danh-gia/${id}`} className="write-review-btn">
              <span>+</span> Viết đánh giá
            </Link>
          </div>

          <div className="filter-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm trong đánh giá..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-options">
              <div className="rating-filter">
                <FaFilter className="filter-icon" />
                <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                  <option value="all">Tất cả sao</option>
                  <option value="5">5 Sao</option>
                  <option value="4">4 Sao</option>
                  <option value="3">3 Sao</option>
                  <option value="2">2 Sao</option>
                  <option value="1">1 Sao</option>
                </select>
              </div>

              <div className="sort-options">
                <span>Sắp xếp theo:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="highest">Đánh giá cao nhất</option>
                  <option value="lowest">Đánh giá thấp nhất</option>
                  <option value="mostLiked">Hữu ích nhất</option>
                </select>
              </div>
            </div>
          </div>

          <div className="reviews-list">
            {currentReviews.length === 0 ? (
              <div className="no-reviews">
                <p>Không tìm thấy đánh giá nào phù hợp với bộ lọc.</p>
              </div>
            ) : (
              currentReviews.map((review) => (
                <div className="review-item" key={review.id}>
                  <div className="reviewer-info">
                    <div className="reviewer-name">{review.userName}</div>
                    <div className="review-date">{formatDate(review.date)}</div>
                  </div>

                  <div className="review-content">
                    <div className="review-rating">{renderStars(review.rating)}</div>
                    <p className="review-text">{review.text}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="review-images">
                        {review.images.map((image, index) => (
                          <div className="review-image" key={index}>
                            <img src={image || "/placeholder.svg"} alt={`Ảnh đánh giá ${index + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="review-actions">
                      <button className="like-button" onClick={() => handleLikeReview(review.id)}>
                        <FaThumbsUp /> <span>{review.likes}</span>
                      </button>
                      <button className="dislike-button" onClick={() => handleDislikeReview(review.id)}>
                        <FaThumbsDown /> <span>{review.dislikes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Phân trang */}
          {filteredReviews.length > reviewsPerPage && (
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredReviews.length / reviewsPerPage) }, (_, i) => (
                <button
                  key={i}
                  className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(AllReviews)
