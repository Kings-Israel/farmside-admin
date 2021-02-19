<template>
    <div class="row">
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
                    <div class="error">{{ errors.phone }}</div>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_prefix" type="text" class="validate" v-model="form.email">
                    <label for="icon_prefix">Email <b>(Current Email: {{ user.email }})</b></label>
                </div>
                <!-- Implement password changing -->
                <div id="form-footer">
                    <button class="waves-effect waves-light btn-small">Update</button>
                    <div v-if="success" class="success"><i class="material-icons prefix">done</i>Updated Your Info.</div>
                    <div v-if="failed" class="failed"><i class="material-icons prefix">close</i>Please try again.</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import { mapGetters } from 'vuex';

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
                id: this.user._id,
                name: '',
                phone_number: '',
                email: '',
            },
            valid: true,
            errors: {},
            icon: '',
            message: '',
            success: false,
            failed: false
        }
    },
    methods: {
        update() {
            this.errors = {}
            if (this.form.name === '') {
                this.form.name = this.user.name
            }
            if (this.form.email === '') {
                this.form.email = this.user.email
            }
            if(this.form.phone_number !== '') {
                const validPhone = validatePhone(this.form.phone_number)
                this.errors.phone = validPhone.error
                this.valid = validPhone.valid
            }

            if(this.valid) {
                this.$store.dispatch('updateUser', this.form).then(() => {
                    if(this.status === 'Updated User') {
                        this.form.name = ''
                        this.form.email = ''
                        this.form.phone_number = ''
                        this.success = true
                        setTimeout(() => {
                            this.success = false
                        }, 4000)
                    } else {
                        this.failed = true
                        setTimeout(() => {
                            this.failed = false
                        }, 4000)
                    }
                })
            }
        }
    },
    mounted() {
        M.AutoInit()
    },
    computed: {
        ...mapGetters([
            'status'
        ])
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';

.account_circle {
    margin-left: 220px;
}

.error {
    margin-left: 180px;
    font-size: 15px;
    color: rgb(252, 11, 11);
}

#form-footer {
    display: flex;
    margin-left: 220px;
}

#form-footer .success {
    margin-left: 10px;
    color: rgb(34, 85, 38);
}

#form-footer .failed {
    margin-left: 10px;
    color: rgb(252, 11, 11);
}
</style>