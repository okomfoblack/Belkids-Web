

import {
    FaUserCircle,
    FaChild,
    FaBirthdayCake,
    FaUtensils,
    FaCalendarCheck
}
from "react-icons/fa"

import "./Styles/UserDashboard.css"

function UserDashboard(){

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    return(

        <section className="user-dashboard">

            <div className="dashboard-header">

                <div>

                    <h1>
                        Welcome
                        <span>
                            {" "}{user?.username}
                        </span>
                    </h1>

                    <p>
                        Manage your Belkids
                        Playground visits,
                        birthday events and
                        restaurant reservations.
                    </p>

                </div>

                <FaUserCircle
                className="profile-icon"
                />

            </div>

            <div className="dashboard-stats">

                <div className="stat-card">
                    <FaChild />
                    <h2>24</h2>
                    <p>Play Sessions</p>
                </div>

                <div className="stat-card">
                    <FaBirthdayCake />
                    <h2>8</h2>
                    <p>Birthday Events</p>
                </div>

                <div className="stat-card">
                    <FaUtensils />
                    <h2>15</h2>
                    <p>Restaurant Orders</p>
                </div>

                <div className="stat-card">
                    <FaCalendarCheck />
                    <h2>6</h2>
                    <p>Upcoming Bookings</p>
                </div>

            </div>

            <div className="dashboard-content">

                <div className="dashboard-box">

                    <h2>
                        Upcoming Activities
                    </h2>

                    <ul>
                        <li>
                            Family Fun Day
                        </li>

                        <li>
                            Birthday Party Reservation
                        </li>

                        <li>
                            Weekend Restaurant Booking
                        </li>

                        <li>
                            Kids Adventure Event
                        </li>
                    </ul>

                </div>

                <div className="dashboard-box">

                    <h2>
                        Account Information
                    </h2>

                    <p>
                        Name:
                        {" "}
                        {user?.username}
                    </p>

                    <br/>

                    <p>
                        Email:
                        {" "}
                        {user?.email}
                    </p>

                    <br/>

                    <p>
                        Membership:
                        Premium Family
                    </p>

                </div>

            </div>

            <div className="action-buttons">

                <button>
                    Book Playground
                </button>

                <button>
                    Birthday Packages
                </button>

                <button>
                    Restaurant Menu
                </button>

                <button>
                    View Profile
                </button>

            </div>

        </section>

    )
}

export default UserDashboard
