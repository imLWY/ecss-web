import axios from 'axios'
// import Errors from './errors'

export default class Http {
  get(url) {
    return new Promise((resolve, reject) => {
      axios['GET'](url)
        .then(response => {
          // this.onSuccess(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          // this.onFail(error.response.data.errors)
          reject(error.response.data.errors)
        })
    })
  }

  post(url) {
    return new Promise((resolve, reject) => {
      axios['POST'](url)
        .then(response => {
          this.onSuccess(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          this.onFail(error.response.data.errors)
          reject(error.response.data.errors)
        })
    })
  }
}

