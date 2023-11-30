<template>
  <div class="wrapper">
    <span class="goods-wrapper">
      <div class="header">
        <span>Курс:</span>
        <el-input
            v-model="rate"
            :formatter="(value) => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\₽\s?|(,*)/g, '')"
        />
      </div>
      <div class="demo-collapse">
        <el-collapse v-model="activeName" accordion @change="handleChange">
          <el-collapse-item
              v-for="item in idNames"
              :key="item"
              :title="names[item]['G']"
              :name="item"
              :class="groupState(item) ? 'full' : 'empty'"
          >
            <span v-if="groupGoods.length">
              <span v-for="goods in groupGoods" :key="goods" class="goods">
                <span class="goods-record">
                  <span class="goods-name">{{recordName(goods)}}</span>
                  <el-button class="goods-price">₽ {{goods['C_RUB']}}</el-button>
                  <span class="separator">|</span>
                  <el-button
                      type="primary"
                      class="goods-price"
                      @click="addPurchase(goods)"
                  >
                    <ShoppingTrolley class="icon"/>
                    <span style="vertical-align: middle">Купить</span>
                  </el-button>
                </span>
              </span>
            </span>
          </el-collapse-item>
        </el-collapse>
      </div>
    </span>
    <span class="basket">
      <div class="header">
        <span>Обновление через:</span>
        <span>{{ currentTime }} :</span>
      </div>
      <el-table :data="getBasket.purchases" stripe class="basket">
<!--        <el-table-column prop="date" label="Раздел" width="100" />-->
<!--        <el-table-column prop="name" label="Товар" min-width="100" />-->
<!--        <el-table-column prop="address" label="Количество" min-width="80"/>-->
<!--        <el-table-column  label="Стоимость" min-width="80"/>-->
<!--        <el-table-column  label="Действие" min-width="50"/>-->
        <el-table-column prop="groupName" label="Раздел" width="100" />
        <el-table-column prop="product" label="Товар" min-width="100" />
        <el-table-column prop="quantity" label="Количество" min-width="80"/>
        <el-table-column  prop="cost" label="Стоимость" min-width="80"/>

        <el-table-column label="Действие" min-width="60">
          <template #default="scope">
            <el-button type="danger" size="small" @click.prevent="delPurchase(scope.row)">
              <el-icon style="vertical-align: middle">
                <Delete/>
              </el-icon>
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="total-price">
        <span>Общая стоимость:</span>
        <span>
          <span class="total-price__value">₽ {{totalCost(getBasket.totalCost)}}</span>
          <span class="total-price__value"></span>
          <span class="total-price__fraction"></span>
        </span>
      </div>
    </span>
  </div>

</template>

<script>
// <script lang="ts" setup>
// import { ref } from 'vue'
import dataGoods from '../assets/data.json';
import namesGoods from '../assets/names.json';
import ShoppingTrolley from "../assets/shopping.svg";

// const activeName = ref('0')
export default {
  props: ["msg"],
  components: {
    ShoppingTrolley,
  },
  data() {
    return {
      activeName: 0,
      rate: 75,
      goods: dataGoods.Value.Goods,
      names: namesGoods,
      groupGoods: [],
      currentTime: 10,
      timer: null,
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
  computed: {

    idNames () {
      return Object.keys(this.names)
    },
    getGoods() {
      return JSON.parse(JSON.stringify(this.goods))
    },
    getBasket () {
      const {purchases, totalCost} = this.$store.getters.getBasket
      return {purchases, totalCost}
    }
  },
  watch: {
    rate(newVal) {
      this.handleChange()
      this.$store.dispatch("updateCurrency", +newVal)
    },
    currentTime(time) {
      if (time === 0) {
        this.stopTimer()
        this.startTimer()
      }
    }
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    handleChange() {
      if (this.activeName) {
        this.groupGoods = this.updateCost(+this.activeName)
      }
    },
    updateCost(group) {
      const groupGoods = []
      this.getGoods.forEach((el) => {
        if (el['G'] === group) {
          el['C_RUB'] = +(el['C'] * this.rate).toFixed(1)
          groupGoods.push(el)
        }
      })
      return groupGoods
    },
    groupState(item){
      const goods = this.getGoods.filter((el) => el['G'] === +item)
      return !!goods.length
    },
    recordName(val) {
      const names = this.names
      return this.activeName && `${names[this.activeName]['B'][val['T']]['N']} (${val['P']})`
    },
    addPurchase(item) {
      const names = this.names
      const goods = {
        groupName: names[item['G']]['G'],
        groupId: item['G'],
        product: names[item['G']]['B'][item['T']]['N'],
        productId: item['T'],
        price: item['C_RUB'],
        priceCurrency: item['C'],
        quantity: 1,
        cost: item['C_RUB'],
        rate: +this.rate
      }
      this.$store.dispatch("addGoods", goods)
    },
    delPurchase(item) {
      this.$store.dispatch("delGoods", item)
    },
    totalCost(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
      this.currentTime = 10
    },
  },
}
</script>


<style lang="scss" scoped>
.wrapper{
  display: flex;
  margin: 20px;
  gap: 100px;
}
.header{
  padding: 20px 10px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .el-input{
    max-width: 100px;
  }
}
.basket{}
.demo-collapse{
  min-width: 600px;
}
.total-price{
  display: flex;
  padding-top: 20px;
  flex-direction: column;
}
.total-price__value {
  font-weight: bold;
  font-size: 18px;
}
.total-price__fraction {
  font-weight: bold;
  font-size: 12px;
}
.goods{
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #fafafa;
}
.goods-record{
  display: flex;
  align-items: center;
  padding: 2px 0 2px 20px;
}
.goods-name{
  display: flex;
  width: 350px;
  line-height: 1.3;
  cursor: pointer;
}
.goods-price{
  width: 90px;
  height: 24px;
}
.separator{
  padding: 0 5px 0 10px;
  font-size: 18px;
  color: #b1b1b1;
}
.icon{
  padding: 0 10px 0 0;
}
</style>
<style>
.el-collapse-item__header{
  flex-direction: row-reverse;
  justify-content: flex-end;
  padding-left: 10px;
}
.el-collapse-item__arrow {
  margin: 0 8px 0 0
}
.el-collapse {
  border-left: 1px solid var(--el-collapse-border-color);
  border-right: 1px solid var(--el-collapse-border-color);
  --el-collapse-header-bg-color: 'none';
}
.el-collapse .empty{

  --el-collapse-header-text-color: #a8a8a8;
}
.full. el-collapse-item__wrap{
  border-bottom: none;
}
.el-collapse-item__content{
  padding-bottom: 0;
}
.el-collapse-item.light {
    background: #ffffff;
}
.el-collapse-item.full, .el-collapse-item.empty {
    background: #fafafa;
}
</style>
