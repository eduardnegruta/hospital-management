import React from 'react'
import { Route } from "react-router-dom"

import { Patients } from '../views'

const Main = () => (
  <main className="main">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">Hospital</li>

      <li className="breadcrumb-item">Patient management</li>

      <li className="breadcrumb-item active">Patients</li>
    </ol>
    <div className="container-fluid">
      <div id="ui-view">
        <Route path="/" exact component={Patients} />
      </div>
    </div>
  </main>
)

export default Main