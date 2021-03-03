<template>
    <div>
        <h4 id="page-header">Messages</h4>
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
                            <tr v-for="message in pageOfItems" :key="message._id">
                                <td>{{message.name}}</td>
                                <td>{{message.email}}</td>
                                <td>
                                    <button class="btn btn-small view-message-button" @click="viewOne(message._id)">View</button>
                                    <i class="material-icons delete-message-icon" @click="deleteMessage(message._id)">delete</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <jw-pagination :items="messages" :pageSize="10" @changePage="onChangePage" class="pagination"></jw-pagination>
                </div>
                <div v-if="!name">
                    <h1 class="ab-message">Select a Message to view</h1>
                </div>
                <div v-else class="col s6">
                    <div class="row">
                        <div class="col s12">
                            <div class="col s4">
                                <p>Name:</p>
                                <h6><b>{{name}}</b></h6>
                            </div>
                            <div class="col s4">
                                <p>Email:</p>
                                <h6><b>{{email}}</b></h6>
                            </div>
                            <div class="col s4">
                                <p>Phone Number:</p>
                                <h6><b>{{phone_number}}</b></h6>
                            </div>
                        </div>
                    </div>
                    <p>Date Received:</p>
                    <h6><b>{{formatDate(date)}}</b></h6>
                    <h5>Message</h5>
                    <h6><b>{{message}}</b></h6>
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
    name: "Messages",
        components: {
        JwPagination
    },
    data() {
        return {
            pageOfItems: [],
            name: '',
            email: '',
            phone_number: '',
            message: '',
            date: ''
        }
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems
        },
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
    mounted() {
        M.AutoInit()
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
@import 'materialize-css/dist/css/materialize.min.css';
.view-message-button {
    margin-top: -15px;
}

.delete-message-icon {
    margin-right: -15px;
    margin-left: 10px;
}
.delete-message-icon:hover {
    color: rgb(220, 0, 0);
    cursor: pointer;
}
.ab-message {
    text-align: center;
    font-weight: bolder;
    color: rgba(0, 0, 0, 0.3);
}
</style>