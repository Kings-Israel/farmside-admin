<template>
    <div class="about_section">
        <h3 class="m-0" style="right: 0">About Section Content</h3>
        <div id="main_section">
            <h5>About Section Main Content</h5>
            <form class="col s12" @submit.prevent="uploadMain">
                <div class="input-field col s12">
                    <input type="hidden" value="aboutMain" v-model="aboutSection">
                    <textarea id="textarea1" class="materialize-textarea" :value="aboutMainSection"></textarea>
                    <label for="textarea1">Main Section Text</label>
                </div>
                <button type="submit" class="btn btn-outline-secondary mt-2">Submit</button>
            </form>
        </div>
        <div class="row">
            <div class="col 5">
                <div id="sub_section">
                    <h4>About Section Sub Content</h4>
                    <form @submit.prevent="uploadSub">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea" :value="aboutSubSection"></textarea>
                            <label for="textarea1">Sub Section Text</label>
                        </div>
                        <button type="submit" class="btn btn-outline-secondary mt-2">Submit</button>
                    </form>
                </div>
            </div>
            <div class="col 7">
                <div id="photos_section">
                    <h4>About Photos</h4>
                    <!-- Use vue-uploader-component -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
export default {
    name: "AboutSection",
    data() {
        return {
            aboutSection: '',
            main_section_content: '',
            sub_section_content: '',
        }
    },
    methods: {
        uploadMain(){
            console.log(this.aboutSection)
            this.$store.dispatch('updateAboutMainSection', {
                name: this.aboutSection,
                content: this.aboutMainSection
            })
            .then(() => {
                if(this.status === 'Main Section Updated') {
                    this.$notify({type: 'success', text: 'Section Updated!!'})
                } else {
                    this.$notify({type: 'error', text: 'Failed to Update!!'})
                }
            })
        },
        uploadSub(){
            this.$store.dispatch('updateAboutSubSection', this.aboutSubSection)
            .then(() => {
                if(this.status === 'Sub Section Updated') {
                    this.$notify({type: 'success', text: 'Section Updated!!'})
                } else {
                    this.$notify({type: 'error', text: 'Failed to Update!!'})
                }
            })
        },
    },
    mounted() {
        M.AutoInit()
    },
    computed: {
        ...mapGetters([
            'status', 'aboutMainSection', 'aboutSubSection'
        ])
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';

</style>