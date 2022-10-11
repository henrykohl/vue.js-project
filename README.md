# vue.js-playground

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Self Test Notes

READ
window.localStorage.setItem('todo-vue','[123]')
$vm0.$store.dispatch('READ_TODOS')
$vm0.$store.dispatch('READ_TODOS').then((result)=>{ console.log(result) })

CREATE
$vm0.$store.dispatch('CREATE_TODO',{todo:456})

UPDATE
window.localStorage.setItem('todo-vue','[123,456,789]')
$vm0.$store.dispatch('READ_TODOS').then((result)=>{ console.log(result) })
$vm0.$store.dispatch('UPDATE_TODO',{tId:1,todo:999}).then((result)=>{console.log(result) })

DELETE
$vm0.$store.dispatch('DELETE_TODO',{tId:1}).then((result)=>{console.log(result)})

ACCESS ALL ITEMS
window.localStorage.getItem('todo-vue')

---

window.localStorage.setItem('todo-vue',JSON.stringify([{ content: 123, done: false }, { content: 456, done: true }, { content: 789, done: false }]))
$vm0.$store.dispatch('READ_TODOS').then((result)=>{ console.log(result) })

$vm0.$store.dispatch("UPDATE_TODO",{tId:1, todo:{content:999,done:true}})
