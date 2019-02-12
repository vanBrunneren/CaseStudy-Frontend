<template>
    <div class="content">
        <h2>Herzlich Willkommen bei Spirit Gonzales</h2>
        <b-img src="speedy.gif" fluid alt="Responsive image" />
        <div class="button-group">
            <b-button type="submit" variant="primary" href="/articles">Artikel</b-button>
            <b-button type="submit" variant="primary" href="/categories">Kategorien</b-button>
        </div>
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        background-color: lightgray;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .button-group > a {
        margin: 20px !important;
    }

    h2 {
        margin-bottom: 15px !important;
    }

</style>
