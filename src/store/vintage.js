import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            vintages: [],
            vintageDetail: [],
            cart: [],
            orders: [],
        }
    },
    getters: {
            cartItems(state) {
                return state.cart;
            },
    },
    mutations: {
        setVintageData(state, payload) { 
            state.vintages = payload;
        },
        setVintageDetail(state, payload) {
            state.vintageDetail = payload;
        },
        setNewVintage(state, payload) {
            state.vintages.push(payload);
        },
        addToCart(state, payload) {
            state.cart.push(payload);
        },
        // remove product from cart
        removeFromCart(state, index) {
            state.cart.splice(index, 1);
        },
        clearCart(state) {
            state.cart = [];
        },
        setOrders(state, payload) {
            state.orders = payload;
        },
        
    },
    actions: {
        async getVintageData({commit}) {
            try {
                const  { data } = await axios.get(
                    "https://vintage-project-c5980-default-rtdb.firebaseio.com/vintages.json"
                )
                const arr = []
                for (let key in data) {
                    arr.push({id: key, ...data[key]})
                }
                commit('setVintageData', arr)
            } catch (err) {
                console.log(err);
            }
        },
        async getVintageDetail ({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://vintage-project-c5980-default-rtdb.firebaseio.com/vintages/${payload}.json`
                )
                commit("setVintageDetail", data)
            } catch (err) {
                console.log(err);
            }
        },
         // add product to cart
         addToCart({ commit }, vintage) {
            commit('addToCart', vintage);
        },
        async addNewVintage({ commit, rootState }, payload) {
            const newData = {
                ...payload,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId,
            }

            try {
                const { data } = await axios.post(
                    `https://vintage-project-c5980-default-rtdb.firebaseio.com/vintages.json?auth=${rootState.auth.token}`, newData);
                    
                    commit("setNewVintage", { id: data.name, ...newData });
            } catch (err) {
                console.log(err);
            }
        },
        async deleteVintage ({ dispatch, rootState }, payload) {
            try {
                const { data } = await axios.delete
                (
                    `https://vintage-project-c5980-default-rtdb.firebaseio.com/vintages/${payload}.json?auth=${rootState.auth.token}`
                );
                await dispatch("getVintageData")
            } catch (err) {
                console.log(err);
            }
        },
        async updateVintage({ dispatch, rootState }, { id, newVintage}) {
            try {
                const { data } = await axios.put
                (
                 `https://vintage-project-c5980-default-rtdb.firebaseio.com/vintages/${id}.json?auth=${rootState.auth.token}`, newVintage   
               );
                await dispatch("getVintageData");
            } catch (err) {
                console.log(err);
            }
        },
        async confirmOrder({ commit, state, rootState }) {
            const orderData = {
                items: state.cart,
                userId: rootState.auth.userLogin.userId,
                username: rootState.auth.userLogin.username,
                orderDate: Date.now()
            };
    
            try {
                // Send the cart data as an order to Firebase
                await axios.post(
                    `https://vintage-project-c5980-default-rtdb.firebaseio.com/orders.json?auth=${rootState.auth.token}`,
                    orderData
                );
    
                // Clear the cart after successful submission
                commit("clearCart");
    
            } catch (err) {
                console.log(err);
            }
        },
        async getOrderHistory({ commit, rootState }) {
            try {
                const { data } = await axios.get(
                    `https://vintage-project-c5980-default-rtdb.firebaseio.com/orders.json?auth=${rootState.auth.token}`
                );
        
                const orders = [];
                for (let key in data) {
                    // Only include orders that belong to the authenticated user
                    if (data[key].userId === rootState.auth.userLogin.userId) {
                        orders.push({ id: key, ...data[key] });
                    }
                }
                commit('setOrders', orders);
            } catch (err) {
                console.log(err);
            }
        }
        
    }
}