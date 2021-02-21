<template>
    <div>
        <h5>Change Profile Picture</h5>
        <!-- <div v-if="!files" class="file-field input-field">
            <div class="btn grey">
                <span>Image</span>
                <input type="file" name="image" @change="onFileChange" >
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
            </div>
        </div>
        <div v-else>
            <div class="image-container">
                <img class="profile_pic" :src="files" />
                <button @click="removeImage" class="btn mt-2 mr-2" style="float: right">Remove image</button>
                <button @click="onUpload" class="btn mt-2" style="float: right">Upload</button>
            </div>
        </div> -->
        <div class="file-field input-field">
            <div class="btn grey">
                <span>Image</span>
                <input type="file" name="image" @change="onFileChange" >
            </div>
            <div class="file-path-wrapper">
                <input type="text" class="file-path validate">
            </div>
        </div>
        <button @click="onUpload" class="btn mt-2 mr-2" style="display: flex; margin-left: 220px;">Upload</button>
        <div class="image-container">
            <img :src="files" alt="" class="profile_pic">
        </div>
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import { mapGetters } from 'vuex'
export default {
    name: "ImageUploader",
    props: ['id', 'profile_pic'],
    data() {
        return {
            files: null,
            image: null,
            success: false,
            failed: false,
        }
    },
    methods: {
        onFileChange(e) {
            this.image = e.target.files || e.dataTransfer.files;
            if (!this.image.length)
                return;
            this.createImage(this.image[0]);
            this.files = e.target.files || e.dataTransfer.files;
        },
        onUpload() {
            const formData = new FormData()
            formData.append('id', this.id)
            formData.append('image', this.image[0])
            this.$store.dispatch('uploadImage', formData).then(() => {
                if(this.status === 'Updated Profile Picture') {
                    this.$notify({type: 'success', text: '<h5>Profile Pic Updated!!</h5>'})
                    this.files = null
                } else {
                    this.$notify({type: 'error', text: '<h5>Please try again!!</h5>'})
                }
            })
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.files = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        removeImage: function (e) {
            this.files = '';
        },
        
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

.profile_pic {
    margin-left: 120px;
    width: 450px;
    border-radius: 50%;
    object-fit: cover;
}

.message-box {
    display: flex;
    float: left;
}

.success {
    margin-left: 10px;
    color: rgb(34, 85, 38);
}

.failed {
    margin-left: 10px;
    color: rgb(252, 11, 11);
}
</style>