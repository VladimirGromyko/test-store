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
        <el-collapse v-model="activeName" accordion @change="handleChange(activeName)">
          <el-collapse-item
              v-for="item in idNames"
              :key="item"
              :title="names[item]['G']"
              :name="item"
              :class="groupState(item) ? 'full' : 'empty'"
          >
            <span v-if="getGroupGoods.length">
              <span v-for="goods in getGroupGoods" :key="goods" class="goods">
                <span class="goods-record">
                  <span class="goods-name">{{recordName(goods)}}</span>
                  <el-button :type="goods['C_CANGE']" plain size="small" class="goods-price">
                    ₽ {{goods['C_RUB']}}
                  </el-button>
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
      <Timer @onRunFunction="setGoods"/>
      <Basket />
    </span>
  </div>
</template>

<script>
import dataGoods from '../assets/data.json';
import namesGoods from '../assets/names.json';
import ShoppingTrolley from "../assets/shopping.svg";
import Timer from "./Timer.vue";
import Basket from "./Basket.vue";
export default {
  props: ["msg"],
  components: {
    Basket,
    ShoppingTrolley,
    Timer
  },
  data() {
    return {
      activeName: 0,
      rate: 75,
      goods: null,
      prevGoods: null,
      names: namesGoods,
      groupGoods: [],
    }
  },
  computed: {
    idNames () {
      return Object.keys(this.names)
    },
    getGroupGoods() {
      return this.groupGoods
    }
  },
  watch: {
    rate(newVal) {
      this.setPrevGoods()
      this.updateCost()
      this.handleChange(this.activeName)
      this.$store.dispatch("updateCurrency", +newVal)
    },
    goods(newGoods){
      this.updateCost()
      this.handleChange(this.activeName)
      this.$store.dispatch("updateData", { newGoods, newRate: +this.rate})
    }
  },
  beforeMount() {
    this.setGoods()
    this.updateCost()
  },
  methods: {
    setGoods() {
      this.setPrevGoods()
      this.goods = JSON.parse(JSON.stringify(dataGoods.Value.Goods))
    },
    setPrevGoods() {
      this.prevGoods = this.goods ? JSON.parse(JSON.stringify(this.goods)) : this.goods
    },
    handleChange(group) {
      this.groupGoods = this.goods.filter((el) => el['G'] === +group)
    },
    updateCost() {
      this.goods.forEach((el) => {
        el['C_RUB'] = +(el['C'] * this.rate).toFixed(1)
        el['C_CANGE'] = ''
          if (this.prevGoods){
            for(let i = 0; i < this.prevGoods.length; i++){
              if (el['T'] === this.prevGoods[i]['T']) {
                if (el['C_RUB'] < this.prevGoods[i]['C_RUB']) {
                  el['C_CANGE'] = 'success'
                } else if (el['C_RUB'] > this.prevGoods[i]['C_RUB']) {
                  el['C_CANGE'] = 'danger'
                }
              }
            }
          }
      })
    },
    groupState(item){
      const goods = this.goods.filter((el) => el['G'] === +item)
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
        priceChange: item['C_CANGE'],
        quantity: 1,
        cost: item['C_RUB'],
        rate: +this.rate
      }
      this.$store.dispatch("addGoods", goods)
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
