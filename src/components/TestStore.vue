<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<script>
// <script setup>
// import { ref } from 'vue'
export default {
  props: ["msg"],
  data() {
    return {
      count: 0
    }
  },

}
// defineProps({
//   msg: String,
// })

// const count = ref(0)

</script>


<style scoped>
h1 {
  color: red;
}
</style>
