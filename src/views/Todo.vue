<template>
<div class="todo">
    <h1>This is a todo page</h1>
    <router-link to="/todo" replace>All</router-link>｜
    <router-link to="/todo?filter=active" replace>Active</router-link>｜
    <router-link :to="{ name: 'Todo', query:{ filter: 'done'} }" replace>Done</router-link>
    <!-- name: 'Todo' 或是 path: '/todo'; 有了replace就不會增加歷史記錄 -->
    <p>show: {{ filter }}</p>
    <div>{{ list }}</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      filter: 'all' // all.active.done
    }
  },
  computed: {
    list () {
      // console.log('>', this)
      return this.$store.getters.filterList(this.filter)
      /* 不要用this.$router.route.query.filter 這資料不應該被這一頁所處理，儘管拿得這樣的資料 */
    }
  },
  watch: {
    /* function 型 : 注意，預設watch 進入新網址第一次(手動切換網址)是不會執行的 */
    // $route: function (route) {
    //   // check query 這部分 省略; 亂打網址 redirect 的部分 也省略~~
    //   this.filter = route.query.filter || 'all'
    // }
    /* 物件 型 */
    $route: {
      immediate: true,
      handler: function (route) {
        this.filter = route.query.filter || 'all'
      }
    }
  }
}
</script>

<style scoped>
.todo a{
  color: black;
  text-decoration: none;
}
.todo .router-link-exact-active{
  color: green;
  font-weight: bold;
}
</style>
