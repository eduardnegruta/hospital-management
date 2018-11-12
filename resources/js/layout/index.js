import React from 'react'
import { HashRouter as Router } from "react-router-dom"

import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'

const Layout = () => (
  <div>
    <Router>
        <div className="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
          <Header/>

          <div className="app-body">
            <Sidebar/>

            <Main/>
          </div>
        </div>
    </Router>
  </div>
)

export default Layout
