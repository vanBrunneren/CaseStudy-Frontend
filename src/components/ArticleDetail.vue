<template>
    <div class="content">
        <div v-if="loading">
            <div class="article">
                <h3>Loading...</h3>
            </div>
        </div>
        <div v-else>
            <div class="article">
                <h2>{{ article.name }}</h2>
                <p>{{ article.description }}</p>
                <p>{{  Math.round(article.price * currencyFactor * 100) / 100 + ' ' + currency }}</p>
                <b-img v-for="image of article.productPicture" :src="image.base64" fluid alt="Responsive image" />
                <div class="basket-field">
                    <b-form inline>
                        <label class="sr-only" for="insertBasket">Anzahl</label>
                        <b-input class="mb-2 mr-sm-2 mb-sm-0" id="basketInput" v-model="basketInput" value="1" />
                        <b-button v-on:click="addToCart(article)" variant="primary">In den Warenkorb legen</b-button>
                    </b-form>
                </div>
                <div class="articles-field">
                    <router-link to="/articles">
                        <b-button class="detail-button" type="submit" variant="secondary">Alle Artikel anzeigen</b-button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        background-color: lightgray;
        flex: 1;
        flex-direction: column;
    }

    .article {
        background-color: lightgray;
        margin: 20px !important;
    }

    .articles-field {
        margin-top: 20px !important;
    }

    .images {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .basket-field {
        margin-top: 20px !important;
    }

</style>

<script>

import axios from 'axios'

export default {
    methods: {
        addToCart(article) {
            if(this.basketInput) {
                if(this.basketInput > 0) {
                    this.$emit('add-to-cart', article.id, parseInt(this.basketInput))
                }
            } else {
                this.$emit('add-to-cart', article.id, 1)
            }
        }
    },
    mounted () {
        axios
            .get('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id)
            .then(response => {
                this.article = response.data
                this.loading = false
            })
    },
    data () {
        return {
            basketInput: 1,
            loading: true,
            article: {}
        }
    },
    props: {
        currency: {
            type: String,
            default: ''
        },
        currencyFactor: {
            type: Number,
            default: ''
        }
    },
}
</script>
