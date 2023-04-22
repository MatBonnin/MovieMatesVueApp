<template>
  <div>
    <v-form ref="form">
      <v-text-field
        v-model="username"
        label="Pseudo"
        type="text"
        :rules="[(v) => !!v || 'Pseudo est requis']"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Mot de passe"
        @click:append-inner="show1 = !show1"
        :rules="passwordRules"
      ></v-text-field>
    </v-form>
    <v-card-actions>
      <v-btn color="primary" @click="login"> Se connecter</v-btn>
    </v-card-actions>
    <custom-snackbar
      v-model="snackbar"
      color="error"
      :message="errorMessage"
      icon="mdi-alert-circle"
    ></custom-snackbar>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import CustomSnackbar from "@/components/utils/CustomSnackbar.vue";

export default defineComponent({
  name: "login",
  components: {
    CustomSnackbar,
  },
  data() {
    return {
      username: "",
      show1: false,
      password: "",
      snackbar: false,
      errorMessage: "Une erreur est survenue lors de la connexion",
      passwordRules: [(v) => !!v || "Mot de passe est requis"],
    };
  },
  methods: {
    ...mapActions("user", ["fetchAuth"]),
    ...mapMutations("user", ["setToken"]),
    async login() {
      if (this.isLoginFormValid === true) {
        const params = {
          username: this.username,
          password: this.password,
        };
        this.fetchAuth(params).then((response) => {
          if (response.statusCode === 200) {
            this.$emit("connected");
            this.setToken(localStorage.getItem("jwt-session"));
          } else if (response.statusCode === 401) {
            this.errorMessage = "Mot de passe incorrect !";
            this.snackbar = true;
          }
        });
      } else {
        this.errorMessage =
          "Veuillez saisir l'identifiant et le mot de passe !";
        this.snackbar = true;
      }
    },
  },
  computed: {
    isLoginFormValid() {
      return this.username !== "" && this.password !== "";
    },
  },
});
</script>

<style scoped></style>
