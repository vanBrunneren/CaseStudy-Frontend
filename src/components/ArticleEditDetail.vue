<template>
    <div class="content">
        <b-container fluid>
            <b-row>
                <b-col sm="12"><h1 style="padding-bottom: 20px">Artikel erstellen</h1></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Name</b-col>
                <b-col><b-input v-model="article.name" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Beschreibung</b-col>
                <b-col><b-input v-model="article.description" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">price</b-col>
                <b-col><b-input v-model="article.price" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Währung</b-col>
                <b-col><b-input v-model="article.priceCurrency" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Lagerbestand</b-col>
                <b-col><b-input v-model="article.stock" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Bestellmenge</b-col>
                <b-col><b-input v-model="article.orderQuantity" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Kategorien</b-col>
                <b-col><b-input v-model="article.productCategories" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Sichtbarkeit</b-col>
                <b-col><b-input v-model="article.visibility" /></b-col>
            </b-row>
            <b-row>
                <b-col sm="2"></b-col>
                <b-col>
                    <b-button v-on:click="saveData" type="submit" variant="primary">
                        Speichern
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style>
    .content {
        margin-left: 20px !important;
        margin-top: 20px !important;
    }
</style>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            loading: true,
            article: {
                name: '',
                description: '',
                price: '',
                priceCurrency: '',
                stock: '',
                orderQuantity: '',
                productCategories: '',
                visibility: ''
            }
        }
    },
    mounted () {
        axios
            .get('http://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id)
            .then(response => {
                console.log(response)
                this.article = response.data
                this.loading = false
            })
    },
    methods: {
        saveData() {
            // Make Rest Call
            console.log(this.article)
        }
    }
}
</script>
