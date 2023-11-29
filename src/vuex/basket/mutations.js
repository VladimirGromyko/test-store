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
        debugger
        const productInd = state.basket.findIndex((el) => el.productId === goods.productId)
        if (productInd >= 0 && state.basket[productInd].quantity > 1) {
            state.basket[productInd].quantity--
            state.basket[productInd].cost = state.basket[productInd].quantity * state.basket[productInd].price
        } else if (productInd >= 0 && state.basket[productInd].quantity === 1) {
            state.basket = state.basket.filter((el) => el.productId !== state.basket[productInd].productId)
        } else {
            // state.basket.push(goods);
        }
        state.basket.totalCost = 0
        state.basket.forEach((el) => state.basket.totalCost += el.cost)
    },
}
export default mutations;
