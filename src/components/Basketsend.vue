<template>
    <div style="padding-top: 20px;" v-if="!send">
        <b-container fluid>
            <b-row>
                <b-col><h3>Bestellübersicht</h3></b-col>
            </b-row>
            <b-row>
                <b-col><h5 style="padding-top: 20px;">Artikel</h5></b-col>
            </b-row>
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
                <b-col><b>Total</b></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>
            <b-row>
                <b-col><h5 style="padding-top: 20px;">Adresse</h5></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Anrede:</b-col>
                <b-col>{{ user.sex }}</b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Vorname:</b-col>
                <b-col>{{ user.prename }}</b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Nachname:</b-col>
                <b-col>{{ user.name }}</b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Strasse / Nr:</b-col>
                <b-col>{{ user.str }}</b-col>
            </b-row>
            <b-row>
                <b-col sm="2">PLZ:</b-col>
                <b-col>{{ user.plz }}</b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Ort:</b-col>
                <b-col>{{ user.ort }}</b-col>
            </b-row>
        </b-container>
        <div class="send-button">
            <router-link to="/basket">
                <b-button class="left-button" type="submit" variant="secondary">
                    Zurück zum Warenkorb
                </b-button>
            </router-link>
            <b-button v-on:click="sendOrder" type="submit" variant="primary">
                Verbindlich bestellen
            </b-button>
        </div>
    </div>
    <div v-else>
        <b-container style="padding-top: 20px;" fluid>
            <b-row>
                <b-col><h3>Vielen Dank für Ihre Bestellung!</h3></b-col>
            </b-row>
            <b-row>
                <b-col>
                    <router-link to="/articles">
                        <b-button class="left-button" type="submit" variant="primary">
                            Zurück zu den Artikeln
                        </b-button>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style scoped>
    .left-button {
        margin-right: 20px !important;
    }
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
        },
        user: {
            type: Object,
            default: {}
        }
    },
    data: function() {
        return {
            send: false
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
        },
        sendOrder() {
            this.$emit('send-order')
            this.send = true
        }
    }
}
</script>
