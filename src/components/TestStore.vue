<template>
  <div class="wrapper">
    <span class="goods">
      <div class="header">
        Курс:
      </div>
      <div class="demo-collapse">
        <el-collapse v-model="activeName" accordion @click="handleChange">
          <el-collapse-item v-for="item in items" :key="item.id" :title="item.title" :name="item.id">
            <ul>
              <li v-for="val in item.value" :key="val.val_id">
                {{ val.text }}
              </li>
            </ul>

          </el-collapse-item>
        </el-collapse>
      </div>
    </span>
    <span class="basket">
      <div class="header">
        <span>Обновление через:</span>
        <span>11:11</span>
        <span>Logo</span>
      </div>
      <div>
      <el-table :data="tableData" stripe class="basket">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>

      </div>
    </span>
  </div>

</template>

<script>
// <script lang="ts" setup>
// import { ref } from 'vue'
// const activeName = ref('0')
export default {
  props: ["msg"],
  data() {
    return {
      activeName: 0,
      items: [
        {
          id: 1,
          title: "Consistency",
          value: [
            {
              val_id: 1,
              text: "Consistent with real life: in line with the process and logic of real\n " +
                  "life, and comply with languages and habits that the users are used to",
            },
            {
              val_id: 2,
              text: "Consistent within interface: all elements should be consistent, such\n" +
                  "as: design style, icons and texts, position of elements, etc.",
            }
          ]


        },
        {
          id: 2,
          title: "Feedback",
          value: [
            {
              val_id: 1,
              text: "Operation feedback: enable the users to clearly perceive their\n" +
                  "operations by style updates and interactive effects;"
            },
            {
              val_id: 3,
              text: ""
            },
            {
              val_id: 2,
              text: "Visual feedback: reflect current state by updating or rearranging\n" +
                  "elements of the page."
            },
          ],
        },
        {
          id: 3,
          title: "Efficiency",
          value: [
            {
              val_id: 1,
              text: "Simplify the process: keep operating process simple and intuitive;",
            },
            {
              val_id: 2,
              text: "Definite and clear: enunciate your intentions clearly so that the\n" +
                  "users can quickly understand and make decisions;",
            },
            {
              val_id: 3,
              text: "Easy to identify: the interface should be straightforward, which helps\n" +
                  "the users to identify and frees them from memorizing and recalling.",
            },
          ],
        },
        {
          id: 4,
          title: "Controllability",
          value: [
            {
              val_id: 1,
              text: "Decision making: giving advices about operations is acceptable, but do\n" +
                  "not make decisions for the users;",
            },
            {
              val_id: 2,
              text: "Controlled consequences: users should be granted the freedom to\n" +
                  "operate, including canceling, aborting or terminating current\n" +
                  "operation.",
            }
          ],
        },
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    }
  },
  // methods: {
  //   handleChange() {
  //     debugger
  //     console.log(this)
  //   }
  // }
}
</script>


<style lang="scss" scoped>
.wrapper{
  display: flex;
  margin: 20px;
  gap: 200px;
  justify-content: space-between;
  //max-width: 800px;
}
.header{
  padding: 20px 10px;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  gap: 10px;
}
.basket{
  //width: 500px;
}
.demo-collapse{
  width: 600px;
}
</style>
<style>
.el-collapse-item__header{
  flex-direction: row-reverse;
}
</style>
