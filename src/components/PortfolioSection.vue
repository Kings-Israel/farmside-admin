<template>
    <div>
        <h4 id="">Portfolio Section</h4>
        <div class="row">
            <div class="col s12">
                <div class="col s6">
                    <uploader
                        v-model="fileList"
                        :limit=5
                        title=""
                        :autoUpload="false"
                    ></uploader>
                    <button @click="uploadPhotos" :disabled="fileList.length != 5" type="submit" class="btn btn-outline-secondary mt-2">Submit</button>
                </div>
                <div class="col s6">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Image Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in pageOfItems" :key="i">
                                <td>{{item.originalName}}</td>
                                <td class="delete-icon"><i @click="deletePhoto(item.fileName)" class="tiny material-icons">delete</i></td>
                            </tr>
                            <br>
                            <jw-pagination :items="portfolioImages" :pageSize="5" @changePage="onChangePage" class="pagination"></jw-pagination>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="file-field input-field">
            <div class="btn grey">
                <span>Image</span>
                <input type="file" name="image" @change="onFileChange" accept="video/*">
            </div>
            <div class="file-path-wrapper">
                <input type="text" class="file-path validate">
            </div>
        </div>
        <button @click="onUploadVideo" class="btn mt-2 mr-2" style="display: flex; margin-left: 220px;">Upload</button>
    </div>
</template>

<script>
import JwPagination from 'jw-vue-pagination'
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import { mapGetters } from 'vuex'
import Uploader from "vux-uploader-component";
export default {
    name: 'PortfolioSection',
    components: {
        JwPagination, Uploader
    },
    data() {
        return {
            fileList: [],
            video: null,
            pageOfItems: []
        }
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems
        },
        uploadPhotos() {
            const formData = new FormData()
            formData.append('images', this.fileList[0].blob)
            formData.append('images', this.fileList[1].blob)
            formData.append('images', this.fileList[2].blob)
            formData.append('images', this.fileList[3].blob)
            formData.append('images', this.fileList[4].blob)
            this.$store.dispatch('uploadPortfolioImages', formData).then(() => {
                if (this.status === 'Portfolio Images Updated') {
                    this.$notify({type: 'success', text: 'Portfolio Images Updated'})
                    this.fileList = []
                } else {
                    this.$notify({type: 'error', text: 'Failed to update images'})
                }
            })
        },
        deletePhoto(name) {
            this.$store.dispatch('deletePortfolioImage', name).then(() => {
                if(this.status === 'Deleted Portfolio Image'){
                    this.$notify({type: 'success', text: `Delete image from portfolio images`})
                } else {
                    this.$notify({type: 'error', text: `Failed to delete image`})
                }
            })
        },
        onFileChange(e) {
            this.video = e.target.files || e.dataTransfer.files;
        },
        onUploadVideo() {
            this.$store.dispatch('uploadPortfolioVideo', this.video).then(() => {
                if (this.status === 'Portfolio video uploaded') {
                    this.$notify({type: 'success', text: 'Video Uploaded Successfuly'})
                    console.log(this.portfolioVideos)
                } else {
                    this.$notify({type: 'error', text: 'Error Uploading Video'})
                }
            })
        }
    },
    created() {
        M.AutoInit()
    },
    mounted() {
        
    },
    computed: {
        ...mapGetters([
            'status', 'portfolioImages', 'portfolioVideos'
        ])
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';
.pagination {
    margin: 5px;
}
.delete-icon i {
    font-size: 20px;
    margin: 0 5px;
}

.delete-icon i:hover {
    color: rgb(253, 0, 0);
    cursor: pointer;
}
</style>