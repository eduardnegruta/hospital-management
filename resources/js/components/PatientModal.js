import React from 'react'

class PatientModal extends React.Component {
  constructor(props) {
    super(props)

    this.errorClass = this.errorClass.bind(this)
  }

  errorClass (field) {
    if (this.props.errors) {
      if (this.props.errors[field]) {
        return 'is-invalid'
      }
    }

    return ''
  }

  errorDescription (field) {
    if (this.props.errors) {
      if (this.props.errors[field]) {
        return this.props.errors[field].map(error => {
          return <div key={error}>{error}</div>
        })
      }
    }

    return ''
  }

  render () {
    return (
      <div className="modal fade" id={this.props.id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className={`modal-dialog modal-${this.props.modalClass}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>

              <button className="close" type="button" data-dismiss="modal" aria-label="Close" ref={button => this.closeModal = button}>
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={this.props.handleSubmit} className="clearfix">
                <div className="text-center" style={this.props.delete ? {} : { display: 'none' }}>
                  <h3>Are you sure?</h3>

                  <p className="lead">You won't be able to revert this!</p>
                </div>

                <div style={this.props.delete ? { display: 'none' } : {}}>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="name">Patient's name *</label>

                    <input onChange={this.props.handleFormFieldChange}
                           value={this.props.patient.name}
                           className={`form-control ${this.errorClass('name')}`}
                           id="name"
                           type="text"
                           name="name"
                           placeholder="Patient's name"
                           required={true}
                    />

                    <div className="invalid-feedback">{this.errorDescription('name')}</div>
                  </div>

                  <div className="form-group">
                    <label className="col-form-label" htmlFor="height">Patient's height *</label>

                    <div className="input-group">
                      <input onChange={this.props.handleFormFieldChange}
                             value={this.props.patient.height}
                             className={`form-control ${this.errorClass('height')}`}
                             id="height"
                             type="number"
                             name="height"
                             placeholder="Patient's height"
                             required={true}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">cm</span>
                      </div>

                      <div className="invalid-feedback">{this.errorDescription('height')}</div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-form-label" htmlFor="weight">Patient's weight *</label>

                    <div className="input-group">
                      <input onChange={this.props.handleFormFieldChange}
                             value={this.props.patient.weight}
                             className={`form-control ${this.errorClass('weight')}`}
                             id="weight"
                             type="number"
                             name="weight"
                             placeholder="Patient's weight"
                             required={true}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">kg</span>
                      </div>

                      <div className="invalid-feedback">{this.errorDescription('weight')}</div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-form-label" htmlFor="age">Patient's age *</label>

                    <div className="input-group">
                      <input onChange={this.props.handleFormFieldChange}
                             value={this.props.patient.age}
                             className={`form-control ${this.errorClass('age')}`}
                             id="age"
                             type="number"
                             name="age"
                             placeholder="Patient's age"
                             required={true}
                      />

                      <div className="invalid-feedback">{this.errorDescription('age')}</div>
                    </div>
                  </div>
                </div>

                <input className={`pull-right btn btn-${this.props.modalClass}`} type="submit" value={this.props.title} />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PatientModal
