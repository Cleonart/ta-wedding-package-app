<template>
  <div>
    <v-progress-linear
      v-if="loader"
      style="position: fixed; top: 0; z-index: 999"
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>

    <v-img src="../assets/cover.jpg" max-height="200px" class="mb-4" />

    <v-snackbar multi-line v-model="dialog">
      {{ dialog_txt }}
    </v-snackbar>

    <v-container class="grey lighten-5 px-8 mb-10 mt-5">
      <h2 class="h1">Mendaftar</h2>
      <p class="subtitle-2">Your trusworthy wedding partner</p>
      <v-text-field
        v-model="user.username"
        :counter="10"
        label="Nama Pengguna"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        :counter="10"
        label="Kata Sandi"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.name"
        :counter="20"
        label="Nama Lengkap"
        required
      ></v-text-field>
      <v-select
        v-model="user.type"
        :items="items"
        label="Tipe Pendaftar"
      ></v-select>
      <v-text-field
        v-model="user.address"
        :counter="20"
        label="Alamat Pengguna"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.contact"
        :counter="20"
        label="Kontak Pengguna"
        required
      ></v-text-field>
      <v-btn color="primary" elevation="2" @click="register" :loading="loader"
        >Daftar</v-btn
      >
      <br /><br />
      <a class="subtitle-2" @click="$router.replace('login')"
        >Sudah punya akun? masuk disini</a
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
      items: ["user", "vendor"],
      user: {
        username: "",
        password: "",
        name: "",
        type: "",
        address: "",
        contact: "",
      },
      dialog: false,
      dialog_txt: "This is snackbar",

      loader: false,
    };
  },
  methods: {
    register: function () {
      let app = this;

      if (this.user.username == "" || this.user.password == "") {
        app.dialog = true;
        app.dialog_txt = "Username dan password tidak boleh kosong";
        return;
      }

      if (this.user.name == "") {
        app.dialog = true;
        app.dialog_txt = "Nama tidak boleh kosong";
        return;
      }

      if (this.user.type == "") {
        app.dialog = true;
        app.dialog_txt = "Tipe tidak boleh kosong";
        return;
      }

      if (this.user.contact == "") {
        app.dialog = true;
        app.dialog_txt = "Nomor Kontak tidak boleh kosong";
        return;
      }

      // Payload for odoo
      let payload = {
        params: {
          args: [
            [
              {
                ...app.user,
              },
            ],
          ],
          kwargs: {},
        },
      };

      app.loader = true;
      let DEFAULT_END = API_ENDPOINT + "api/v1/model/ta.account/create";
      axios.post(DEFAULT_END, payload).then((response) => {
        let data = response.data;
        if (data.result.length > 0) {
          app.dialog = true;
          app.dialog_txt =
            "Anda berhasil mendaftar.. Sedang mengarahkan anda ke menu login";
          app.loader = false;
          setTimeout(function () {
            app.$router.replace("login");
          }, 3000);
        }
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
