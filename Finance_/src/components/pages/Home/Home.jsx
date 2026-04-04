import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      
      <div className="home-card">
        <h1>Finance Dashboard</h1>
        <p className="subtitle">
          Track your income, expenses, and savings in one place
        </p>

        <div className="features">
          <div className="feature-box">
            <h3>💰 Income Tracking</h3>
            <p>Monitor your monthly earnings and sources of income.</p>
          </div>

          <div className="feature-box">
            <h3>📊 Expense Analysis</h3>
            <p>Analyze your spending across categories like food, rent, travel.</p>
          </div>

          <div className="feature-box">
            <h3>📈 Visual Reports</h3>
            <p>View charts and graphs for better financial insights.</p>
          </div>

          <div className="feature-box">
            <h3>🎯 Budget Planning</h3>
            <p>Set goals and manage your budget effectively.</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home