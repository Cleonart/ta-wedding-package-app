<template>
  <div>
    <v-img
      src="../assets/cover.jpg"
      light="true"
      max-height="200px"
      class="mb-4"
    />
    <v-container class="grey lighten-5 px-8 mb-10 mt-5">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Oops, Terjadi Kesalahan
          </v-card-title>
          <v-card-text> </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Oke </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <h2 class="h1">Wedding App</h2>
      <p class="subtitle-2">Your trusworthy wedding partner</p>
      <v-text-field :counter="10" label="Nama Pengguna" required></v-text-field>
      <v-text-field
        :counter="10"
        label="Kata Sandi"
        type="password"
        required
      ></v-text-field>
      <v-btn color="primary" elevation="2" @click="login">Masuk</v-btn>
    </v-container>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      username: "",
      password: "",
      dialog: false,
    };
  },
  methods: {
    login: function () {
      this.dialog = !this.dialog;
      if (this.username == "") {
        return;
      }
    },
  },
  created() {},
};
</script>

<style></style>
