<template>
  <div class="about">
    <h1>This is an Post Number page</h1>
    <!-- {{postData}} -->
    <!-- 注意：這裡的postData是呼叫computed而非直接讀取require所獲得的postData（未經過Vue處理），因為那是讀不到的 -->
    <template v-if="disSelect !== null">
      <!-- 在第一組select中的option 用 :value="dis.zip" -->
      <!-- {{ disSelect }} -->
      <!-- 在第二組select中的option 用 :value="index" -->
      {{ districts[disSelect].zip }}
    </template>
    <select v-model="citySelect">
    <!-- V-model 改成 v-bind + v-on  -->
    <!-- <select :value="citySelect" @change="updateVal($event)"> -->
    <!-- <select v-model="cityComputed"> -->
      <option :value="null">請選擇</option>
      <!-- <option v-for="(city,index) of postData" :value="index" :key="city">{{ city }}</option> -->
      <option v-for="(city,index) of cities" :value="index" :key="city">{{ city }}</option>
    </select>
    <!-- {{districts}} -->
    <select v-model="disSelect">
      <option :value="null">請選擇</option>
      <!-- <option v-for="dis of districts" :value="dis.zip" :key="dis.name">{{ dis.name }}</option> -->
      <option v-for="(dis,index) of districts" :value="index" :key="dis.name">{{ dis.name }}</option>
    </select>
  </div>
</template>

<script>
// const postData = require('@/assets/post.json')
const postDataCH = require('@/assets/post.json')
const postDataEN = require('@/assets/postEN.json')
export default {
  data () {
    return {
      lang: 0, // 0=> 中文,1=>英文
      citySelect: null,
      disSelect: null
    }
  },
  computed: {
    // cityComputed: {
    //   get () {
    //     return this.citySelect
    //   },
    //   set (val) {
    //     this.citySelect = val
    //     // this.disSelect = null
    //     if (this.disSelect >= postData[val].districts.length) this.disSelect = 0
    //   }
    // },
    /* 原本是postData 後改成 cities */
    cities () {
      // return postData
      return this.postData.map((item) => {
        return item.name
      })
      // return this.lang === 0 ? postDataCH : postDataEN
    },
    districts () {
      let districts = []
      if (this.citySelect !== null) {
        districts = this.postData[this.citySelect].districts
        // .map((item) => {return item.name})
      }
      return districts
    },
    /* 使用多國語言版，則Vue中其他地方(三處)用到postData的，要改成postData() */
    postData () {
      return this.lang === 0 ? postDataCH : postDataEN
    }
  },
  watch: {
    citySelect (nVal, oVal) {
      // console.log(nVal, oVal)
      // if (nVal !== oVal) this.disSelect = null
      // this.disSelect = null
      if (this.disSelect >= this.postData[this.citySelect].districts.length) this.disSelect = 0
    }
  }
  /* 測試用  */
  // methods: {
  //   updateVal (event) {
  //     this.citySelect = event.target.value
  //   }
  // }
}
</script>
