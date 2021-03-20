<template>
  <div id="app">
    <transition
    :name="transitionName"
    mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
const DEFAULT_TRANSITION = "fade";
export default {
  name: 'App',
  data() {
    return {
        transitionName: DEFAULT_TRANSITION,
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
        let transitionName = to.meta.transitionName || from.meta.transitionName

        if(transitionName === 'slide') {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-right'
        }

        this.transitionName = transitionName || DEFAULT_TRANSITION

        next()
      })
  },
  mounted() {
    
    
    
  }
}
</script>

<style>
* {
  transition: .3s;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
#page-header {
  margin-top: 0;
  text-align: right;
}
</style>
