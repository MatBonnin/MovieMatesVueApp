<template>
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
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import { hash } from "bcryptjs";

export default defineComponent({
  // eslint-disable-next-line
  name: "login",
  data() {
    return {
      username: "",

      show1: false,
      password: "",
      snackbar: false,

      passwordRules: [
        (v) => !!v || "Mot de passe est requis",
        // (v) =>
        //   (v && v.length >= 8) ||
        //   "Le mot de passe doit contenir au moins 8 caractères",
        // (v) =>
        //   (v &&
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(
        //       v
        //     )) ||
        //   "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
      ],
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
          console.log(response);
          if (response.statusCode === 200) {
            this.$emit("connected");
            this.setToken(localStorage.getItem("jwt-session"));
          } else if (response.statusCode === 401) {
            this.snackbar = true;
          }
        });
      } else {
        console.log("error");
      }
    },
  },
  computed: {
    isLoginFormValid() {
      const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      );
      return (
        this.username !== "" &&
        this.password !== "" &&
        passwordRegex.test(this.password)
      );
    },
  },
  components: {},
});
</script>
<style scoped></style>
