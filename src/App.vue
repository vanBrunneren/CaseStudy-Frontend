<template>
    <div id="app">
        <div id="app-container">
            <b-navbar toggleable="md" type="dark" variant="dark">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand><router-link to="/"><b-img rounded="circle" src="/logo.jpg" fluid alt="Logo" /></router-link></b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item>
                            <router-link to="/articles">Artikel</router-link>
                        </b-nav-item>
                        <!--<b-nav-item href="/categories">Kategorien</b-nav-item>-->
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item>
                            <p v-if="currency === 'CHF'" style="color: green" @click="changeCurrency('CHF')">CHF</p>
                            <p v-else @click="changeCurrency('CHF')">CHF</p>
                        </b-nav-item>
                        <b-nav-item>
                            <p v-if="currency === 'USD'" style="color: green" @click="changeCurrency('USD')">USD</p>
                            <p v-else @click="changeCurrency('USD')">USD</p>
                        </b-nav-item>
                        <b-nav-item>
                            <p v-if="currency === 'EUR'" style="color: green" @click="changeCurrency('EUR')">EUR</p>
                            <p v-else @click="changeCurrency('EUR')">EUR</p>
                        </b-nav-item>
                        <b-nav-item>
                            <p v-if="currency === 'JPY'" style="color: green" @click="changeCurrency('JPY')">JPY</p>
                            <p v-else @click="changeCurrency('JPY')">JPY</p>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link to="/basket">Warenkorb ({{ cartCount }})</router-link>
                        </b-nav-item>
                        <b-nav-item-dropdown right v-if="this.user">
                            <!-- Using button-content slot -->
                            <template slot="button-content">
                                <em>{{ this.user.username }}</em>
                            </template>
                            <b-dropdown-item><router-link to="/user/profile">Daten ändern</router-link></b-dropdown-item>
                            <b-dropdown-item><router-link to="/user/profile">Passwort ändern</router-link></b-dropdown-item>
                            <b-dropdown-item><router-link to="/user/orders">Bestellungen</router-link></b-dropdown-item>
                            <b-dropdown-item v-if="this.user.isAdmin"><router-link to="/articles/edit">Artikel bearbeiten</router-link></b-dropdown-item>
                            <b-dropdown-item v-if="this.user.isAdmin"><router-link to="/category/edit">Kateogiren bearbeiten</router-link></b-dropdown-item>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item right v-else>
                            <router-link to="/login">Login</router-link>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <router-view
            @send-order="sendOrder"
            @save-user-data="saveUserData"
            @increase-article="increaseArticle"
            @decrease-article="decreaseArticle"
            @remove-article="removeArticle"
            @add-to-cart="addToCart"
            @login="login"
            :user="this.user"
            :basket="this.cart"
            :currency="this.currency"
            :currencyFactor="this.currencyFactor"></router-view>
    </div>
</template>

<style scoped>
    #app {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .menu-link {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .placeholder {
        flex-grow: 1;
    }

    .activeCurrency {
        color: green;
    }
</style>

<script>

import axios from 'axios'

export default {
    data () {
        return {
            cart: [],
            user: {},
            currency: 'CHF',
            currencyFactor: 1
        }
    },
    beforeMount() {
        if(localStorage.user) {
            this.user = JSON.parse(localStorage.user)
        }
        if(localStorage.cart) {
            this.cart = JSON.parse(localStorage.cart)
        }
    },
    computed: {
        cartCount() {
            return this.cart.length
        }
    },
    methods: {
        changeCurrency(curr) {
            this.currency = curr
            axios
                .get('https://api.exchangeratesapi.io/latest?base=CHF')
                .then( response => {
                    this.currencyFactor = response.data.rates[curr]
                })
        },
        logout() {
            this.user = null
            localStorage.user = null
            this.$router.push('/')
        },
        login(username, password) {

            axios
                .post('https://ti5-spirit-webshop.azurewebsites.net/api/users/login', {
                    email: username,
                    password: password
                })
                .then( response => {
                    this.user = {
                        username: username,
                        isAdmin: response.data.isAdmin
                    }
                    localStorage.user = JSON.stringify({username: username, isAdmin: response.data.isAdmin})
                    this.$router.push('/')
                })

        },
        addToCart(article, amount) {
            let set = false;
            for(let i in this.cart) {
                if(this.cart[i].article.id === article.id) {
                    this.cart[i].amount += amount;
                    set = true;
                }
            }
            if(!set) {
                this.cart.push({
                    amount: amount,
                    article: article
                });
            }

            localStorage.cart = JSON.stringify(this.cart)
        },
        increaseArticle(article) {
            for(let item of this.cart) {
                if(item.article.id === article.article.id) {
                    item.amount++;
                }
            }
            localStorage.cart = JSON.stringify(this.cart)
        },
        decreaseArticle(article) {
            for(let i in this.cart) {
                if(this.cart[i].article.id == article.article.id) {
                    if(this.cart[i].amount > 1) {
                        this.cart[i].amount--;
                    } else {
                        this.cart.splice(i, 1);
                    }
                }
            }
            localStorage.cart = JSON.stringify(this.cart)
        },
        removeArticle(article) {
            for(let i in this.cart) {
                if(this.cart[i].article.id == article.article.id) {
                    this.cart.splice(i, 1);
                }
            }
            localStorage.cart = JSON.stringify(this.cart)
        },
        saveUserData(user) {
            this.user = user
            localStorage.user = JSON.stringify(this.user);
        },
        sendOrder() {
            this.cart = []
            localStorage.cart = JSON.stringify(this.cart)
        }
    }
}
</script>
