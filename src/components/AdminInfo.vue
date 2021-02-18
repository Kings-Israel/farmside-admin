<template>
    <div class="row">
        <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

        <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
        <div class="col s12">
            <form @submit.prevent="update" id="update-form">
                <i class="large material-icons account_circle">account_circle</i>
                <div class="input-field">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="text" class="validate" v-model="form.name">
                    <label for="icon_prefix">Name <b>(Current Name:{{user.name}})</b></label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">phone</i>
                    <input id="icon_prefix" type="number" class="validate" v-model="form.phone_number">
                    <label for="icon_prefix">Phone Number <b>(Current Phone Number: {{ user.phone_number }})</b></label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_prefix" type="text" class="validate" v-model="form.email">
                    <label for="icon_prefix">Email <b>(Current Email: {{ user.email }})</b></label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">lock_outline</i>
                    <input id="password" type="password" v-model="form.password">
                    <label for="password">Password</label>
                </div>
                <button class="waves-effect waves-light btn-small">Update</button>
            </form>
            <div v-if="error" class="error">Invalid Email or Password</div>
        </div>
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'

const validatePhone = phone => {
  if (!phone.match(/^(?:254|\+254|0)?(7(?:(?:[12][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$/gm)) {
    return { valid: false, error: 'Enter a valid phone number.' };
  }

  return { valid: true, error: null };
}

export default {
    name: 'AdminInfo',
    props: ['user'],
    data() {
        return {
            form: {
                name: '',
                phone_number: '',
                email: '',
                password: ''
            },
            valid: true,
            errors: {}
        }
    },
    methods: {
        update() {
            this.errors = {}
            const validPhone = validatePhone(this.form.phone_number)
            this.errors.phone = validPhone.error
            this.valid = validPhone.valid

            if(this.valid) {
                
            }
        }
    },
    mounted() {
        M.AutoInit()
    },
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';

.account_circle {
    margin-left: 220px;
}

#update-form > button {
    margin-left: 220px;
}
</style>