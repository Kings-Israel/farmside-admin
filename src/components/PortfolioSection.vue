<template>
    <div>
        <h4 id="">Portfolio Section</h4>
        <div class="row">
            <div class="col s12">
                <div class="col s6">
                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th>Image title</th>
                                <th>Date Uploaded</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(image, i) in images" :key="i">
                                <td>{{image.title}}</td>
                                <td>{{Date.now()}}</td>
                                <td><i class="material-icons">delete</i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
export default {
    name: 'PortfolioSection',
    components: {
        
    },
    data() {
        return {
            images: [
                {title: 'Image1', url:'https://images.unsplash.com/photo-1593519544785-fd359b7068f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'},
                {title: 'Image2', url:'https://images.unsplash.com/photo-1610386056137-dfb0cc50dca6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'},
                {title: 'Image3', url:'https://images.unsplash.com/photo-1585060666628-13a693d06876?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=327&q=80'},
                {title: 'Image4', url:'https://images.unsplash.com/photo-1613832482150-d4cd4eddb174?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'},
            ],
        }
    },
    methods: {
        deleteImage() {
            console.log(this.$refs)
        }
    },
    created() {
        M.AutoInit()
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';
</style>