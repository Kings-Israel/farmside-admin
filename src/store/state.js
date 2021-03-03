let state = {
    status: '',
    token: localStorage.getItem('token') || '',
    bookings: '',
    messages: '',
    aboutMainSection: '',
    aboutSubSection: '',
    user: {},
    portfolioImages: '',
    portfolioVideos: '',
    subscritpionEmails: ''
}

export default state