const mutations = {
    ADD_TO_BASKET(state, goods) {
        const purchases = state.basket.purchases
        if (purchases.length === 0) {
            purchases.push(goods);
        } else {
            const productInd = purchases.findIndex((el) => el.productId === goods.productId)
            if (productInd >= 0) {
                purchases[productInd].quantity++
                purchases[productInd].cost = purchases[productInd].quantity * purchases[productInd].price
            } else {
                purchases.push(goods);
            }
        }
        state.basket.totalCost = 0
        purchases.forEach((el) => state.basket.totalCost += el.cost)
    },
    DELETE_FROM_BASKET(state, goods) {
        let purchases = state.basket.purchases
        const productInd = purchases.findIndex((el) => el.productId === goods.productId)
        if (productInd >= 0 && purchases[productInd].quantity > 1) {
            purchases[productInd].quantity--
            purchases[productInd].cost = purchases[productInd].quantity * purchases[productInd].price
        } else if (productInd >= 0 && purchases[productInd].quantity === 1) {
            state.basket.purchases = purchases.filter((el) => el.productId !== purchases[productInd].productId)
        }
        state.basket.totalCost = 0
        purchases.forEach((el) => state.basket.totalCost += el.cost)
    },
}
export default mutations;
