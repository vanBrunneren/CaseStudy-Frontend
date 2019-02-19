<template>
    <b-container fluid class="content">
        <b-row>
            <b-col cols="12">
                <h1>Warenkorb</h1>
                <div v-for="item in basket">
                    <p>{{ item.articleId + ' ' + item.amount}}</p>
                </div>
            </b-col>
        </b-row>
        <b-row>

        </b-row>
    </b-container>
</template>

<style scoped>


</style>

<script>
export default {
    props: {
        basket: {
            type: Array,
            default: []
        }
    }
}
</script>
