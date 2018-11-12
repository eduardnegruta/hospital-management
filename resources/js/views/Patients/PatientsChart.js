import React from 'react'

class PatientsChart extends React.Component {
  render () {
    return (
      <div className="card">
        <div className="card-header clearfix">
          <i className="fa fa-bar-chart" aria-hidden="true"></i> Chart
        </div>

        <div className="card-body">
          <canvas id="patientsChart" height="400"></canvas>
        </div>
      </div>
    )
  }
}

export default PatientsChart