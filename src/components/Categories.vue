<template>
    <div class="content">
        <div class="title">
            <h1>Kategorien</h1>
        </div>
        <div class="list">
            <b-list-group>
                <b-list-group-item v-for="category in categories" class="d-flex justify-content-between align-items-center">
                    <a :href="'/category/' + category.title">{{ category.title }}</a>
                    <b-badge variant="primary" pill>{{ category.amount }}</b-badge>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        background-color: lightgray;
        flex: 1;
        flex-direction: column;
        align-items: center;
    }

    .title {
        margin: 20px !important;
    }

    .list {
        display: flex;
        flex: 1;
        flex-grow: 1;
    }
</style>

<script>
export default {
    data () {
          return {
            categories: [
                { title: 'Bier', amount: 5 },
                { title: 'Whiskey', amount: 6 },
                { title: 'Grappa', amount: 9 },
                { title: 'Vodka', amount: 23 },
                { title: 'Rum', amount: 4 },
                { title: 'Gin', amount: 1 }
            ]
        }
    }
}
</script>
