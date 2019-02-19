<template>
    <div class="content">
        <h2>Herzlich Willkommen bei Spirit Gonzales</h2>
        <b-img src="speedy.gif" fluid alt="Responsive image" />
        <div class="button-group">
            <router-link to="/articles">
                <b-button type="submit" variant="primary">zu den Artikeln</b-button>
            </router-link>
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

    .button-group {
        margin: 20px !important;
    }

    h2 {
        margin-bottom: 15px !important;
    }

</style>
