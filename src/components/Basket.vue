<template>
    <div>
        <div style="padding-left: 20px; padding-top: 20px;">
            <h1>Warenkorb</h1>
        </div>
        <b-container fluid>
            <b-row>
                <b-col>Artikelnummer</b-col>
                <b-col>Artikel</b-col>
                <b-col>Menge</b-col>
                <b-col>Einzepreis</b-col>
                <b-col>Preis</b-col>
                <b-col>Entfernen</b-col>
            </b-row>
            <b-row :key="item.articleId" v-for="item in basket">
                <b-col>{{ item.article.id }}</b-col>
                <b-col>{{ item.article.name }}</b-col>
                <b-col><span class="span-button" @click="increaseArticle(item)">+</span> {{ item.amount }} <span class="span-button" @click="decreaseArticle(item)">-</span></b-col>
                <b-col>{{ item.article.price + ' ' + item.article.priceCurrency }}</b-col>
                <b-col>{{ (item.article.price * item.amount) + ' ' + item.article.priceCurrency }}</b-col>
                <b-col><span class="span-button" @click="removeArticle(item)">X</span></b-col>
            </b-row>
            <b-row>
                <b-col><b>Total</b></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col><b>{{ total + ' ' + currency }}</b></b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
        <div class="send-button">
            <div v-if="basket.length > 0">
                <router-link to="/basket/send">
                    <b-button type="submit" variant="primary">
                        Bestellung absenden
                    </b-button>
                </router-link>
            </div>
            <b-button v-else type="submit" variant="primary" disabled>
                Bestellung absenden
            </b-button>
        </div>
    </div>
</template>

<style scoped>
    .send-button {
        padding-top: 30px;
        display: flex;
        padding-left: 30px;
    }
    .span-button {
        cursor: pointer;
    }
</style>

<script>

import axios from 'axios'

export default {
    props: {
        basket: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            currency: 'CHF'
        }
    },
    computed: {
        total() {
            let total = 0
            for(let item of this.basket) {
                total += (item.article.price * item.amount)
            }
            return total
        }
    },
    methods: {
        increaseArticle(article) {
            this.$emit('increase-article', article)
        },
        decreaseArticle(article) {
            this.$emit('decrease-article', article)
        },
        removeArticle(article) {
            this.$emit('remove-article', article)
        }
    }
}
</script>
