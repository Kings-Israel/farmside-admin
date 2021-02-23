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
    UPDATE_ABOUT_MAIN_SECTION(state) {
        state.status = 'Main Section Updated'
    },
    ABOUT_SECTION_MAIN_CONTENT(state, mainSection) {
        state.aboutMainSection = mainSection
    },
    UPDATE_ABOUT_SUB_SECTION(state) {
        state.status = 'Sub Section Updated'
    },
    ABOUT_SECTION_SUB_CONTENT(state, subSection) {
        state.aboutSubSection = subSection
    },
    ABOUT_IMAGES_UPDATED(state) {
        state.status = 'About Images Updated'
    },
    USER_UPDATED(state) {
      state.status = 'Updated User'
    },
    USER_INFO(state, user) {
        state.user = user
    },
    PROFILE_PIC_UPDATED(state) {
        state.status = 'Updated Profile Picture'
    }
}

export default mutations