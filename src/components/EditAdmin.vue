<template>
    <div id="edit_info">
        <h4 id="page-header">Admin Info</h4>
        <div class="row">
            <div class="col s12">
                <div class="col s6">
                    <admin-info :user="user" />
                </div>
                <div class="col s6">
                    <admin-image-uploader :id="user._id" :profile_pic="user.profile_pic" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import { mapGetters } from 'vuex'
import AdminInfo from './AdminInfo'
import AdminImageUploader from './AdminImageUploader'
export default {
    name: 'EditAdmin',
    components: {
        AdminInfo, AdminImageUploader
    },
    data() {
        return {}
    },
    mounted() {
        M.AutoInit()
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';
</style>