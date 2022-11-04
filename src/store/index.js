/*eslint-disable*/
import Vue from "vue";
import Vuex from "vuex";
import LocalStorage from "../modules/localStorage";

Vue.use(Vuex);

const STORE = LocalStorage("todo-vue"); // new LocalStorage("todo-vue");

export default new Vuex.Store({
  state: {
    todos: [],
    /* Todo.vue中mounted會去讀取localstorage的資料，這裡的todos就不需要了 */
    // todos: [
    //   { content: 123, done: false },
    //   { content: 456, done: true },
    //   { content: 789, done: false },
    // ],
    /*實際案例中需要用API去讀取遠端資料，是非同步，如此用store直接存取～不合適*/
    // todos: STORE.load()
  },
  getters: {
    //原始資料轉為有id的模式 (現在沒有後端DB，list去做出把資料id拿出來)
    list(state) {
      return state.todos.map((todo, tId) => {
        // console.log("todo=", todo, " tId=", tId);
        return {
          tId,
          todo,
        };
      });
    },
    filterList(state, getters) {
      return (filter) => {
        let status = null;
        switch (filter) {
          case "all":
            return getters.list;
          case "active":
            status = false;
            break;
          case "done":
            status = true;
            break;
          // case 'active':
          //   return getters.list.filter((todo) => {return !todo.todo.done})
          // case 'done':
          //   return getters.list.filter((todo) => {return todo.todo.done})
          // default:
          //   return []
        }
        return getters.list.filter((todo) => {
          return todo.todo.done === status;
        });
      };
    },
    // filterList1 (state) {
    //   return (filter) => {
    //   }
    // or return function(filter){
    // }
    // },
    // filterList2: (state) => (filter) => {
    // }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
  },
  actions: {
    CREATE_TODO({ commit }, { todo }) {
      // 1. POST //if使用API 就只需要 axios.post()
      const todos = STORE.load();
      todos.push(todo);
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId: todos.length - 1,
        todo,
      };
    },
    READ_TODOS({ commit }) {
      // 1. load (讀取) const todos = window.localStorage.getItem("XXX");
      const todos = STORE.load();
      // 2. commit mutation (寫入 state) commit("SET_TODOS", todos);
      commit("SET_TODOS", todos);
      // 3. return return { todos };
      return {
        todos,
      };
    },
    /* (project#1) UPDATE方法一:整包傳入，更新，後整包寫回 */
    // UPDATE_TODO({ commit }, { tId, todo }) {
    //   // 1. PATCH //if使用API 可以用到 axios.patch()
    //   const todos = STORE.load();
    //   todos.splice(tId, 1, todo);
    //   STORE.save(todos);
    //   // 2. commit mutation
    //   commit("SET_TODOS", todos);
    //   // 3. return
    //   return {
    //     tId,
    //     todo,
    //   };
    // },
    /* (project#2) UPDATE方法二: 只傳內容content */
    UPDATE_TODO({ commit, state }, { tId, content }) {
      // 1. PATCH axios.patch()
      if (state.todos[tId].content === content) return;
      console.log("API");
      const todos = STORE.load();
      // todos.splice(tId, 1, todo)
      todos[tId].content = content;
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId,
        todo: todos[tId],
      };
    },

    CHECK_TODO({ commit }, { tId, done }) {
      // UPDATE_TODO ({ commit }, { tId, content }) {
      // 1. PATCH axios.patch()
      const todos = STORE.load();
      /*console.log(todos[tId]);*/
      todos[tId].done = done;
      // todos[tId].content = content
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId,
        todo: todos[tId],
      };
    },
    DELETE_TODO({ commit }, { tId }) {
      // 1. DELETE //if使用API 就只需要 axios.delete()
      const todos = STORE.load();
      const todo = todos.splice(tId, 1)[0];
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId: null,
        todo,
      };
    },
    CLEAR_TODOS({ commit }) {
      const todos = [];
      STORE.save(todos);
      commit("SET_TODOS", todos);
      return {
        todos,
      };
    },
  },
  // modules: {
  // }
});
