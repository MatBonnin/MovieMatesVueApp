<template>
  <div>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            v-model="firstName"
            label="Prénom"
            :rules="required"
            @blur="checkStep"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Nom"
            :rules="required"
            @blur="checkStep"
          ></v-text-field>
          <v-text-field
            v-model="birthdate"
            label="Date de naissance"
            :rules="[...birthdateRules, ...required]"
            @blur="checkStep"
          ></v-text-field>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Pseudo"
            :rules="required"
            @blur="checkStep"
          ></v-text-field>
          <v-text-field
            v-model="registerEmail"
            label="Email"
            :rules="[...registerEmailRules, ...required]"
            @blur="checkStep"
          ></v-text-field>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <v-card-text>
          <v-text-field
            v-model="registerPassword"
            label="Mot de passe"
            type="password"
            :rules="[...passwordRules, ...required]"
            @blur="checkStep"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirmez le mot de passe"
            type="password"
            :rules="[...confirPasswordRules, ...required]"
            @blur="checkStep"
          ></v-text-field>
        </v-card-text>
      </v-window-item>
    </v-window>

    <div v-if="step > 1">
      <v-divider></v-divider>
      <div class="d-flex flex-row">
        <v-btn variant="text" @click="step--"> Retour </v-btn>

        <!-- <v-btn v-if="step < 3" color="primary" variant="flat" @click="step++">
        Suivant
      </v-btn> -->
        <v-btn
          v-if="step === 3"
          :disabled="insciptionButton"
          color="primary"
          variant="flat"
          class="ml-4"
          @click="submitRegistration"
        >
          S'inscrire
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import { hash } from "bcryptjs";
export default defineComponent({
  // eslint-disable-next-line
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      step: 1,
      firstName: "",
      lastName: "",
      birthdate: "",
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
      insciptionButton: true,

      passwordRules: [
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
      required: [(v) => !!v || "Ce champs est requis"],
      confirPasswordRules: [
        (v) =>
          v === this.registerPassword ||
          "Les mots de passe ne correspondent pas",
      ],
      birthdateRules: [
        (v) =>
          /^(\d{2})\/(\d{2})\/(\d{4})$/.test(v) ||
          "La date doit être au format JJ/MM/AAAA",
      ],

      registerEmailRules: [
        (v) => /.+@.+\..+/.test(v) || "Email doit être valide",
      ],
    };
  },
  methods: {
    ...mapActions("user", ["fetchCreateUser", "fetchAuth"]),

    checkStep() {
      if (this.validateStep()) {
        if (this.step !== 3) {
          this.step++;
        } else {
          this.insciptionButton = false;
        }
      }
    },
    async submitRegistration() {
      if (
        this.validateStep1() &&
        this.validateStep2() &&
        this.validateStep3()
      ) {
        const hashedPassword = await hash(this.registerPassword, 10);
        await this.fetchCreateUser({
          username: this.username,
          password: hashedPassword,
          email: this.registerEmail,
          firstName: this.firstName,
          lastName: this.lastName,
          birthdate: this.birthdate,
        });
        const params = {
          username: this.username,
          password: this.registerPassword,
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
        console.error("Certaines règles ne sont pas respectées");
        // Vous pouvez ajouter ici une action pour notifier l'utilisateur
      }
    },

    validateStep1() {
      return (
        this.required[0](this.firstName) === true &&
        this.required[0](this.lastName) === true &&
        this.required[0](this.birthdate) === true &&
        this.birthdateRules[0](this.birthdate) === true
      );
    },
    validateStep2() {
      return (
        this.required[0](this.username) === true &&
        this.required[0](this.registerEmail) === true &&
        this.registerEmailRules[0](this.registerEmail) === true
      );
    },
    validateStep3() {
      return (
        this.required[0](this.registerPassword) === true &&
        this.passwordRules[0](this.registerPassword) === true &&
        this.passwordRules[1](this.registerPassword) === true &&
        this.required[0](this.confirmPassword) === true &&
        this.confirPasswordRules[0](this.confirmPassword) === true
      );
    },
    // Valide l'étape en cours
    validateStep() {
      if (this.step === 1) {
        return this.validateStep1();
      } else if (this.step === 2) {
        return this.validateStep2();
      } else if (this.step === 3) {
        return this.validateStep3();
      }
    },
  },
  computed: {
    // isStep1Valid() {
    //   return (
    //     this.firstName !== "" &&
    //     this.lastName !== "" &&
    //     /^(\d{2})\/(\d{2})\/(\d{4})$/.test(this.birthdate)
    //   );
    // },
    // isStep2Valid() {
    //   return (
    //     this.username !== "" &&
    //     this.registerEmail !== "" &&
    //     /.+@.+\..+/.test(this.registerEmail)
    //   );
    // },
    // isStep3Valid() {
    //   return (
    //     this.registerPassword !== "" &&
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(
    //       this.registerPassword
    //     ) &&
    //     this.confirmPassword !== "" &&
    //     this.registerPassword === this.confirmPassword
    //   );
    // },
  },
  components: {},
  watch: {
    // isStep1Valid(newVal) {
    //   if (newVal) {
    //     this.step = 2;
    //   }
    // },
    // isStep2Valid(newVal) {
    //   if (newVal) {
    //     this.step = 3;
    //   } else if (!this.isStep1Valid) {
    //     this.step = 1;
    //   }
    // },
    // isStep3Valid(newVal) {
    //   if (!newVal && !this.isStep2Valid) {
    //     this.step = 2;
    //   }
    // },
  },
});
</script>
<style scoped></style>
