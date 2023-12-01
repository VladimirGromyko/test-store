const actions = {
    addGoods({commit}, goods) {
        commit("ADD_TO_BASKET", goods);
    },
    delGoods({commit}, goods) {
        commit("DELETE_FROM_BASKET", goods);
    },
    updateCurrency({commit}, newRate) {
        commit("UPDATE_CURRENCY", newRate);
    },
    updateData({commit}, payload) {
        commit("UPDATE_DATA", payload);
    },
}
export default actions;
