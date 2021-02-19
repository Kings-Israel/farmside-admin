import axios from 'axios'

let actions = {
    login({commit}, user) {
        commit('AUTH_REQUEST')
        return new Promise((resolve, reject) => {
            axios.post('auth/login', user)
            .then((response) => {
                const token = response.data.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('AUTH_SUCCESS', token)
                const user_id = response.data.user._id
                axios.get(`/user/${user_id}`, user).then(response => {
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
    async updateUser({commit}, user) {
        await axios.post(`/user/updateInfo/${user.id}`, user)
        .then(response => {
            commit('USER_UPDATED')
            commit('USER_INFO', response.data)
        })
    },
    async uploadImage({commit}, image) {
        await axios.post('/user/image', image).then(response => {
            console.log(response.data)
        })
    },
    logout({commit}){
        axios.get('auth/logout').then(response => {
            commit('LOGOUT')
        })
        localStorage.removeItem('token')
    }
}

export default actions