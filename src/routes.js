import HomePage from "./components/pages/HomePage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from "./components/pages/SignupPage.vue"
import DetailPage from "./components/pages/DetailPage.vue"
import UserPage from "./components/pages/UserPage.vue"
import NewVintagePage from "./components/pages/NewVintagePage.vue"
import EditVintagePage from "./components/pages/EditVintagePage.vue"
import VintageListOther from "./components/vintage/VintageListOther.vue"
import CartPage from "./components/pages/CartPage.vue"
import CheckoutVintage from "./components/cart/CheckoutVintage.vue";
import { store } from "./store/index";
import Cookies from "js-cookie";

export const routes = [
    { 
        path: "/",
        name: "homePage",
        component: HomePage,
        beforeEnter: () => {
            checkAuth();
        }
    },
    {
        path: "/user/:component", // ingat diisi :component
        name: "userPage",
        component: UserPage, 
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        }
    },
    { 
        path: "/new-vintage", 
        name: "newVintagePage", 
        component: NewVintagePage, 
        beforeEnter: (to, from, next) => {
        checkAuth() ? next() : next({ name: "login" });
        },
    },
    { 
        path: "/vintage/edit/:id", 
        name: "editVintagePage",
        component: EditVintagePage, 
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        }
    },
    { path: "/signup", name: "signup", component: SignupPage },
    { path: "/login", name: "login", component: LoginPage },
    { path: "/other", name: "other", component: VintageListOther },
    { path: "/vintage/cart", name: "cartPage", component: CartPage },
    { path: "/vintage/checkout", name: "cartCheckout", component: CheckoutVintage },
    { path: "/vintage/:id", name: "detailPage", component: DetailPage }, //pasangin ID di path seperti ini (/:id) nanti jangan lupa
];

const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if(new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }
};

