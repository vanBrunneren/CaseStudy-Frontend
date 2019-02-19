<template>
    <div>
        <div style="padding-left: 20px; padding-top: 20px;">
            <b-container fluid>
                <b-row>
                    <b-col sm="12"><h1 style="padding-bottom: 20px">Profil</h1></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">Email</b-col>
                    <b-col><b-input disabled :value="user.username"/></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">Anrede</b-col>
                    <b-col><b-form-select v-model="user.sex" :options="options" /></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">Vorname</b-col>
                    <b-col><b-input v-model="user.prename" /></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">Name</b-col>
                    <b-col><b-input v-model="user.name" /></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">Strasse / Nr</b-col>
                    <b-col><b-input v-model="user.str" /></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">PLZ</b-col>
                    <b-col><b-input v-model="user.plz" /></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2">Ort</b-col>
                    <b-col><b-input v-model="user.ort" /></b-col>
                </b-row>
                <b-row>
                    <b-col sm="2"></b-col>
                    <b-col>
                        <b-button v-on:click="saveData" type="submit" variant="primary">
                            Speichern
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            user: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Bitte wählen' },
                    { value: 'Firma', text: 'Firma' },
                    { value: 'Herr', text: 'Herr' },
                    { value: 'Frau', text: 'Frau' }
                ]
            }
        },
        methods: {
            saveData(e) {
                e.preventDefault();
                this.$emit('save-user-data', this.user);
            }
        }
  }
</script>
