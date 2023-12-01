<template>
  <el-table :data="getBasket.purchases" stripe class="basket">
    <el-table-column prop="groupName" label="Раздел" width="120" />
    <el-table-column prop="product" label="Товар" min-width="200" />
    <el-table-column prop="quantity" label="Количество" align="center" min-width="80"/>
    <el-table-column label="Стоимость" align="center" min-width="120">
      <template #default="scope">
        <el-button
            :type="scope.row.priceChange"
            plain
            size="small"
            class="goods-price"
        >
          ₽ {{scope.row.cost}}
        </el-button>
      </template>
    </el-table-column>

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
</template>

<script>
export default {
  name: "Basket",
  computed: {
    /**
     * Функция-getter - возвращает объект basket - из store
     * @returns {{purchases: *, totalCost: *}}
     */
    getBasket () {
      const {purchases, totalCost} = this.$store.getters.getBasket
      return {purchases, totalCost}
    }
  },
  methods: {
    /**
     * Функция удаления товаров из корзины
     * @param item - в качестве параметра принимает товарную единицу (из массива товаров в корзине)
     * работает со store; диспачит action 'delGoods', который в дальнейшем мутирует store - удаляет из него товар item
     */
    delPurchase(item) {
      this.$store.dispatch("delGoods", item)
    },
    /**
     * Функция totalCost - преобразовывает числовое значение в наглядное представление вида - 1,000,000.00
     * @param value - в качестве параметра принимает числовое значение стоимости
     * @returns {string} - возвращает преобразованное значение
     */
    totalCost(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
