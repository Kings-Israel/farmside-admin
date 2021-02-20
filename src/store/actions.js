import axios from 'axios'

let actions = {
    login({commit}, user) {
        commit('AUTH_REQUEST')
        try {
            return new Promise(async (resolve, reject) => {
                await axios.post('/auth/login', user)
                    .then(async (response) => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('AUTH_SUCCESS', token)
                        const user_id = response.data.user._id
                        await axios.get(`/user/${user_id}`)
                            .then(response => {
                                commit('USER_INFO', response.data)
                            })
                            resolve(response)
                    })
                .catch(err => {
                    commit('AUTH_ERROR')
                    reject(err)
                })
            })
        } catch (error) {
            commit('AUTH_ERROR')
            console.log(error)
        }
    },
    async updateUser({commit}, user) {
        await axios.post(`/user/updateInfo/${user.id}`, user)
        .then(response => {
            commit('USER_UPDATED')
            commit('USER_INFO', response.data)
        })
    },
    async uploadImage({commit}, image) {
        await axios.post('/user/uploadImage/', image)
        .then(response => {
            commit('PROFILE_PIC_UPDATED')
            commit('USER_INFO', response.data)
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