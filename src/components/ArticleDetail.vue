<template>
    <div class="content">
        <div class="article">
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
            <div class="images">
                <b-container fluid class="p-4 bg-dark">
                    <b-row>
                        <b-col v-for="image in article.images">
                            <b-img thumbnail fluid :src="image.src" />
                        </b-col>
                    </b-row>
                </b-container>
            </div>
            <div class="basket-field">
                <b-form inline>
                    <label class="sr-only" for="insertBasket">Anzahl</label>
                    <b-input class="mb-2 mr-sm-2 mb-sm-0" id="insertBasket" v-model="basketInput" value="1" />
                    <b-button v-on:click="addToCart(article.id)" variant="primary">In den Warenkorb legen</b-button>
                </b-form>
            </div>
            <div class="articles-field">
                <router-link to="/articles">
                    <b-button class="detail-button" type="submit" variant="secondary">Alle Artikel anzeigen</b-button>
                </router-link>
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
export default {
    methods: {
        addToCart(articleId) {
            if(this.basketInput) {
                if(this.basketInput > 0) {
                    this.$emit('add-to-cart', articleId, parseInt(this.basketInput))
                }
            } else {
                this.$emit('add-to-cart', articleId, 1)
            }
        }
    },
    data () {
          return {
            article: {
                    id: 123123,
                    title: 'Testbier',
                    description: 'Das Testbier aus Testikon ist Testens gut',
                    images: [
                        { title: 'image1', src: 'https://www.beer4you.ch/cmsstatic/10124_Feldschl%C3%B6sschen_Original-1.png'},
                        { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
                        { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
                        { title: 'image2', src: 'https://www.beer4you.ch/cmsstatic/10775_(Klein)_1664-1.png'},
                        { title: 'image3', src: 'https://www.beer4you.ch/cmsstatic/10099_Feldschl%C3%B6sschen_Original-1.png'},
                    ],
                    categories: [
                        12,
                        16
                    ],
                    status: 'active'
            }
        }
    }
}
</script>
