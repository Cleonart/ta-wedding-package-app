<template>
  <div>
    <v-progress-linear
      v-if="loader"
      style="position: fixed; top: 0; z-index: 999"
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>

    <v-img src="../assets/cover.jpg" max-height="200px" class="mb-4" />

    <v-snackbar v-model="dialog">
      {{ dialog_txt }}
    </v-snackbar>

    <v-container class="grey lighten-5 px-8 mb-10 mt-5">
      <h2 class="h1">Masuk</h2>
      <p class="subtitle-2">Your trusworthy wedding partner</p>
      <v-text-field
        v-model="username"
        :counter="10"
        label="Nama Pengguna"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :counter="10"
        label="Kata Sandi"
        type="password"
        required
      ></v-text-field>
      <v-btn color="primary" elevation="2" :loading="loader" @click="login"
        >Masuk</v-btn
      >
      <br /><br />
      <a class="subtitle-2" @click="$router.replace('register')"
        >Belum punya akun? mendaftar disini</a
      >
    </v-container>
  </div>
</template>

<script>
import { API_ENDPOINT } from "../core.js";
const axios = require("axios");

export default {
  data() {
    return {
      username: "",
      password: "",
      dialog: false,
      dialog_txt: "This is snackbar",

      loader: false,
    };
  },
  methods: {
    login: function () {
      let app = this;

      if (this.username == "" || this.password == "") {
        app.dialog = true;
        app.dialog_txt = "Username dan password tidak boleh kosong";
        return;
      }

      // Payload for odoo
      let payload = {
        params: {
          domain: [
            ["username", "=", app.username],
            ["password", "=", app.password],
          ],
        },
      };

      app.loader = true;
      let DEFAULT_END = API_ENDPOINT + "api/v1/model/ta.account/read";
      axios.post(DEFAULT_END, payload).then((response) => {
        let data = response.data.result.records;
        if (data.length > 0) {
          app.dialog = true;
          app.dialog_txt = "Login berhasil";
          sessionStorage.setItem("session", data[0].id);
          sessionStorage.setItem("session_type", data[0].type);
          sessionStorage.setItem("session_user_name", data[0].name);
          app.$router.replace("/");
        } else {
          app.dialog = true;
          app.dialog_txt = "Username atau password salah";
        }
        app.loader = false;
      });
    },
  },
  created() {},
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
