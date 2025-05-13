"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaFilter } from "react-icons/fa"

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [customersPerPage] = useState(10)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  })

  useEffect(() => {
    // Mô phỏng dữ liệu khách hàng
    const mockCustomers = [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0987654321",
        address: "123 Nguyễn Trãi, Hà Đông, Hà Nội",
        status: "active",
        totalOrders: 5,
        totalSpent: 15000000,
        lastOrder: "2023-03-15T08:30:00Z",
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0912345678",
        address: "456 Lê Văn Lương, Quận 7, TP. Hồ Chí Minh",
        status: "active",
        totalOrders: 3,
        totalSpent: 8500000,
        lastOrder: "2023-03-10T14:20:00Z",
      },
      {
        id: 3,
        name: "Lê Văn C",
        email: "levanc@example.com",
        phone: "0978123456",
        address: "789 Nguyễn Huệ, Hải Châu, Đà Nẵng",
        status: "inactive",
        totalOrders: 1,
        totalSpent: 3300000,
        lastOrder: "2023-02-20T10:45:00Z",
      },
      {
        id: 4,
        name: "Phạm Thị D",
        email: "phamthid@example.com",
        phone: "0965432109",
        address: "101 Trần Phú, Ngô Quyền, Hải Phòng",
        status: "active",
        totalOrders: 2,
        totalSpent: 6600000,
        lastOrder: "2023-03-05T16:30:00Z",
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        email: "hoangvane@example.com",
        phone: "0932109876",
        address: "202 Lê Lợi, Ninh Kiều, Cần Thơ",
        status: "blocked",
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: null,
      },
      {
        id: 6,
        name: "Đỗ Thị F",
        email: "dothif@example.com",
        phone: "0901234567",
        address: "303 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
        status: "active",
        totalOrders: 4,
        totalSpent: 12000000,
        lastOrder: "2023-03-12T09:15:00Z",
      },
      {
        id: 7,
        name: "Vũ Văn G",
        email: "vuvang@example.com",
        phone: "0912345678",
        address: "404 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
        status: "active",
        totalOrders: 2,
        totalSpent: 5500000,
        lastOrder: "2023-03-08T11:30:00Z",
      },
      {
        id: 8,
        name: "Ngô Thị H",
        email: "ngothih@example.com",
        phone: "0987654321",
        address: "505 Phan Chu Trinh, Hải Châu, Đà Nẵng",
        status: "inactive",
        totalOrders: 1,
        totalSpent: 2800000,
        lastOrder: "2023-02-15T13:45:00Z",
      },
      {
        id: 9,
        name: "Đinh Văn I",
        email: "dinhvani@example.com",
        phone: "0965432109",
        address: "606 Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh",
        status: "active",
        totalOrders: 3,
        totalSpent: 9200000,
        lastOrder: "2023-03-14T10:20:00Z",
      },
      {
        id: 10,
        name: "Lý Thị K",
        email: "lythik@example.com",
        phone: "0932109876",
        address: "707 Lê Duẩn, Thanh Khê, Đà Nẵng",
        status: "active",
        totalOrders: 2,
        totalSpent: 7100000,
        lastOrder: "2023-03-07T15:10:00Z",
      },
    ]

    setCustomers(mockCustomers)
    setFilteredCustomers(mockCustomers)
  }, [])

  useEffect(() => {
    // Lọc khách hàng dựa trên từ khóa tìm kiếm và trạng thái
    let results = customers

    if (searchTerm) {
      results = results.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm),
      )
    }

    if (selectedStatus !== "all") {
      results = results.filter((customer) => customer.status === selectedStatus)
    }

    setFilteredCustomers(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [searchTerm, selectedStatus, customers])

  // Tính toán khách hàng hiển thị trên trang hiện tại
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa có đơn hàng"
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active"
      case "inactive":
        return "status-inactive"
      case "blocked":
        return "status-blocked"
      default:
        return ""
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Hoạt động"
      case "inactive":
        return "Không hoạt động"
      case "blocked":
        return "Đã khóa"
      default:
        return status
    }
  }

  const handleAddCustomer = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active",
    })
    setIsAddModalOpen(true)
  }

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteCustomer = (customer) => {
    setCurrentCustomer(customer)
    setIsDeleteModalOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmitAdd = (e) => {
    e.preventDefault()

    const newCustomer = {
      id: customers.length + 1,
      ...formData,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: null,
    }

    setCustomers([...customers, newCustomer])
    setIsAddModalOpen(false)
    alert("Thêm khách hàng thành công!")
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()

    const updatedCustomers = customers.map((customer) => {
      if (customer.id === currentCustomer.id) {
        return {
          ...customer,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          status: formData.status,
        }
      }
      return customer
    })

    setCustomers(updatedCustomers)
    setIsEditModalOpen(false)
    alert("Cập nhật thông tin khách hàng thành công!")
  }

  const handleConfirmDelete = () => {
    const updatedCustomers = customers.filter((customer) => customer.id !== currentCustomer.id)
    setCustomers(updatedCustomers)
    setIsDeleteModalOpen(false)
    alert("Xóa khách hàng thành công!")
  }

  return (
    <div className="admin-customers">
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý khách hàng</h1>
          <button className="add-customer-btn" onClick={handleAddCustomer}>
            <FaUserPlus /> Thêm khách hàng
          </button>
        </div>

        <div className="filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="status-filter">
            <FaFilter className="filter-icon" />
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="blocked">Đã khóa</option>
            </select>
          </div>
        </div>

        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Đơn hàng</th>
                <th>Tổng chi tiêu</th>
                <th>Đơn hàng gần nhất</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="no-data">
                    Không tìm thấy khách hàng nào
                  </td>
                </tr>
              ) : (
                currentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.totalOrders}</td>
                    <td>{formatPrice(customer.totalSpent)}</td>
                    <td>{formatDate(customer.lastOrder)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(customer.status)}`}>
                        {getStatusText(customer.status)}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEditCustomer(customer)} title="Chỉnh sửa">
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteCustomer(customer)} title="Xóa">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {filteredCustomers.length > customersPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }, (_, i) => (
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

        {/* Modal thêm khách hàng */}
        {isAddModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Thêm khách hàng mới</h2>
                <button className="close-button" onClick={() => setIsAddModalOpen(false)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmitAdd}>
                <div className="form-group">
                  <label htmlFor="name">Họ tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Trạng thái</label>
                  <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="blocked">Đã khóa</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={() => setIsAddModalOpen(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="submit-button">
                    Thêm khách hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal chỉnh sửa khách hàng */}
        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Chỉnh sửa thông tin khách hàng</h2>
                <button className="close-button" onClick={() => setIsEditModalOpen(false)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmitEdit}>
                <div className="form-group">
                  <label htmlFor="edit-name">Họ tên</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-email">Email</label>
                  <input
                    type="email"
                    id="edit-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="edit-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-address">Địa chỉ</label>
                  <textarea
                    id="edit-address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="edit-status">Trạng thái</label>
                  <select id="edit-status" name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="blocked">Đã khóa</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={() => setIsEditModalOpen(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="submit-button">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal xác nhận xóa khách hàng */}
        {isDeleteModalOpen && (
          <div className="modal">
            <div className="modal-content delete-modal">
              <div className="modal-header">
                <h2>Xác nhận xóa</h2>
                <button className="close-button" onClick={() => setIsDeleteModalOpen(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Bạn có chắc chắn muốn xóa khách hàng <strong>{currentCustomer?.name}</strong>?
                </p>
                <p className="warning">Lưu ý: Hành động này không thể hoàn tác.</p>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsDeleteModalOpen(false)}>
                  Hủy
                </button>
                <button type="button" className="delete-button" onClick={handleConfirmDelete}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Customers)
