import React from 'react'
import ReactTable from 'react-table'

class PatientsDataTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Height',
        accessor: 'height'
      },
      {
        Header: 'Weight',
        accessor: 'weight'
      },
      {
        Header: 'Actions',
        accessor: 'id',
        sortable: false,
        Cell: row => (
          <div>
            <button
              className="btn btn-primary"
              type="button"
              data-toggle="modal"
              data-target={`#${this.props.editPatientModalSelector}`}
              onClick={() => this.props.setPatient(this.props.data.find(patient => patient.id == row.value))}>
              <i className="fa fa-pencil"></i>
            </button>

            <button
              className="btn btn-danger ml-2"
              type="button"
              data-toggle="modal"
              data-target={`#${this.props.deletePatientModalSelector}`}
              onClick={() => this.props.setPatient(this.props.data.find(patient => patient.id == row.value))}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        )
      }
    ]

    return (
      <div className="card">
        <div className="card-header clearfix">
          <i className="fa fa-users"></i> Patients

          <button className="btn btn-success pull-right"
                  type="button"
                  data-toggle="modal"
                  data-target={`#${this.props.createPatientModalSelector}`}>
            Create new patient
          </button>
        </div>

        <div className="card-body">
          <ReactTable
            columns={columns}
            manual
            data={this.props.data}
            pages={this.props.pages}
            loading={this.props.loading}
            onFetchData={this.props.fetchData}
            defaultSorted={this.props.defaultSorted}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    )
  }
}

export default PatientsDataTable