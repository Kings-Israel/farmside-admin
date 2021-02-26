<template>
    <div>
        <h4 id="page-header">Main Page Components</h4>
        <!-- About Section -->
        <about-section />
        <!-- br -->
        <br>
        <hr>
        <!-- Portfolio Section -->
        <portfolio-section />
    </div>
</template>

<script>
import 'material-design-icons/iconfont/material-icons.css'
import M from 'materialize-css'
import AboutSection from './AboutSection.vue'
import PortfolioSection from './PortfolioSection.vue'
export default {
  components: { AboutSection, PortfolioSection },
    name: "MainPage",
    mounted() {
        M.AutoInit()
    }
}
</script>

<style scoped>
@import 'materialize-css/dist/css/materialize.min.css';
</style>