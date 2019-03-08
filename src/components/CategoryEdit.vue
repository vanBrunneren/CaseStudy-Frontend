<template>
    <div class="article-content">
        <div v-if="loading">
            <div class="article">
                <h3>Loading...</h3>
            </div>
        </div>
        <div v-else>
            <h2>Kategorien bearbeiten</h2>
            <router-link :to="'/category/create'">
                <b-button variant="success">Kategorie erstellen</b-button>
            </router-link>
            <div>
                <b-table striped hover responsive :items="categories" :fields="fields">

                    <template slot="parentCategoryNavigation" slot-scope="data">
                        <p v-if="data.value">{{ data.value.name }}</p>
                    </template>

                    <template slot="action" slot-scope="data">
                        <router-link :to="'/articles/edit/'+ data.item.id"><b-button variant="primary">Bearbeiten</b-button></router-link>
                        <b-button v-on:click="removeCategory(data.item.id)" variant="danger">Löschen</b-button>
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
        removeCategory: function(categoryId) {
            axios.delete('https://ti5-spirit-webshop.azurewebsites.net/api/categories/'+categoryId)
                .then( () => {
                    this.loading = true
                    axios
                        .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories')
                        .then(response => {
                            this.categories = response.data
                            this.loading = false
                        })
                })
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
                    key: 'parentCategoryNavigation',
                    sortable: true,
                    label: 'Oberkategorie'
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
            .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories')
            .then(response => {
                this.categories = response.data
                this.loading = false
            })
    }

}
</script>
