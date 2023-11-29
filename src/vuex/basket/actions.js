const actions = {
    addGoods({commit}, goods) {
        commit("ADD_TO_BASKET", goods);
    },
    delGoods({commit}, goods) {
        commit("DELETE_FROM_BASKET", goods);
    },
}
export default actions;
