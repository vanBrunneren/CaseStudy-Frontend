<template>
    <div class="content">
        <h1>Artikel</h1>
        <div class="article">
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
            <div class="images">
                <div v-for="image in article.images">
                    <b-img thumbnail :src="image.src" fluid alt="Logo" />
                </div>
            </div>
            <b-form inline>
                <label class="sr-only" for="insertBasket">Anzahl</label>
                <b-input class="mb-2 mr-sm-2 mb-sm-0" id="insertBasket" value="1" />
                <b-button variant="primary">In den Warenkorb legen</b-button>
            </b-form>
            <b-button type="submit" variant="primary" :href="'/articles/'+ article.id">Zum Angebot</b-button>
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
        background-color: #DDDDDD;
        margin: 20px !important;
    }

    .images {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

</style>

<script>
export default {
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
