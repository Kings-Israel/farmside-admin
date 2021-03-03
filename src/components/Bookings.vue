<template>
    <div class="bookingsPage">
        <h4 id="page-header">Bookings</h4>
        <div class="row">
            <div class="col s12">
                <div class="col s6">
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="booking in pageOfItems" :key="booking._id">
                                <td>{{booking.name}}</td>
                                <td>{{booking.email}}</td>
                                <td>
                                    <button class="btn btn-small view-booking-button" @click="viewOne(booking._id)">View</button>
                                    <i class="material-icons delete-booking-icon" @click="deleteBooking(booking._id)">delete</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <jw-pagination :items="bookings" :pageSize="10" @changePage="onChangePage" class="pagination"></jw-pagination>
                </div>
                <div v-if="!name">
                    <h1 class="ab-message">Select a booking to view</h1>
                </div>
                <div v-else class="col s6">
                    <div class="row">
                        <div class="col s12">
                            <div class="col s4">
                                <p>Client Name:</p>
                                <h6><b>{{name}}</b></h6>
                            </div>
                            <div class="col s4">
                                <p>Client Email:</p>
                                <h6><b>{{email}}</b></h6>
                            </div>
                            <div class="col s4">
                                <p>Client Phone Number:</p>
                                <h6><b>{{phone_number}}</b></h6>
                            </div>
                        </div>
                    </div>
                    <h5>Event Details:</h5>
                    <div class="row">
                        <div class="col s12">
                            <div class="col s4">
                                <p>Event Location:</p>
                                <h6><b>{{location}}</b></h6>
                            </div>
                            <div class="col s4">
                                <p>Event Date:</p>
                                <h6><b>{{formatDate(event_date)}}</b></h6>
                            </div>
                            <div class="col s4">
                                <p>Event Duration:</p>
                                <h6><b>{{event_duration}}</b></h6>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <p>Event Type:</p>
                            <h6><b>{{event_type}}</b></h6>
                        </div>
                        <div class="col s6">
                            <p>Other Description:</p>
                            <div v-for="(key, detail, i) in event_details" :key="i">
                                <div v-if="key !== ''">
                                    <h6 v-if="key !== null">
                                        <b>{{ formatText(detail) }}: {{ key }}</b>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import JwPagination from 'jw-vue-pagination'
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import { mapGetters } from 'vuex'
export default {
    name: 'Bookings',
    components: {
        JwPagination
    },
    data() {
        return {
            pageOfItems: [],
            name: '',
            email: '',
            phone: '',
            location: '',
            event_date: '',
            event_type: '',
            event_duration: '',
            event_details: {},
        }
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems
        },
        async viewOne(id) {
            await axios.get(`/bookings/booking/${id}`).then(response => {
                let booking = response.data.booking
                this.name = booking.name
                this.email = booking.email
                this.phone_number = booking.phone_number
                this.location = booking.location
                this.event_date = booking.event_date,
                this.event_type = booking.event_type
                this.event_duration = booking.event_duration
                this.event_details = booking.event_details
            })
        },
        deleteBooking(id) {
            this.$store.dispatch('deleteBooking', id).then(() => {
                if (this.status === 'Booking deleted') {
                    this.$notify({type: 'success', text: 'Booking deleted'})
                } else {
                    this.$notify({type: 'error', text: 'Error Deleting Booking'})
                }
            })
        },
        formatText: (text) => {
            text = text.replaceAll('_', ' ')
            text = text.charAt(0).toUpperCase() + text.slice(1)
            return text
        },
        formatDate: (date) => {
            date = date.split("T")
            return date[0]
        }
    },
    created() {
        
    },
    mounted() {
        M.AutoInit()
    },
    computed: {
        ...mapGetters([
            'status', 'bookings'
        ])
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';
* {
    margin-left: -10px;
}
.view-booking-button {
    margin-top: -15px;
}

.delete-booking-icon {
    margin-right: -15px;
    margin-left: 10px;
}
.delete-booking-icon:hover {
    color: rgb(220, 0, 0);
    cursor: pointer;
}
.ab-message {
    text-align: center;
    font-weight: bolder;
    color: rgba(0, 0, 0, 0.3);
}
</style>