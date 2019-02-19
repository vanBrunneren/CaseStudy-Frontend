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
                <b-col>Preis</b-col>
                <b-col>Entfernen</b-col>
            </b-row>
            <b-row :key="item.articleId" v-for="item in basket">
                <b-col>{{ item.articleId }}</b-col>
                <b-col></b-col>
                <b-col><span class="span-button" @click="increaseArticle(item.articleId)">+</span> {{ item.amount }} <span class="span-button" @click="decreaseArticle(item.articleId)">-</span></b-col>
                <b-col></b-col>
                <b-col><span class="span-button" @click="removeArticle(item.articleId)">X</span></b-col>
            </b-row>
            <b-row>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
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
export default {
    props: {
        basket: {
            type: Array,
            default: []
        }
    },
    methods: {
        increaseArticle(articleId) {
            this.$emit('increase-article', articleId)
        },
        decreaseArticle(articleId) {
            this.$emit('decrease-article', articleId)
        },
        removeArticle(articleId) {
            this.$emit('remove-article', articleId)
        }
    }
}
</script>
