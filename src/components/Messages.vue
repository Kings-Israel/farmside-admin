<template>
  <div class="bookingsPage">
    <h1 id="page-header">Messages</h1>
    <vs-row>
        <vs-col vs-w="7">
            <vs-table stripe max-items="4" pagination :data="messages">
                <template slot="thead">
                    <vs-th>
                    Name
                    </vs-th>
                    <vs-th>
                    Email
                    </vs-th>
                    <vs-th>
                    Phone Number
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

                        <vs-td :data="data[indextr].phone_number">
                            {{data[indextr].phone_number}}
                        </vs-td>

                        <vs-td>
                            Reviewed
                        </vs-td>
                        
                        <vs-td :data="data[indextr].id">
                            <vs-button color='success' type='line' @click="viewOne(data[indextr]._id)">View</vs-button>
                            <vs-button color='danger' type='line' @click="deleteMessage(data[indextr]._id)">Delete</vs-button>
                        </vs-td>
                        
                    </vs-tr>
                </template>
            </vs-table>
        </vs-col>
        <vs-col vs-w="5">
            <div v-if="!name">
                <h1 class="ab-message">Select a message to view</h1>
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
                            <h4>Message Details</h4>
                            <span>
                                <h6>Date Received:</h6>
                                <h5>{{formatDate(date)}}</h5>
                                <h6>Message</h6>
                                <h5>{{message}}</h5>
                            </span>
                        </div>
                        <div slot="footer">
                            <vs-row vs-justify="flex-end">
                                <vs-button color="success" type="filled" class="mr-1">Reply</vs-button>
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
    name: "Messages",
    data(){
        return {
            name: '',
            email: '',
            phone_number: '',
            message: '',
            date: ''
        }
    },
    methods: {
        async viewOne(id) {
            await axios.get(`/messages/message/${id}`).then(response => {
                let message = response.data.message
                this.name = message.name
                this.email = message.email
                this.phone_number = message.phone_number
                this.date = message.date
                this.message = message.message
            })
        },
        deleteMessage(id) {
            this.$store.dispatch('deleteMessage', id).then(() => {
                if (this.status === 'Message deleted') {
                    this.$notify({type: 'success', text: 'Message deleted'})
                } else {
                    this.$notify({type: 'error', text: 'Error Deleting Message'})
                }
            })
        },
        formatDate: (date) => {
            date = date.split("T")
            return date[0]
        }
    },
    created() {
        this.$store.dispatch('getMessages')
    },
    computed: {
        ...mapGetters([
            'status', 'messages'
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
.ab-message {
    text-align: center;
    font-weight: bolder;
    color: rgba(24, 24, 24, 0.652);
}
</style>