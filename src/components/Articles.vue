<template>
    <div class="content">
        <h1>Artikel</h1>
        <div v-for="article in articles" class="article">
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
            ]
        }
    }
}
</script>
