<template>
    <div class="article-edit-content">
        <b-container fluid>
            <b-row>
                <b-col sm="12"><h1 style="padding-bottom: 20px">Artikel bearbeiten</h1></b-col>
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
                <b-col sm="2">CHF Preis</b-col>
                <b-col><b-input v-model="article.price" /></b-col>
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
                <b-col>
                    <b-form-select v-model="article.productCategory">
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </b-form-select>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2">Sichtbarkeit</b-col>
                <b-col>
                    <b-form-select v-model="article.visibility" :options="visibility" />
                </b-col>
            </b-row>
            <b-row v-for="image in articleImages">
                <b-col sm="2"></b-col>
                <b-col>
                    <b-img :src="image.base64" fluid alt="Artikelbild" />
                </b-col>
                <b-col>
                    <b-button v-on:click="deleteImage(image.id)" type="submit" variant="danger">
                        Bild löschen
                    </b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2">
                    Bild hinzufügen
                </b-col>
                <b-col>
                    <b-form-file
                        accept="image/jpeg, image/png, image/gif"
                        v-model="file"
                        :state="Boolean(file)"
                        placeholder="Bild hochladen..."
                        drop-placeholder="Bild hochladen..." />
                </b-col>
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
    .article-edit-content {
        margin-left: 20px !important;
        margin-top: 20px !important;
    }
</style>

<script>

import axios from 'axios'

export default {
    computed:{
        articleImages() {
            let values = []
            if(this.article && this.article.productPicture) {
                for(let picture of this.article.productPicture) {
                    values.push(picture)
                }
            }
            return values
        }
    },
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
                productCategory: '',
                visibility: ''
            },
            categories: {},
            visibility: [],
            file: null
        }
    },
    mounted () {
        axios
            .get('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id)
            .then(response => {
                this.article = response.data
                if(this.article.productCategory && this.article.productCategory[0]) {
                    this.article.productCategory = this.article.productCategory[0].fkCategory
                }
                this.loading = false
            })

        axios
            .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories')
            .then(response => {
                this.categories = response.data
            })

        this.visibility = [
            { value: 'ACTIVE', text: 'Sichtbar' },
            { value: 'HIDDEN', text: 'Unsichtbar' }
        ]

    },
    methods: {
        deleteImage(imageId) {
             axios.delete('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id+'/pictures/'+imageId)
             this.loading = true
             axios
                 .get('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id)
                 .then(response => {
                     this.article = response.data
                     if(this.article.productCategory && this.article.productCategory[0]) {
                         this.article.productCategory = this.article.productCategory[0].fkCategory
                     }
                     this.loading = false
                 })
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        saveData() {
            if(this.file) {
                this.getBase64(this.file).then(
                  data => {
                      axios.post('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id+'/pictures', {
                          base64: data
                      })
                  }
                );
            }
            axios.delete('https://ti5-spirit-webshop.azurewebsites.net/api/categories/'+this.article.productCategory+'/products/'+this.article.id)
            axios.post('https://ti5-spirit-webshop.azurewebsites.net/api/categories/'+this.article.productCategory+'/products', {
                fkProduct: this.article.id,
                fkCategory: this.article.productCategory
            })

            delete this.article.productCategory
            delete this.article.productPicture
         
            axios.put('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id, this.article)

            this.article = {}
            this.loading = true
            axios
                .get('https://ti5-spirit-webshop.azurewebsites.net/api/products/'+this.$route.params.id)
                .then(response => {
                    this.article = response.data
                    if(this.article.productCategory && this.article.productCategory[0]) {
                        this.article.productCategory = this.article.productCategory[0].fkCategory
                    }
                    this.loading = false
                })

        }
    }
}
</script>
