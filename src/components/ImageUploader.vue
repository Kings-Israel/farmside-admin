<template>
    <div>
        <h5>Change Profile Picture</h5>
        <!-- <div v-if="!profile_pic" class="file-field input-field">
            <div class="btn">
                <span>File</span>
                <input type="file" name="image" @change="onFileChange">
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
            </div>
        </div>
        <div v-else>
            <div class="image-container">
                <img class="profile_pic" :src="profile_pic" />
            </div>
            <button @click="removeImage" class="btn mt-2" style="float: right">Remove image</button>
            <button @click="onUpload" class="btn mt-2 mr-2" style="float: right">Upload</button>
        </div> -->
        <upload-image is="upload-image"
            :url="onUpload"
            :max_files="5"
            name="files[]"
            :resize_enabled="true"
            :resize_max_width="640"
            button_html="button_html"
            button_class="btn btn-success"
            v-on:upload-image-attemp="uploadImageAttempt"
            v-on:upload-image-success="uploadImageSuccess"
            v-on:upload-image-failure="uploadImageFailure"
            v-on:upload-image-loaded="uploadImageLoaded"
            v-on:upload-image-submit="uploadImageSubmit"
            v-on:upload-image-clicked="uploadImageClicked"
            v-on:upload-image-removed="uploadImageRemoved"
        ></upload-image>
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import UploadImage from 'vue-upload-image'
export default {
    name: "ImageUploader",
    props: ['id', 'profile_pic'],
    components: {
        UploadImage
    },
    data() {
        return {
            image: '',
            files: null
        }
    },
    methods: {
        onFileChange(e) {
            this.files = e.target.files || e.dataTransfer.files;
            if (!this.files.length)
                return;
            this.createImage(this.files[0]);
        },
        onUpload() {
            const formData = new FormData()
            formData.append('id', this.id)
            formData.append('image', this.files[0], this.files[0].name)
            this.$store.dispatch('uploadImage', formData)
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        removeImage: function (e) {
            this.image = '';
        },
        
    },
    mounted() {
        M.AutoInit()
    },
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
</style>