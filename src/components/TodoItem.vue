<template>
    <li>
      <template v-if="!edit">
        <!-- <input type="checkbox" v-model="editingTodo.done">{{ todo.content }} -->
        <input type="checkbox" v-model="done">{{ todo.content }}
        <button @click="$emit('editThis')">編輯</button>
      </template>
      <template v-else>
        <!-- <input type="text" v-model="editingTodo.content"> -->
        <!-- <input type="text" v-model="content"> -->
        <!-- 可以用v-focus="123" 看看有什麼有意思的地方(注意expression與name的變化); 有了v-focus可以在按下編輯編輯按鈕後，游標自動進到 編輯框內-->
        <input type="text" v-model="editContent"  v-focus="editContent">
        <button @click="$emit('editComplete',editContent)">完成</button>
      </template>
    </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editContent: ''
    }
  },
  /* 在v-model="content"情況下，沒有此mounted 將content寫入editContent，會造成 編輯時，若 沒有改變原本內容，按下"編輯"按鈕，則此元件送往父層的內容(editContent)是空值~注意：此時computed的set不會有作用，因為content的內容沒變! 當然，如果編輯時 改變原本內容，按下"編輯"按鈕，則此元件送往父層的內容(editContent)是更新過的新值(透過computed運作)  */
  mounted () {
    this.editContent = this.todo.content
  },
  computed: {
    /* 改成 v-model="editContent"後，就不需要這部分 */
    // content: {
    //   get () {
    //     return this.todo.content
    //   },
    //   set (value) {
    //     console.log(value)
    //     this.editContent = value
    //   }
    // },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.$emit('check', value)
      }
    }
  }
  // data () {
  //   return {
  //     editingTodo: {
  //       content: '',
  //       done: false
  //     }
  //   }
  // },
  // mounted () {
  //   this.editingTodo.content = this.todo.content
  //   this.editingTodo.done = this.todo.done
  // }
}
</script>
