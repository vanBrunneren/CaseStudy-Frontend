<template>
    <div class="content">
        <div class="login-title">
            <h1>Login</h1>
        </div>
        <div>
            <b-form
                @submit="onSubmit">
                <b-form-group id="emailInputGroup"
                    label="E-Mail Adresse:"
                    label-for="emailInput">
                    <b-form-input id="emailInput"
                        type="email"
                        v-model="email"
                        required
                        placeholder="E-Mail Adresse">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="passwordInputGroup"
                    label="Passwort:"
                    label-for="passwordInput">
                    <b-form-input id="passwordInput"
                        type="password"
                        v-model="password"
                        required
                        placeholder="Passwort">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Absenden</b-button>
            </b-form>
        </div>
    </div>
</template>

<style scoped>
    .content {
        background-color: lightgray;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
export default {
    data () {
        return {
            errors: [],
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit: function(e) {

            e.preventDefault();

            if(this.email && this.password) {
                this.$emit('login', this.email, this.password)
                return true;
            }

            this.errors = [];

            if(!this.email) {
                this.errors.push('Email erforderlich')
            }

            if(!this.password) {
                this.errors.push('Passwort erforderlich')
            }

        }
    }
}
</script>
