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
                <p>{{ article.price + ' ' + article.priceCurrency }}</p>
                <!--<div class="images">
                    <b-container fluid class="p-4 bg-dark">
                        <b-row>
                            <b-col v-for="image in article.images">
                                <b-img thumbnail fluid :src="image.src" />
                            </b-col>
                        </b-row>
                    </b-container>
                </div>-->
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
                console.log(response)
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
    }
}
</script>
