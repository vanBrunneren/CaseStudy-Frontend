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
                            <router-link to="/basket">Warenkorb ({{ cartCount }})</router-link>
                        </b-nav-item>
                        <b-nav-item-dropdown right v-if="this.user.username">
                            <!-- Using button-content slot -->
                            <template slot="button-content">
                                <em>{{ this.user.username }}</em>
                            </template>
                            <b-dropdown-item><router-link to="/user/profile">Daten ändern</router-link></b-dropdown-item>
                            <b-dropdown-item><router-link to="/user/orders">Bestellungen</router-link></b-dropdown-item>
                            <b-dropdown-item><router-link to="/articles/edit">Artikel bearbeiten</router-link></b-dropdown-item>
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
            :basket="this.cart"></router-view>
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
</style>

<script>
export default {
    data () {
        return {
            cart: [],
            user: {}
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
        logout() {
            this.user = {}
            localStorage.username = null
        },
        login(username, password) {
            if(username && password) {
                this.user = {
                    username: username
                }
                localStorage.user = JSON.stringify({username: username});
                this.$router.push('/');
            }
        },
        addToCart(articleId, amount) {
            let set = false;
            for(let i in this.cart) {
                if(this.cart[i].articleId === articleId) {
                    this.cart[i].amount += amount;
                    set = true;
                }
            }
            if(!set) {
                this.cart.push({
                    amount: amount,
                    articleId: articleId
                });
            }

            localStorage.cart = JSON.stringify(this.cart)
        },
        increaseArticle(articleId) {
            for(let item of this.cart) {
                if(item.articleId == articleId) {
                    item.amount++;
                }
            }
            localStorage.cart = JSON.stringify(this.cart)
        },
        decreaseArticle(articleId) {
            for(let i in this.cart) {
                if(this.cart[i].articleId == articleId) {
                    if(this.cart[i].amount > 1) {
                        this.cart[i].amount--;
                    } else {
                        this.cart.splice(i, 1);
                    }
                }
            }
            localStorage.cart = JSON.stringify(this.cart)
        },
        removeArticle(articleId) {
            for(let i in this.cart) {
                if(this.cart[i].articleId == articleId) {
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
