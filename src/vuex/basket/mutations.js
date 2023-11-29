const mutations = {
    ADD_TO_BASKET(state, goods) {
        if (state.basket.length === 0) {
            state.basket.push(goods);
        } else {
            const productInd = state.basket.findIndex((el) => el.productId === goods.productId)
            if (productInd >= 0) {
                state.basket[productInd].quantity++
                state.basket[productInd].cost = state.basket[productInd].quantity * state.basket[productInd].price
            } else {
                state.basket.push(goods);
            }
        }
        state.basket.totalCost = 0
        state.basket.forEach((el) => state.basket.totalCost += el.cost)
    },
    DELETE_FROM_BASKET(state, goods) {
        const productInd = state.basket.findIndex((el) => el.productId === goods.productId)
        if (productInd >= 0 && state.basket[productInd].quantity > 0) {
            state.basket[productInd].quantity--
            state.basket[productInd].cost = state.basket[productInd].quantity * state.basket[productInd].price
        } else {
            // state.basket.push(goods);
        }
        state.basket.totalCost = 0
        state.basket.forEach((el) => state.basket.totalCost += el.cost)
    },
}
export default mutations;
