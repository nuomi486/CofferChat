<template>
    <div class="main">
        <router-view></router-view>
        <TabbarNav/>
    </div>
</template>
<script>
import TabbarNav from '@/components/TabbarNav.vue';
export default {
    name: "Main",
    data() {
        return {
            // active: 0
        };
    },
    components: { TabbarNav },
    // beforeMount(){
    //     // if(this.$route.path != '/main/home') this.$router.push({name:'Home'});
    // }
}
</script>