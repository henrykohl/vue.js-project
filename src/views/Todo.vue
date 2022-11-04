<template>
<div class="todo">
    <h1>This is a todo page</h1>
    <router-link to="/todo" replace>All</router-link>｜
    <router-link to="/todo?filter=active" replace>Active</router-link>｜
    <router-link :to="{ name: 'Todo', query:{ filter: 'done'} }" replace>Done</router-link>
    <!-- name: 'Todo' 或是 path: '/todo'; 有了replace就不會增加歷史記錄 -->
    <!-- <p>show: {{ filter }}</p>
    <div>{{ list }}</div> -->
    <ul>
      <!-- 直接用v-model綁定 store裡面的資料，不是一個好方法 -->
      <!-- <li v-for="item of list" :key="item.tId">
        <template v-if="edit!==item.tId">
          <input type="checkbox" v-model="item.todo.done">{{ item.todo.content }}
        </template>
        <template v-else>
          <input type="text" v-model="item.todo.content">
        </template>
      </li> -->
      <TodoItem
        v-for="item of list"
        :key="item.tId+''+item.todo.content"
        :todo="item.todo"
        :edit="item.tId===editid"
        @check="value => checkHandler(item.tId,value)"

        @editThis="editid = item.tId"
        @editComplete="value => editCompleteHandler(item.tId,value)"
      />
    </ul>
</div>
</template>

<script>
import TodoItem from '../components/TodoItem'
export default {
  data () {
    return {
      filter: 'all', // all.active.done
      editid: null // 原始是用 edit，易搞混:edit="item.tId===edit"
    }
  },
  mounted () {
    console.log('Todo.vue 讀取localstorage資料...')
    this.$store.dispatch('READ_TODOS')
  },
  computed: {
    list () {
      console.log('> rung...')
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
        /* 下一行作用: 正在編輯時，若沒按下"完成"，就切換 route ，則編輯狀態會被reset */
        this.editid = null
        this.filter = route.query.filter || 'all'
      }
    }
  },
  methods: {
    // checkHandler (check) {
    //   console.log(check)
    // },

    checkHandler (tId, done) {
      console.log(tId, done)
      this.$store.dispatch('CHECK_TODO', { tId, done })
    },
    editCompleteHandler (tId, content) {
      // console.log(tId, content)
      this.editid = null
      this.$store.dispatch('UPDATE_TODO', { tId, content })
    }
  },
  components: {
    TodoItem
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
