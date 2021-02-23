<template>
    <div>
        <h5>Change Profile Picture</h5>
        <div class="file-field input-field">
            <div class="btn grey">
                <span>Image</span>
                <input type="file" name="image" @change="onFileChange" accept="image/*">
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
    margin-top: 10px;
    margin-left: 100px;
    width: 400px;
    border-radius: 50%;
    object-fit: cover;
}
</style>