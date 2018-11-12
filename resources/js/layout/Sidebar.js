import React from 'react'
import { NavLink } from "react-router-dom"

const Sidebar = (props) => (
  <div className="sidebar">
    <nav className="sidebar-nav ps ps--active-y">
      <ul className="nav">
        <li className="nav-title">Patient management</li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            <i className="nav-icon fa fa-users" aria-hidden="true"></i> Patients
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
)

export default Sidebar
