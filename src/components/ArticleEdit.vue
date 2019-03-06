<template>
    <div class="article-content">
        <div v-if="loading">
            <div class="article">
                <h3>Loading...</h3>
            </div>
        </div>
        <div v-else>
            <h2>Artikel bearbeiten</h2>
            <router-link :to="'/articles/create'">
                <b-button variant="success">Artikel erstellen</b-button>
            </router-link>
            <div>
                <b-table striped hover responsive :items="articles" :fields="fields">
                    <template slot="action" slot-scope="data">
                        <router-link :to="'/articles/edit/'+ data.item.id"><b-button variant="primary">Bearbeiten</b-button></router-link>
                        <b-button v-on:click="removeArticle(article)" variant="danger">Löschen</b-button>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<style>
    .article-content > div > h2 {
        margin-left: 20px !important;
        margin-top: 20px !important;
        margin-bottom: 10px !important;
    }

    .article-content > div > a {
        margin-left: 20px !important;
        margin-top: 20px !important;
        margin-bottom: 10px !important;
    }

</style>

<script>

import axios from 'axios'

export default {
    methods: {
        editArticle(article) {

        },
        removeArticle(article) {

        },
        createArticle(article) {

        }
    },
    data() {
        return {
            loading: true,
            articles: [],
            fields: [
                {
                    key: 'id',
                    sortable: true,
                    label: '#'
                },
                {
                    key: 'name',
                    sortable: true,
                    label: 'Name'
                },
                {
                    key: 'description',
                    sortable: true,
                    label: 'Beschreibung'
                },
                {
                    key: 'price',
                    sortable: true,
                    label: 'Preis'
                },
                {
                    key: 'priceCurrency',
                    sortable: true,
                    label: 'Währung'
                },
                {
                    key: 'stock',
                    sortable: true,
                    label: 'Lagermenge'
                },
                {
                    key: 'orderQuantity',
                    sortable: true,
                    label: 'Bestellmenge'
                },
                {
                    key: 'productCategories',
                    sortable: true,
                    label: 'Kategorien'
                },
                {
                    key: 'visibility',
                    sortable: true,
                    label: 'Sichtbarkeit'
                },
                {
                    key: 'action',
                    label: 'Aktion'
                }
            ]
        }
    },
    mounted () {
        axios
            .get('https://ti5-spirit-webshop.azurewebsites.net/api/products')
            .then(response => {
                this.articles = response.data
                this.loading = false
            })
    }

}
</script>
