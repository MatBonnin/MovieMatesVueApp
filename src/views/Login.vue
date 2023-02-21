<template>
  <div class="h-100">
    <v-row class="w-100 h-100" justify="center">
      <v-col class="mt-auto mb-auto" cols="8">
        <v-card>
          <v-card-title>Connexion</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="email"
                type="text"
                :rules="[(v) => !!v || 'email est requis']"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append-inner="show1 = !show1"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Login",
  data() {
    return {
      email: "",
      show1: false,
      password: "",
      snackbar: false,
      passwordRules: [
        (v) => !!v || "Mot de passe est requis",
        (v) =>
          (v && v.length >= 8) ||
          "Le mot de passe doit contenir au moins 8 caractères",
        (v) =>
          (v &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(
              v
            )) ||
          "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
      ],
    };
  },
  methods: {
    ...mapActions("user", ["fetchAuth"]),
    ...mapMutations("user", ["setToken"]),
    login() {
      console.log("connect");
      if (this.isFormValid === true) {
        console.log("ok");
        this.fetchAuth({ email: this.email, password: this.password }).then(
          (response) => {
            console.log(response);
            if (response.message === "connected") {
              console.log(response);
              this.setToken(response.token);
              this.$router.push("/");
            }
          }
        );
      } else {
        console.log("error");
      }
    },
  },
  computed: {
    isFormValid() {
      const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      );
      return (
        this.email !== "" &&
        this.password !== "" &&
        passwordRegex.test(this.password)
      );
    },
  },
  components: {},
});
</script>
<style scoped></style>
