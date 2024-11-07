import { createStore } from "vuex";
import vintage from "./vintage";
import auth from "./auth";

export const store =createStore({
    modules: {
        vintage,
        auth,

    },
})