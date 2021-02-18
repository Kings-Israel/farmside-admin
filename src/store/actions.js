import axios from 'axios'

let actions = {
    login({commit}, user) {
        commit('AUTH_REQUEST')
        return new Promise((resolve, reject) => {
            axios.post('auth/api/login', user)
            .then((response) => {
                const token = response.data.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('AUTH_SUCCESS', token)
                axios.post('auth/api/user', user).then(response => {
                    commit('USER_INFO', response.data)
                })
                resolve(response)
            })
            .catch(err => {
                commit('AUTH_ERROR')
                reject(err)
            })
        })
    },
    updateUser({commit}, user) {
        
    },
    logout({commit}){
        axios.get('auth/api/logout').then(response => {
            commit('LOGOUT')
        })
        localStorage.removeItem('token')
    }
}

export default actions