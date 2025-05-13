"use client"

import { memo, useState, useEffect, useRef } from "react"
import "./style.scss"
import { FaCalendarAlt, FaChartLine, FaChartPie, FaChartBar, FaDownload, FaFilter } from "react-icons/fa"
import { formatPrice } from "utils/formatter"
import Chart from "chart.js/auto"

const Statistics = () => {
  const [dateRange, setDateRange] = useState("month")
  const [filterOpen, setFilterOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [activeTab, setActiveTab] = useState("revenue")

  const revenueChartRef = useRef(null)
  const revenueChart = useRef(null)
  const ordersChartRef = useRef(null)
  const ordersChart = useRef(null)
  const productsChartRef = useRef(null)
  const productsChart = useRef(null)
  const customersChartRef = useRef(null)
  const customersChart = useRef(null)

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    totalCustomers: 0,
    returningCustomers: 0,
    topSellingProducts: [],
    revenueByCategory: [],
    revenueByDate: [],
    ordersByStatus: [],
    customersByAge: [],
    customersByGender: [],
  })

  // Hàm để tạo dữ liệu mẫu dựa trên khoảng thời gian
  const generateMockData = (range) => {
    // Dữ liệu doanh thu theo ngày/tháng/năm
    let revenueByDate = []
    let labels = []

    if (range === "week") {
      labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
      revenueByDate = [4500000, 3200000, 5100000, 4800000, 6700000, 8200000, 5600000]
    } else if (range === "month") {
      labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
      revenueByDate = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10000000) + 1000000)
    } else if (range === "year") {
      labels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
      revenueByDate = [
        45000000, 52000000, 48000000, 61000000, 55000000, 67000000, 72000000, 68000000, 74000000, 82000000, 91000000,
        105000000,
      ]
    } else if (range === "custom") {
      // Dữ liệu tùy chỉnh sẽ được xử lý khi người dùng chọn khoảng thời gian
      labels = ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5"]
      revenueByDate = [5200000, 4800000, 6100000, 5500000, 7200000]
    }

    // Tính tổng doanh thu
    const totalRevenue = revenueByDate.reduce((sum, value) => sum + value, 0)

    // Dữ liệu đơn hàng theo trạng thái
    const ordersByStatus = [
      { status: "Hoàn thành", count: Math.floor(Math.random() * 100) + 50 },
      { status: "Đang xử lý", count: Math.floor(Math.random() * 50) + 20 },
      { status: "Chờ xác nhận", count: Math.floor(Math.random() * 30) + 10 },
      { status: "Đã hủy", count: Math.floor(Math.random() * 20) + 5 },
    ]

    // Tính tổng đơn hàng
    const totalOrders = ordersByStatus.reduce((sum, item) => sum + item.count, 0)

    // Dữ liệu doanh thu theo danh mục
    const revenueByCategory = [
      { category: "Giày thể thao", revenue: Math.floor(Math.random() * 50000000) + 20000000 },
      { category: "Giày chạy bộ", revenue: Math.floor(Math.random() * 40000000) + 15000000 },
      { category: "Giày thời trang", revenue: Math.floor(Math.random() * 30000000) + 10000000 },
      { category: "Giày bóng rổ", revenue: Math.floor(Math.random() * 25000000) + 8000000 },
      { category: "Phụ kiện", revenue: Math.floor(Math.random() * 15000000) + 5000000 },
    ]

    // Dữ liệu sản phẩm bán chạy
    const topSellingProducts = [
      { name: "AIR FORCE 1", sold: 125, revenue: 412500000, image: "/placeholder.svg?height=60&width=120" },
      { name: "NIKE PEGASUS TRAIL 4", sold: 98, revenue: 352800000, image: "/placeholder.svg?height=60&width=120" },
      {
        name: "ADIDAS GRADAS CLOUD WHITE",
        sold: 87,
        revenue: 313200000,
        image: "/placeholder.svg?height=60&width=120",
      },
      { name: "PUMA SLIPSTREAM GREEN", sold: 76, revenue: 212800000, image: "/placeholder.svg?height=60&width=120" },
      { name: "AIR FORCE 2", sold: 65, revenue: 214500000, image: "/placeholder.svg?height=60&width=120" },
    ]

    // Dữ liệu khách hàng theo độ tuổi
    const customersByAge = [
      { ageGroup: "18-24", count: Math.floor(Math.random() * 100) + 50 },
      { ageGroup: "25-34", count: Math.floor(Math.random() * 150) + 100 },
      { ageGroup: "35-44", count: Math.floor(Math.random() * 100) + 50 },
      { ageGroup: "45-54", count: Math.floor(Math.random() * 50) + 20 },
      { ageGroup: "55+", count: Math.floor(Math.random() * 30) + 10 },
    ]

    // Dữ liệu khách hàng theo giới tính
    const customersByGender = [
      { gender: "Nam", count: Math.floor(Math.random() * 200) + 150 },
      { gender: "Nữ", count: Math.floor(Math.random() * 150) + 100 },
      { gender: "Khác", count: Math.floor(Math.random() * 20) + 5 },
    ]

    // Tính tổng khách hàng
    const totalCustomers = customersByAge.reduce((sum, item) => sum + item.count, 0)

    // Tính số khách hàng quay lại
    const returningCustomers = Math.floor(totalCustomers * 0.4)

    // Tính giá trị đơn hàng trung bình
    const averageOrderValue = Math.floor(totalRevenue / totalOrders)

    // Tính tỷ lệ chuyển đổi (giả định)
    const conversionRate = Math.floor(Math.random() * 10) + 5

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      conversionRate,
      totalCustomers,
      returningCustomers,
      topSellingProducts,
      revenueByCategory,
      revenueByDate,
      labels,
      ordersByStatus,
      customersByAge,
      customersByGender,
    }
  }

  // Cập nhật dữ liệu khi thay đổi khoảng thời gian
  useEffect(() => {
    const data = generateMockData(dateRange)
    setStats(data)
  }, [dateRange])

  // Khởi tạo và cập nhật biểu đồ doanh thu
  useEffect(() => {
    if (revenueChartRef.current) {
      if (revenueChart.current) {
        revenueChart.current.destroy()
      }

      const ctx = revenueChartRef.current.getContext("2d")
      revenueChart.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: stats.labels,
          datasets: [
            {
              label: "Doanh thu",
              data: stats.revenueByDate,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => formatPrice(context.parsed.y),
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => formatPrice(value),
              },
            },
          },
        },
      })
    }
  }, [stats.revenueByDate, stats.labels])

  // Khởi tạo và cập nhật biểu đồ đơn hàng
  useEffect(() => {
    if (ordersChartRef.current) {
      if (ordersChart.current) {
        ordersChart.current.destroy()
      }

      const ctx = ordersChartRef.current.getContext("2d")
      ordersChart.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: stats.ordersByStatus.map((item) => item.status),
          datasets: [
            {
              data: stats.ordersByStatus.map((item) => item.count),
              backgroundColor: [
                "rgba(75, 192, 192, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 99, 132, 0.7)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      })
    }
  }, [stats.ordersByStatus])

  // Khởi tạo và cập nhật biểu đồ sản phẩm
  useEffect(() => {
    if (productsChartRef.current) {
      if (productsChart.current) {
        productsChart.current.destroy()
      }

      const ctx = productsChartRef.current.getContext("2d")
      productsChart.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: stats.revenueByCategory.map((item) => item.category),
          datasets: [
            {
              label: "Doanh thu",
              data: stats.revenueByCategory.map((item) => item.revenue),
              backgroundColor: "rgba(153, 102, 255, 0.7)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => formatPrice(context.parsed.y),
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => formatPrice(value),
              },
            },
          },
        },
      })
    }
  }, [stats.revenueByCategory])

  // Khởi tạo và cập nhật biểu đồ khách hàng
  useEffect(() => {
    if (customersChartRef.current) {
      if (customersChart.current) {
        customersChart.current.destroy()
      }

      const ctx = customersChartRef.current.getContext("2d")
      customersChart.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: stats.customersByGender.map((item) => item.gender),
          datasets: [
            {
              data: stats.customersByGender.map((item) => item.count),
              backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(255, 206, 86, 0.7)"],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      })
    }
  }, [stats.customersByGender])

  // Xử lý khi thay đổi khoảng thời gian
  const handleDateRangeChange = (range) => {
    setDateRange(range)
    if (range !== "custom") {
      setFilterOpen(false)
    } else {
      setFilterOpen(true)
    }
  }

  // Xử lý khi áp dụng bộ lọc tùy chỉnh
  const handleApplyFilter = () => {
    // Trong thực tế, sẽ gọi API với startDate và endDate
    console.log("Áp dụng bộ lọc từ", startDate, "đến", endDate)
    setFilterOpen(false)
  }

  // Xử lý khi xuất báo cáo
  const handleExportReport = (format) => {
    console.log(`Xuất báo cáo dạng ${format}`)
    // Trong thực tế, sẽ tạo và tải xuống file báo cáo
    alert(`Đã xuất báo cáo dạng ${format}`)
  }

  return (
    <div className="admin-statistics">
      <div className="admin-content">
        <div className="admin-header">
          <h1>Thống kê</h1>
          <div className="header-actions">
            <div className="date-range-selector">
              <div className="date-range-icon">
                <FaCalendarAlt />
              </div>
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="date-range-select"
              >
                <option value="week">7 ngày qua</option>
                <option value="month">30 ngày qua</option>
                <option value="year">12 tháng qua</option>
                <option value="custom">Tùy chỉnh</option>
              </select>
            </div>
            <div className="export-dropdown">
              <button className="export-btn">
                <FaDownload /> Xuất báo cáo
              </button>
              <div className="export-dropdown-content">
                <button onClick={() => handleExportReport("pdf")}>PDF</button>
                <button onClick={() => handleExportReport("excel")}>Excel</button>
                <button onClick={() => handleExportReport("csv")}>CSV</button>
              </div>
            </div>
          </div>
        </div>

        {filterOpen && (
          <div className="custom-filter">
            <div className="filter-header">
              <h3>
                <FaFilter /> Bộ lọc tùy chỉnh
              </h3>
            </div>
            <div className="filter-body">
              <div className="filter-row">
                <div className="filter-field">
                  <label>Từ ngày:</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="filter-field">
                  <label>Đến ngày:</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="filter-actions">
                <button className="apply-btn" onClick={handleApplyFilter}>
                  Áp dụng
                </button>
                <button className="cancel-btn" onClick={() => setFilterOpen(false)}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="stats-summary">
          <div className="summary-card">
            <div className="summary-icon revenue-icon">
              <FaChartLine />
            </div>
            <div className="summary-content">
              <h3>Tổng doanh thu</h3>
              <p>{formatPrice(stats.totalRevenue)}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon orders-icon">
              <FaChartPie />
            </div>
            <div className="summary-content">
              <h3>Tổng đơn hàng</h3>
              <p>{stats.totalOrders}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon avg-icon">
              <FaChartBar />
            </div>
            <div className="summary-content">
              <h3>Giá trị đơn hàng TB</h3>
              <p>{formatPrice(stats.averageOrderValue)}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon conversion-icon">
              <FaChartLine />
            </div>
            <div className="summary-content">
              <h3>Tỷ lệ chuyển đổi</h3>
              <p>{stats.conversionRate}%</p>
            </div>
          </div>
        </div>

        <div className="stats-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "revenue" ? "active" : ""}`}
              onClick={() => setActiveTab("revenue")}
            >
              Doanh thu
            </button>
            <button
              className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Đơn hàng
            </button>
            <button
              className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              Sản phẩm
            </button>
            <button
              className={`tab-btn ${activeTab === "customers" ? "active" : ""}`}
              onClick={() => setActiveTab("customers")}
            >
              Khách hàng
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "revenue" && (
              <div className="tab-pane">
                <div className="chart-container">
                  <h3>Biểu đồ doanh thu</h3>
                  <div className="chart-wrapper">
                    <canvas ref={revenueChartRef}></canvas>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="tab-pane">
                <div className="chart-container">
                  <h3>Đơn hàng theo trạng thái</h3>
                  <div className="chart-wrapper">
                    <canvas ref={ordersChartRef}></canvas>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="tab-pane">
                <div className="chart-container">
                  <h3>Doanh thu theo danh mục</h3>
                  <div className="chart-wrapper">
                    <canvas ref={productsChartRef}></canvas>
                  </div>
                </div>

                <div className="top-products">
                  <h3>Sản phẩm bán chạy</h3>
                  <div className="products-table-container">
                    <table className="products-table">
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Đã bán</th>
                          <th>Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.topSellingProducts.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <div className="product-info">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="product-thumbnail"
                                />
                                <span className="product-name">{product.name}</span>
                              </div>
                            </td>
                            <td>{product.sold}</td>
                            <td>{formatPrice(product.revenue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "customers" && (
              <div className="tab-pane">
                <div className="customers-stats">
                  <div className="customers-summary">
                    <div className="customer-stat-card">
                      <h3>Tổng số khách hàng</h3>
                      <p>{stats.totalCustomers}</p>
                    </div>
                    <div className="customer-stat-card">
                      <h3>Khách hàng quay lại</h3>
                      <p>{stats.returningCustomers}</p>
                      <span className="percentage">
                        ({Math.round((stats.returningCustomers / stats.totalCustomers) * 100)}%)
                      </span>
                    </div>
                  </div>

                  <div className="chart-container">
                    <h3>Khách hàng theo giới tính</h3>
                    <div className="chart-wrapper">
                      <canvas ref={customersChartRef}></canvas>
                    </div>
                  </div>

                  <div className="age-distribution">
                    <h3>Phân bố độ tuổi</h3>
                    <div className="age-bars">
                      {stats.customersByAge.map((item, index) => (
                        <div className="age-bar-container" key={index}>
                          <div className="age-label">{item.ageGroup}</div>
                          <div className="age-bar-wrapper">
                            <div
                              className="age-bar"
                              style={{
                                width: `${(item.count / Math.max(...stats.customersByAge.map((i) => i.count))) * 100}%`,
                              }}
                            ></div>
                            <span className="age-count">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Statistics)
