<template>
    <div id="app">
        <div id="app-container">
            <b-navbar toggleable="md" type="dark" variant="dark">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand href="/"><b-img rounded="circle" src="/logo.jpg" fluid alt="Logo" /></b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item href="/articles">Artikel</b-nav-item>
                        <b-nav-item href="/categories">Kategorien</b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <!-- Using button-content slot -->
                            <template slot="button-content">
                                <em>User</em>
                            </template>
                            <b-dropdown-item href="/login">Login</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
    #app {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .menu-link {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .placeholder {
        flex-grow: 1;
    }
</style>