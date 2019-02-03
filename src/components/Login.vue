<template>
    <div class="content">
        <div class="login-title">
            <h1>Login</h1>
        </div>
        <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="emailInputGroup"
                    label="E-Mail Adresse:"
                    label-for="emailInput">
                    <b-form-input id="emailInput"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="E-Mail Adresse">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="passwordInputGroup"
                    label="Passwort:"
                    label-for="passwordInput">
                    <b-form-input id="passwordInput"
                        type="password"
                        v-model="form.name"
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
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<!--
<p>Benutzername:</p>
<p>Passwort:</p>
<b-form-input v-model="text1" type="text" placeholder="Enter your name"></b-form-input>
<b-button size="lg" variant="success">
    Absenden
</b-button>
-->
