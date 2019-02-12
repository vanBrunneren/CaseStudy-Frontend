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
                            <div style="display: flex; flex: 1;"><a :href="'/category/' + category.title">{{ category.title }}</a></div>
                            <div><b-badge variant="primary" pill>{{ category.amount }}</b-badge></div>
                        </div>
                        <b-list-group>
                            <b-list-group-item v-for="subcategory in category.categories" class="d-flex justify-content-between align-items-center">
                                <a :href="'/category/' + subcategory.title">{{ subcategory.title }}</a>
                                <b-badge variant="primary" pill>{{ subcategory.amount }}</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col cols="12" md="9">
                <b-container style="padding-left: 0px;">
                    <b-row v-for="articles in groupedArticles">
                        <b-col :key="article.title" v-for="article in articles" class="article">
                            <b-img :src="article.images[0].src" fluid alt="Responsive image" />
                            <h2>{{ article.title }}</h2>
                            <b-form inline>
                                <b-form-group id="basketGroup">
                                    <b-input class="basket-input" id="insertBasket" value="1" />
                                    <b-button class="basket-button" variant="primary">in Warenkorb</b-button>
                                </b-form-group>
                            </b-form>
                            <b-button class="detail-button" type="submit" variant="primary" :href="'/articles/'+ article.id">Zum Angebot</b-button>
                        </b-col>
                    </b-row>
                </b-container>
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
        width: 40px !important;
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
export default {
    computed:{
        groupedArticles() {
            return _.chunk(this.articles, 3)
        }
    },
    data () {
          return {
            articles: [
                {
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 123123,
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
                    id: 234234234,
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
                    id: 234234324,
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
                    title: 'Bier',
                    amount: 5,
                    categories: [
                        {
                            title: 'National',
                            amount: 16
                        },
                        {
                            title: 'International',
                            amount: 21
                        }
                    ]
                },
                {
                    title: 'Whiskey',
                    amount: 6,
                    categories: [
                        {
                            title: 'Irish Whiskey',
                            amount: 12
                        },
                        {
                            title: 'Bourbon',
                            amount: 2
                        }
                    ]
                },
                {
                    title: 'Vodka',
                    amount: 23,
                    categories: [
                        {
                            title: 'Roggen Vodka',
                            amount: 2
                        },
                        {
                            title: 'Moscow Mule',
                            amount: 5
                        }
                    ]
                },
                {
                    title: 'Rum',
                    amount: 4,
                    categories: [
                        {
                            title: 'Spiced Rum',
                            amount: 13
                        },
                        {
                            title: 'Melasse Rum',
                            amount: 6
                        }
                    ]
                },
                {
                    title: 'Gin',
                    amount: 1,
                    categories: [
                        {
                            title: 'Dry Gin',
                            amount: 9
                        },
                        {
                            title: 'Genever',
                            amount: 12
                        }
                    ]
                }
            ]
        }
    }
}
</script>
