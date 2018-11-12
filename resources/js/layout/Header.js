import React from 'react'
import { NavLink } from "react-router-dom"

const Header = () => (
  <header className="app-header navbar">
    <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
      <span className="navbar-toggler-icon"></span>
    </button>

    <NavLink className="navbar-brand" to="/">
      <i className="fa fa-h-square" aria-hidden="true"></i> ospital
    </NavLink>
  </header>
)

export default Header
