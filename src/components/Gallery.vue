<template>
    <div>
        <h4 id="page-header">Gallery Section</h4>
        <!-- Photos Section -->
        <photo-gallery />
        <!-- br -->
        <br>
        <hr>
        <!-- Videos Section -->
        <video-gallery />
    </div>
</template>

<script>
import M from 'materialize-css'
import PhotoGallery from './PhotoGallery.vue'
import VideoGallery from './VideoGallery.vue'
export default {
    name: 'Gallery',
    components: { PhotoGallery, VideoGallery },
    mounted() {
        M.AutoInit()
    },
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';
</style>