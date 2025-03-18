import { Api } from './api'

export default {
  login(email, password) {
    return new Api().post('/user/login', { "email": email, "password": password }).then(response => {
        return response.data
    })
  },
  register(user) {
    return new Api().post('/user/register', user).then(response => {
        return response.data
    })
  }
}