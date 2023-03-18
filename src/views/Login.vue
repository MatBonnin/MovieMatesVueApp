<template>
  <div class="h-100">
    <v-row class="w-100 h-100" justify="center">
      <v-col class="mt-auto mb-auto" cols="10">
        <v-card>
          <v-card-title>Connexion</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="username"
                label="username"
                type="text"
                :rules="[(v) => !!v || 'username est requis']"
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
    login() {
      console.log("connect");
      if (this.isFormValid === true) {
        console.log("ok");
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
    isFormValid() {
      return true;
      // const passwordRegex = new RegExp(
      //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      // );
      // return (
      //   this.username !== "" &&
      //   this.password !== "" &&
      //   passwordRegex.test(this.password)
      // );
    },
  },
  components: {},
});
</script>
<style scoped></style>
