let mutations = {
    AUTH_REQUEST(state){
        state.status = 'Loading'
    },
    AUTH_SUCCESS(state, token){
        state.status = 'Logged In'
        state.token = token
    },
    AUTH_ERROR(state) {
        state.status = "Error"
    },
    LOGOUT(state) {
        state.status = 'Logged Out'
        state.token = ''
    },
    USER_UPDATE(state) {
      state.status = 'Updated User'
    },
    USER_INFO(state, user) {
        state.user = user
    }
}

export default mutations