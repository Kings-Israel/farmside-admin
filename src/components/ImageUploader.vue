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
        <div class="file-field input-field">
            <div class="btn grey">
                <span>Image</span>
                <input type="file" name="image" @change="onFileChange" >
            </div>
            <div class="file-path-wrapper">
                <input type="text" class="file-path validate">
            </div>
        </div>
        <button @click="onUpload" class="btn mt-2 mr-2" style="float: right">Upload</button>
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
export default {
    name: "ImageUploader",
    props: ['id', 'profile_pic'],
    data() {
        return {
            files: null,
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
            formData.append('image', this.files[0])
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