/* jshint esnext: true */
/* eslint-disable-next-line */
/* eslint-disable */

import axios from 'axios';
import Errors from './errors';

export default class Form {
  constructor(data) {
    this.originalData = data;

    for(let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
  }

  data() {
    let data = {};

    for(let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }

  reset() {
    for(let field in this.originalData) {
      this[field] = '';
    }

    this.errors.clear();
  }

  submit(type, url) {
    // return new Promise((resolve, reject) => {
    //   axios[type](url)
    //     .then(response => {
    //       console.log(response);
    //     });
    // });
    return new Promise((resolve, reject) => {
      axios[type](url, 'username='+this.data().username+'&password='+this.data().password)
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          this.onFail(error.response.data.errors);
          reject(error.response.data.errors);
        });
    });
  }

  onSuccess(data) {
    this.reset();
  }

  onFail(errors) {
    this.errors.record(errors);
  }

  post(url) {
    return this.submit('post', url);
  }
}

