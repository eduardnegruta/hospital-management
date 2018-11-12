import React from 'react'
import Chart from '../../../../node_modules/chart.js/src/chart'
import { PatientModal } from '../../components'
import api from '../../api/index'
import { patientModel } from '../../models'
import PatientsChart from './PatientsChart'
import PatientsDataTable from './PatientsDataTable'

class Patients extends React.Component {
  constructor(props) {
    super(props)

    let defaultSorted = []

    if (this.isJsonString(localStorage.getItem('defaultSorted'))) {
      defaultSorted = JSON.parse(localStorage.getItem('defaultSorted'))
    }

    this.state = {
      data: [],
      pages: null,
      loading: true,
      defaultSorted,
      patient: patientModel,
      errors: null,
      createPatientModalSelector: 'createPatientModal',
      editPatientModalSelector: 'editPatientModal',
      deletePatientModalSelector: 'deletePatientModalSelector'
    }

    this.fetchData = this.fetchData.bind(this)
    this.addPatient = this.addPatient.bind(this)
    this.editPatient = this.editPatient.bind(this)
    this.deletePatient = this.deletePatient.bind(this)
    this.handleFormFieldChange = this.handleFormFieldChange.bind(this)
    this.createPatient = this.createPatient.bind(this)
    this.resetPatientAndErrorsState = this.resetPatientAndErrorsState.bind(this)
    this.initChart = this.initChart.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.getChartData = this.getChartData.bind(this)
    this.setPatient = this.setPatient.bind(this)
  }

  componentDidMount () {
    $(`#${this.state.createPatientModalSelector}, #${this.state.editPatientModalSelector}, #${this.state.deletePatientModalSelector}`).on('hidden.bs.modal', () => {
      this.resetPatientAndErrorsState()
    })

    this.initChart()
  }

  setPatient (patient) {
    this.setState({
      patient: {
        ...patientModel,
        ...patient
      }
    })
  }

  resetPatientAndErrorsState () {
    this.setState({
      patient: patientModel,
      errors: null
    })
  }

  isJsonString (str) {
    if (!str) {
      return false
    }

    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }

    return true
  }

  fetchData(state) {
    this.setState({ loading: true })

    localStorage.setItem('defaultSorted', JSON.stringify(state.sorted))

    api.getPatients(
      // page must start from 1
      state.page + 1,
      state.pageSize,
      state.sorted
    ).then(res => {
      this.setState({
        data: res.data.data,
        pages: res.data.last_page,
        loading: false
      })

      this.updateChart()
    })
  }

  addPatient (newPatient) {
    this.setState({
      data: [newPatient, ...this.state.data]
    })
  }

  replacePatient (newPatient) {
    let patients = this.state.data

    const index = patients.findIndex(patient => patient.id == newPatient.id)

    patients.splice(index, 1, newPatient)

    this.setState({
      data: patients
    })
  }

  removePatient (newPatient) {
    let patients = this.state.data

    const index = patients.findIndex(patient => patient.id == newPatient.id)

    patients.splice(index, 1)

    this.setState({
      data: patients
    })
  }

  handleFormFieldChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      patient: {
        ...this.state.patient,
        [name]: value
      }
    })
  }

  createPatient (event) {
    event.preventDefault();

    api.createPatient(this.state.patient)
      .then(response => {
        $(`#${this.state.createPatientModalSelector}`).modal('toggle')
        $('.modal-backdrop').remove()

        this.addPatient(response.data)

        this.resetPatientAndErrorsState()

        this.updateChart()
      })
      .catch(reject => {
        this.setState({
          errors: reject.response.data.errors
        })
      })
  }

  editPatient (event) {
    event.preventDefault();

    api.editPatient(this.state.patient)
      .then(response => {
        $(`#${this.state.editPatientModalSelector}`).modal('toggle')
        $('.modal-backdrop').remove()

        this.replacePatient(response.data)

        this.resetPatientAndErrorsState()

        this.updateChart()
      })
      .catch(reject => {
        this.setState({
          errors: reject.response.data.errors
        })
      })
  }

  deletePatient (event) {
    event.preventDefault();

    api.deletePatient(this.state.patient)
      .then(response => {
        $(`#${this.state.deletePatientModalSelector}`).modal('toggle')
        $('.modal-backdrop').remove()

        this.removePatient(response.data)

        this.resetPatientAndErrorsState()

        this.updateChart()
      })
      .catch(reject => {
        this.setState({
          errors: reject.response.data.errors
        })
      })
  }

  getChartData () {
    let patientsData = {}
    let labels = []
    let datasetData = []

    this.state.data.map(patient => {
      patientsData[patient.height] = patientsData[patient.height] ? patientsData[patient.height] + 1 : 1
    })

    for (const data in patientsData) {
      labels.push(data)
      datasetData.push(patientsData[data])
    }

    return {
      labels,
      datasetData
    }
  }

  initChart () {
    const ctx = document.getElementById('patientsChart')

    const chartData = this.getChartData()

    this.patientsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData['labels'],
        datasets: [{
          label: 'Patient weights',
          data: chartData['datasetData'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              stepSize: 1
            }
          }]
        }
      }
    })
  }

  updateChart () {
    const chartData = this.getChartData()

    this.patientsChart.data.labels = chartData['labels']

    this.patientsChart.data.datasets.forEach((dataset) => {
      dataset.data = chartData['datasetData']
    })

    this.patientsChart.update()
  }

  render() {
    return (
      <div>
        <PatientModal
          id={this.state.createPatientModalSelector}
          title={'Create new patient'}
          modalClass={'success'}
          patient={this.state.patient}
          handleFormFieldChange={this.handleFormFieldChange}
          handleSubmit={this.createPatient}
          errors={this.state.errors} />

        <PatientModal
          id={this.state.editPatientModalSelector}
          title={`Edit patient - ${this.state.patient.name}`}
          modalClass={'primary'}
          patient={this.state.patient}
          handleFormFieldChange={this.handleFormFieldChange}
          handleSubmit={this.editPatient}
          errors={this.state.errors} />

        <PatientModal
          id={this.state.deletePatientModalSelector}
          title={`Delete patient - ${this.state.patient.name}`}
          modalClass={'danger'}
          patient={this.state.patient}
          handleFormFieldChange={this.handleFormFieldChange}
          handleSubmit={this.deletePatient}
          errors={this.state.errors}
          delete={true} />

        <div className="row">
          <div className="col-lg-7 col-md-12">
            <PatientsDataTable
              data={this.state.data}
              pages={this.state.pages}
              loading={this.state.loading}
              fetchData={this.fetchData}
              setPatient={this.setPatient}
              defaultSorted={this.state.defaultSorted}
              createPatientModalSelector={this.state.createPatientModalSelector}
              editPatientModalSelector={this.state.editPatientModalSelector}
              deletePatientModalSelector={this.state.deletePatientModalSelector}
            />
          </div>

          <div className="col-lg-5 col-md-12">
            <PatientsChart/>
          </div>
        </div>
      </div>
    )
  }
}

export default Patients
