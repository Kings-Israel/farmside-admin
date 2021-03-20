<template>
  <div class="bookingsPage">
    <h1 id="page-header">Bookings</h1>
    <vs-row>
        <vs-col vs-w="7">
            <vs-table stripe max-items="4" pagination :data="bookings">
                <template slot="thead">
                    <vs-th>
                    Name
                    </vs-th>
                    <vs-th>
                    Email
                    </vs-th>
                    <vs-th>
                    Status
                    </vs-th>
                    <vs-th>
                    Action
                    </vs-th>
                    
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].name">
                            {{data[indextr].name}}
                        </vs-td>

                        <vs-td :data="data[indextr].email">
                            {{data[indextr].email}}
                        </vs-td>

                        <vs-td>
                            Reviewed
                        </vs-td>

                        <vs-td :data="data[indextr].id">
                            <vs-button color='success' type='line' @click="viewOne(data[indextr]._id)">View</vs-button>
                            <vs-button color='danger' type='line' @click="deleteBooking(data[indextr]._id)">Delete</vs-button>
                        </vs-td>
                        
                    </vs-tr>
                </template>
            </vs-table>
        </vs-col>
        <vs-col vs-w="5">
            <div v-if="!name">
                <h1 class="ab-message">Select a booking to view</h1>
            </div>
            <div v-else>
                <vs-row vs-justify="center">
                    <vs-col type="flex" vs-justify="center" vs-align="center">
                        <vs-card>
                        <div slot="header">
                            <span id="card-header">
                                <vs-icon icon="account_circle" class="card-icon"></vs-icon><p>{{ name }}</p>
                                <vs-icon icon="mail" class="card-icon"></vs-icon><p>{{email}}</p>
                                <vs-icon icon="phone" class="card-icon"></vs-icon><p>{{phone_number}}</p>
                            </span>
                        </div>
                        <div>
                            <h4>Event Details</h4>
                            <span id="event_details">
                                <p>Event Location:</p>
                                <h6><b>{{location}}</b></h6>
                            </span>
                            <span id="event_details">
                                <p>Event Date:</p>
                                <h6><b>{{formatDate(event_date)}}</b></h6>
                            </span>
                            <span id="event_details">
                                <p>Event Duration:</p>
                                <h6><b>{{event_duration}}</b></h6>
                            </span>
                            <span id="event_details">
                                <p>Event Type:</p>
                                <h6><b>{{event_type}}</b></h6>
                            </span>
                            <span id="event_details_description">
                                <h4>More Event Info:</h4>
                                <div v-for="(key, detail, i) in event_details" :key="i">
                                    <div v-if="key !== ''">
                                        <h6 v-if="key !== null">
                                            <span>
                                            <p>{{formatText(detail)}}:</p> <b>{{key}}</b>
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div slot="footer">
                            <vs-row vs-justify="flex-end">
                                <vs-button color="success" type="filled" class="mr-1">Reply</vs-button>
                                <vs-button color="rgba(24, 24, 24, 0.652)" type="filled">Add to Calendar</vs-button>
                            </vs-row>
                        </div>
                        </vs-card>
                    </vs-col>
                </vs-row>
            </div>
        </vs-col>
    </vs-row>
    
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            name: '',
            email: '',
            phone_number: '',
            location: '',
            event_date: '',
            event_type: '',
            event_duration: '',
            event_details: {},
        }
    },
    methods: {
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
        this.$store.dispatch('getBookings')
    },
    computed: {
        ...mapGetters([
            'status', 'bookings'
        ])
    }
}
</script>

<style scoped>
#card-header {
    display: inline-flex;
}
#card-header p {
    font-size: 18px;
    margin-right: 5px;
}
.card-icon {
    padding-right: 5px;
}
#event_details {
    display: flex;
}
#event_details > p {
    font-size: 16px;
    margin-right: 10px;
}
#event_details > h6 {
    font-size: 18px;
}
.ab-message {
    text-align: center;
    font-weight: bolder;
    color: rgba(24, 24, 24, 0.652);
}
</style>