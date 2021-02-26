<template>
    <div class="about_section">
        <h4 id="">About Section</h4>
        <div id="main_section">
            <h5>About Section Main Content</h5>
            <form class="col s12" @submit.prevent="uploadMain" id="mainForm">
                <div class="input-field col s12">
                    <textarea-autosize
                        class="textarea"
                        placeholder="Type Something"
                        :min-height="50"
                        :max-height="250"
                        v-model="main_section_content"
                    />
                </div>
                <button type="submit" :disabled="main_section_content == ''" class="btn btn-outline-secondary mt-2 w-50">Submit</button>
            </form>
        </div>
        <hr>
        <div class="row">
            <div class="col s12">
                <div class="col s6">
                    <div id="sub_section">
                        <form @submit.prevent="uploadSub" id="subForm">
                        <h5>About Section Sub Content</h5>
                            <div class="input-field col s12">
                                <textarea-autosize
                                    class="textarea"
                                    placeholder="Type Something"
                                    :min-height="50"
                                    :max-height="250"
                                    v-model="sub_section_content"
                                />
                            </div>
                            <button type="submit" :disabled="sub_section_content == ''" class="btn btn-outline-secondary mt-2">Submit</button>
                        </form>
                    </div>
                </div>
                <div class="col s6">
                    <div id="photos_section">
                    <h5>About Photos</h5>
                        <uploader
                            v-model="fileList"
                            :limit=3
                            title=""
                            :autoUpload="false"
                        ></uploader>
                        <button @click="uploadPhotos" :disabled="fileList.length != 3" type="submit" class="btn btn-outline-secondary mt-2">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import Uploader from "vux-uploader-component";
export default {
    name: "AboutSection",
    components: {
      Uploader
    },
    data() {
        return {
            aboutSection: {
                mainSection: 'aboutMainSection',
                subSection: 'aboutSubSection'
            },
            main_section_content: '',
            sub_section_content: '',
            fileList: []
        }
    },
    methods: {
        uploadMain(){
            console.log({
                section: this.aboutSection.mainSection,
                content: this.main_section_content
            })
            this.$store.dispatch('updateAboutMainSection', {
                name: this.aboutSection.mainSection,
                content: this.main_section_content
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
            this.$store.dispatch('updateAboutSubSection', {
                name: this.aboutSection.subSection,
                content: this.sub_section_content
            })
            .then(() => {
                if(this.status === 'Sub Section Updated') {
                    this.$notify({type: 'success', text: 'Section Updated!!'})
                } else {
                    this.$notify({type: 'error', text: 'Failed to Update!!'})
                }
            })
        },
        uploadPhotos() {
            const formData = new FormData()
            formData.append('images', this.fileList[0].blob)
            formData.append('images', this.fileList[1].blob)
            formData.append('images', this.fileList[2].blob)
            this.$store.dispatch('uploadAboutImages', formData).then(() => {
                if (this.status === 'About Images Updated') {
                    this.$notify({type: 'success', text: 'About Images Updated'})
                    this.fileList = []
                } else {
                    this.$notify({type: 'error', text: 'Failed to update images'})
                }
            })
        }
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
#main_section h5 {
    text-align: center;
}

.textarea {
    border: none;
    border-bottom: 3px solid rgb(0, 0, 0);
    transition: .5s ease-out;
    
}

.textarea:focus {
    border: none;
    border-bottom: 5px solid rgb(0, 0, 0);
}

#mainForm {
    text-align: center;
}

#subForm {
    text-align: center;
}

#photos_section{
    text-align: center;
}
</style>