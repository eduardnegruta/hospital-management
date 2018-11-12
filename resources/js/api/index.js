import axios from 'axios'

const api = {
  getPatients: (page, perPage, sort) => {
    let orderByColumn = ''
    let orderByDirection = ''

    if (sort.length) {
      orderByColumn = sort[0].id
      orderByDirection = sort[0].desc ? 'desc' : 'asc'
    }

    return new Promise(resolve => {
      axios.get(`patients?page=${page}&perPage=${perPage}&orderByColumn=${orderByColumn}&orderByDirection=${orderByDirection}`)
        .then(response => {
          resolve(response)
        })
    })
  },

  createPatient: (data) => {
    return new Promise((resolve, reject) => {
      axios.post('patient', data)
        .then(resolve)
        .catch(reject)
    })
  },

  editPatient: (data) => {
    return new Promise((resolve, reject) => {
      axios.put('patient', data)
        .then(resolve)
        .catch(reject)
    })
  },

  deletePatient: (data) => {
    return new Promise((resolve, reject) => {
      axios.delete(`patient/${data.id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default api
