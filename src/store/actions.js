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
    async getBookings({commit}) {
        let response = await axios.get('/bookings/bookings')
        commit('BOOKINGS', response.data.bookings)
    },
    async deleteBooking({commit}, id) {
        let response = await axios.delete(`/bookings/delete/${id}`)
        if (response.data.message === 'Booking deleted') {
            commit('DELETE_BOOKING')
            commit('BOOKINGS', response.data.bookings)
        }
    },
    async getMessages({commit}) {
        let response = await axios.get('/messages/messages')
        commit('MESSAGES', response.data.messages)
    },
    async deleteMessage({commit}, id) {
        let response = await axios.delete(`/messages/delete/${id}`)
        if (response.data.message === 'Message deleted') {
            commit('DELETE_MESSAGE')
            commit('MESSAGES', response.data.messages)
        }
    },
    async updateAboutMainSection({commit}, content) {
        let main = await axios.post('/about/updateMain', content)
        if (main.data.message === 'success') {
            commit('UPDATE_ABOUT_MAIN_SECTION')
            commit('ABOUT_SECTION_MAIN_CONTENT', main.data.main)
        }
    },
    async updateAboutSubSection({commit}, content) {
        let sub = await axios.post('/about/updateSub', content)
        if (sub.data.message === 'success') {
            commit('UPDATE_ABOUT_SUB_SECTION')
            commit('ABOUT_SECTION_SUB_CONTENT', sub.data.sub)
        }
    },
    async uploadAboutImages({commit}, images) {
        await axios.post('/about/images', images)
        .then(response => {
            if (response.data.message === 'success') {
                commit('ABOUT_IMAGES_UPDATED')
            }
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
        await axios.post('/user/uploadImage/', image)
        .then(response => {
            commit('PROFILE_PIC_UPDATED')
            commit('USER_INFO', response.data)
        })
    },
    async portfolioImages({commit}) {
        await axios.get('/portfolio/images')
        .then(response => {
            commit('PORTFOLIO', response.data.images)
        })
    },
    async uploadPortfolioImages({commit}, images) {
        await axios.post('/portfolio/images', images)
        .then(response => {
            console.log(response.data.message)
            if (response.data.message === 'success') {
                commit('PORTFOLIO_IMAGES_UPDATED')
                commit('PORTFOLIO', response.data.images)
            }
        })
    },
    async deletePortfolioImage({commit}, image) {
        await axios.delete(`/portfolio/${image}`)
        .then(response => {
            if (response.data.message === 'success') {
                commit('PORTFOLIO_IMAGE_DELETED')
                commit('PORTFOLIO', response.data.images)
            }
        })
    },
    async uploadPortfolioVideo({commit}, video) {
        await axios.post('/portfolio/video', video)
        .then(response => {
            console.log(response.data)
            if(response.data.message === 'success'){
                commit('PORTFOLIO_VIDEO_UPLOADED')
                commit('PORTFOLIO_VIDEOS', response.data.videos)
            }
        })
    },
    async getSubscriptionEmails({commit}) {
        const response = await axios.get('/subscription/email')
        // console.log(response.data)
    },
    logout({commit}){
        axios.get('auth/logout').then(response => {
            commit('LOGOUT')
        })
        localStorage.removeItem('token')
    }
}

export default actions