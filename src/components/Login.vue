<template>
<div id="login">
    <div class="row">
        <div class="col s12">
            <div class="col s6">
                <div id="background">
                    <img src="../assets/backgrounds/Artboard 3.jpg" alt="">
                </div>
            </div>
            <div class="col s6">
                <form @submit.prevent="login" id="login-form">
                    <i class="large material-icons account_circle">account_circle</i>
                    <div class="input-field">
                        <i class="material-icons prefix">email</i>
                        <input id="icon_prefix" type="text" class="validate" v-model="form.email" @focus="error = false">
                        <label for="icon_prefix">Email</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">lock_outline</i>
                        <input id="password" type="password" v-model="form.password">
                        <label for="password">Password</label>
                    </div>
                    <button class="waves-effect waves-light btn-small"><i class="material-icons left">lock_open</i>Log In</button>
                </form>
            <div v-if="error" class="error">Invalid Email or Password</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import axios from 'axios'
export default {
    name: "Login",
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            error: false
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: 'test@admin.com',
                password: '123456789'
            })
            .then(() => {
                this.$router.push({name: 'Bookings'})
            })
            .catch(err => {
                console.log(err)
                this.error = true
            })
        },
    },
    mounted() {
        M.AutoInit()
    },
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';

#background {
    margin-top: 200px;
}
#login-form {
    width: 350px;
    margin-left: 150px;
    margin-top: 200px;
}
.account_circle {
    margin-left: 150px;
}

#login-form > button {
    margin-left: 140px;
}

.error {
    margin-top: 10px;
    margin-left: 230px;
    font-size: 20px;
    color: rgb(252, 11, 11);
}
@media (max-width: 980px) {
    #background {
        display: none;
    }
}
</style>