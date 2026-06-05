import React from 'react'
import "./Styles/AdminDashboard.css"
const AdminDashboard = () => {
 const user = JSON.parse(
    localStorage.getItem("user")
  )

  return (
    <section className="admin-dashboard">

      <div className="admin-header">

        <div>
          <h1>
            Admin Control Center
          </h1>

          <p>
            Welcome back, {user?.username}
          </p>
        </div>

      </div>

      <div className="admin-stats">

        <div className="stat-card">
          <h2>$24,500</h2>
          <p>Monthly Revenue</p>
        </div>

        <div className="stat-card">
          <h2>1,240</h2>
          <p>Total Customers</p>
        </div>

        <div className="stat-card">
          <h2>486</h2>
          <p>Playground Visits</p>
        </div>

        <div className="stat-card">
          <h2>873</h2>
          <p>Restaurant Orders</p>
        </div>

      </div>

    </section>
  )
}

export default AdminDashboard
