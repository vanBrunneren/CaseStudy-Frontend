<template>
    <b-container fluid class="content">
        <b-row>
            <b-col cols="12" md="3">
                <h1>Kategorien</h1>
            </b-col>
            <b-col cols="12" md="9">
                <h1>Artikel</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" md="3">
                <b-list-group>
                    <b-list-group-item v-for="category in categories" class="justify-content-between align-items-center">
                        <div style="flex-direction: row; display: flex; padding-bottom: 10px;">
                            <div style="display: flex; flex: 1;">
                                <router-link v-if="category.id == categoryId" style="text-decoration: underline;" :to="'/articles/category/' + category.id">
                                    {{ category.name }}
                                </router-link>
                                <router-link v-else :to="'/articles/category/' + category.id">
                                    {{ category.name }}
                                </router-link>
                            </div>
                            <!-- <div><b-badge variant="primary" pill>{{ category.amount }}</b-badge></div> -->
                        </div>
                        <b-list-group>
                            <b-list-group-item v-for="subcategory in category.inverseParentCategoryNavigation" class="d-flex justify-content-between align-items-center">
                                <router-link v-if="subcategory.id == categoryId" :to="'/articles/category/' + subcategory.id">
                                    <p style="text-decoration: underline;">{{ subcategory.name }}</p>
                                </router-link>
                                <router-link v-else :to="'/articles/category/' + subcategory.id">
                                    <p>{{ subcategory.name }}</p>
                                </router-link>
                                <!-- <b-badge variant="primary" pill>{{ subcategory.amount }}</b-badge> -->
                            </b-list-group-item>
                        </b-list-group>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="12" md="9">
                <div v-if="groupedArticles.length > 0">
                    <b-container style="padding-left: 0px;">
                        <b-row v-for="articles in groupedArticles">
                            <b-col :key="article.id" v-for="article in articles" class="article">
                                <!--<b-img :src="'data:image/jpeg;base64,'+article.productPicture[0].src" fluid alt="Responsive image" />-->
                                <h3>{{ article.name }}</h3>
                                <p>{{ Math.round(article.price * currencyFactor*100)/100 + ' ' + currency }}</p>
                                <b-form inline>
                                    <b-form-group id="basketGroup">
                                        <b-input :id="'basket-input_'+article.id" class="basket-input" value="1" v-model="basketInput[article.id]" />
                                        <b-button @click="addToCart(article)" class="basket-button" variant="primary">in Warenkorb</b-button>
                                    </b-form-group>
                                </b-form>
                                <router-link :to="'/articles/'+ article.id">
                                    <b-button class="detail-button" type="submit" variant="primary">
                                        Zum Angebot
                                    </b-button>
                                </router-link>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div v-else>
                    <div v-if="loading">
                        <h3>Loading...</h3>
                    </div>
                    <div v-else>
                        <h3>Keine Artikel in dieser Kategorie</h3>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped>

    h1 {
        margin-bottom: 10px !important;
    }

    .article > h2 {
        margin-bottom: 20px !important;
    }

    .basket-input {
        width: 60px !important;
    }

    .basket-button {
        margin-left: 4px !important;
    }

    .detail-button {
        margin-top: 10px !important;
    }

    .content {
        padding-top: 20px;
    }

    .article {
        padding: 30px !important;
        background-color: lightgray;
        margin: 30px !important;
        margin-left: 0px !important;
        margin-top: 0px !important;
        border-radius: 4px;
        border-width: 1px;
        border-color: black;
        border-style: solid;

    }

</style>

<script>

import axios from 'axios'

export default {
    computed:{
        groupedArticles() {
            let tempArticles = [];
            if(this.articles.length > 0) {
                for(let article of this.articles) {
                    /*if(this.$route.params.categoryId) {
                        if(article.productCategories) {
                            if(article.productCategories.indexOf(parseInt(this.$route.params.categoryId)) !== -1) {
                                tempArticles.push(article);
                            }
                        }
                    } else {*/
                    if(article.visibility === "ACTIVE") {
                        tempArticles.push(article);
                    }
                    //}
                }
                return _.chunk(tempArticles, 3)
            }
            return tempArticles
        },
        categoryId() {
            return parseInt(this.$route.params.categoryId);
        }
    },
    methods: {
        addToCart(article) {
            if(this.basketInput[article.id]) {
                if(this.basketInput[article.id] > 0) {
                    this.$emit('add-to-cart', article, parseInt(this.basketInput[article.id]))
                }
            } else {
                this.$emit('add-to-cart', article, 1)
            }
        }
    },
    watch: {
        '$route': function(from, to) {
            
            if(this.$route.path === "/articles") {
                axios
                    .get('https://ti5-spirit-webshop.azurewebsites.net/api/products')
                    .then(response => {
                        this.articles = response.data
                    })
            }

            if(this.catId !== to.categoryId) {
                this.catId = this.$route.params.categoryId
                axios
                    .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories/'+this.$route.params.categoryId+'/products')
                    .then(response => {
                        this.articles = response.data
                    })
            }

        }
    },
    mounted () {

        if(this.$route.params.categoryId) {

            this.catId = this.$route.params.categoryId

            axios
                .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories/'+this.$route.params.categoryId+'/products')
                .then(response => {
                    this.articles = response.data
                })
                .then( axios
                        .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories')
                        .then(response => {
                            for(let cat of response.data) {
                                if(!cat.parentCategory) {
                                    this.categories.push(cat)
                                }
                            }
                            this.loading = false
                        })
                )

        } else {

            axios
                .get('https://ti5-spirit-webshop.azurewebsites.net/api/products')
                .then(response => {
                    this.articles = response.data
                })
                .then( axios
                        .get('https://ti5-spirit-webshop.azurewebsites.net/api/categories')
                        .then(response => {
                            for(let cat of response.data) {
                                if(!cat.parentCategory) {
                                    this.categories.push(cat)
                                }
                            }
                            this.loading = false
                        })
                )

        }

    },
    data () {
          return {
            input: {},
            basketInput: [],
            articles: [],
            categories: [],
            loading: true,
            catId: null
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


/*
articles: [
    {
        id: 1231231,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            1,
            11
        ],
        status: 'active'
    },
    {
        id: 1231232,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231233,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231234,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231235,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231236,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231237,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231238,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231239,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231220,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 1231237,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123144,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123155,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123166,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123177,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123188,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123199,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123178,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123187,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123169,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 123159,
        title: 'Testbier',
        description: 'Das Testbier aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
            { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
            { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
        ],
        categories: [
            12,
            16
        ],
        status: 'active'
    },
    {
        id: 234234249,
        title: 'TestWhiskey',
        description: 'Der Whiskey aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/530x530/9df78eab33525d08d6e5fb8d27136e95/l/a/lagavulin_16_years_70cl72dpi.jpg'},
            { title: 'image2', src: 'https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/530x530/9df78eab33525d08d6e5fb8d27136e95/n/i/nikka_coffey_malt_whisky_70cl_72dpi.jpg'},
            { title: 'image3', src: 'https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/530x530/9df78eab33525d08d6e5fb8d27136e95/t/h/the-macallan-sherry-12.jpg'},
        ],
        categories: [
            1,
            4
        ],
        status: 'active'
    },
    {
        id: 234234339,
        title: 'Test Grappa',
        description: 'Der Grappa aus Testikon ist Testens gut',
        images: [
            { title: 'image1', src: 'https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/530x530/9df78eab33525d08d6e5fb8d27136e95/g/r/grappa_berta_elisi_50cltest72dpi.jpg'},
            { title: 'image2', src: 'https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/530x530/9df78eab33525d08d6e5fb8d27136e95/g/r/grappa_sandro_bottega_barricata_riserva_privata_70cltest72dpi.jpg'},
            { title: 'image3', src: 'https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/530x530/9df78eab33525d08d6e5fb8d27136e95/m/a/marzadro_amarone_70cl_72dpi.jpg'},
        ],
        categories: [
            66,
            34
        ],
        status: 'hidden'
    },
],

categories: [
    {
        id: 1,
        title: 'Bier',
        amount: 5,
        categories: [
            {
                id: 11,
                title: 'National',
                amount: 16
            },
            {
                id: 12,
                title: 'International',
                amount: 21
            }
        ]
    },
    {
        id: 2,
        title: 'Whiskey',
        amount: 6,
        categories: [
            {
                id: 21,
                title: 'Irish Whiskey',
                amount: 12
            },
            {
                id: 22,
                title: 'Bourbon',
                amount: 2
            }
        ]
    },
    {
        id: 3,
        title: 'Vodka',
        amount: 23,
        categories: [
            {
                id: 31,
                title: 'Roggen Vodka',
                amount: 2
            },
            {
                id: 32,
                title: 'Moscow Mule',
                amount: 5
            }
        ]
    },
    {
        id: 4,
        title: 'Rum',
        amount: 4,
        categories: [
            {
                id: 41,
                title: 'Spiced Rum',
                amount: 13
            },
            {
                id: 42,
                title: 'Melasse Rum',
                amount: 6
            }
        ]
    },
    {
        id: 5,
        title: 'Gin',
        amount: 1,
        categories: [
            {
                id: 51,
                title: 'Dry Gin',
                amount: 9
            },
            {
                id: 52,
                title: 'Genever',
                amount: 12
            }
        ]
    }
]
*/










</script>
