import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import initialTransactions from '../../Data/transactions' 
import { useNavigate } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

function Dashboard() {
  const navigate = useNavigate()
  const storedUser = JSON.parse(localStorage.getItem("user"))

  const [transactions] = useState(initialTransactions)

  const [filters, setFilters] = useState({
    type: "all",
    category: "all"
  })

  const [role, setRole] = useState("viewer")

  // 🌙 Theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  )

  // Apply theme
  useEffect(() => {
    document.body.className = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      navigate("/")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate("/")
  }

  const handleAddTransaction = () => {
    alert("Admin can add transactions here")
  }

  const handleEditTransaction = (title) => {
    alert(`Admin can edit ${title}`)
  }

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const categories = ["all", ...new Set(transactions.map((item) => item.category))]

  const filteredTransactions = transactions.filter((item) => {
    const typeMatch = filters.type === "all" || item.type === filters.type
    const categoryMatch =
      filters.category === "all" || item.category === filters.category

    return typeMatch && categoryMatch
  })

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0)

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  const expenseTransactions = transactions.filter((item) => item.type === "expense")

  const categoryTotals = {}

  expenseTransactions.forEach((item) => {
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] += item.amount
    } else {
      categoryTotals[item.category] = item.amount
    }
  })

  let topCategory = ""
  let topAmount = 0

  for (let category in categoryTotals) {
    if (categoryTotals[category] > topAmount) {
      topAmount = categoryTotals[category]
      topCategory = category
    }
  }

  const lineChartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpenses },
    { name: "Balance", amount: totalBalance }
  ]

  const pieChartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category]
  }))

  const COLORS = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0']

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Finance Dashboard</h1>
          <p className="welcome-text">Welcome, {storedUser?.name || "User"}</p>
          <p className="role-text">
            Current Role: <span>{role}</span>
          </p>
        </div>

        <div className="header-actions">

          {/* 🌙 Theme Toggle */}
          <button
            className="theme-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Balance</h3>
          <p>₹{totalBalance}</p>
        </div>

        <div className="card">
          <h3>Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card">
          <h3>Expenses</h3>
          <p>₹{totalExpenses}</p>
        </div>
      </div>

      <div className="filters-section">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>

        {role === "admin" && (
          <button className="add-btn" onClick={handleAddTransaction}>
            + Add Transaction
          </button>
        )}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h2>Financial Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4cafef" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Expense Categories</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bottom-section">
        <div className="transactions-card">
          <div className="section-title-row">
            <h2>Recent Transactions</h2>
          </div>

          {filteredTransactions.length > 0 ? (
            <table className="transactions-table">
              <tbody>
                {filteredTransactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.type}</td>
                    <td>₹{item.amount}</td>

                    {role === "admin" && (
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditTransaction(item.title)}
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found</p>
          )}
        </div>

        <div className="insights-card">
          <h2>Insights</h2>

          <div className="insight-box">
            <h4>Top Category</h4>
            <p>{topCategory}</p>
          </div>

          <div className="insight-box">
            <h4>Top Amount</h4>
            <p>₹{topAmount}</p>
          </div>

          <div className="insight-box">
            <h4>Net Savings</h4>
            <p>₹{totalBalance}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard