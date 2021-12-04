<template>
  <div>
    <Header />

    <v-snackbar v-model="dialog">
      {{ dialog_txt }}
    </v-snackbar>

    <div style="position: relative">
      <v-img
        src="../assets/cover.jpg"
        max-height="200px"
        class="mb-4"
        style="margin-top: -20px; z-index: 0"
      />
      <v-container
        class="grey lighten-5 px-8 mb-10 -mt-1"
        style="margin-top: -5px"
      >
        <v-icon
          @click="$router.replace('/')"
          style="position: absolute; top: 10px; left: 10px; color: white"
          medium
          >mdi-arrow-left</v-icon
        >
        <h2 class="h1">Daftarkan Paket</h2>
        <p class="subtitle-2">Atur paket anda disini</p>
        <v-text-field
          v-model="packet.title"
          :counter="50"
          label="Nama Paket"
          required
        ></v-text-field>
        <v-text-field
          v-model="packet.price"
          :counter="50"
          label="Harga Paket"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="packet.detail"
          :counter="50"
          label="Detail Paket"
          required
        ></v-text-field>
        <v-select
          v-model="packet.type"
          :items="items"
          label="Kategori Paket"
        ></v-select>
        <v-textarea
          v-model="packet.summary"
          name="input-7-1"
          label="Tentang Paket Anda"
          hint="Apa yang ingin anda sampaikan..."
        ></v-textarea>
        <v-btn
          class="mt-2"
          color="primary"
          elevation="2"
          :loading="loader"
          @click="register"
          >Daftar</v-btn
        >
        <p
          style="
            color: #000;
            opacity: 0.8;
            font-size: 12px;
            margin-top: 15px;
            margin-bottom: -10px;
          "
        >
          Setelah didaftarkan, paket akan langsung dapat dilihat oleh semua
          orang
        </p>
      </v-container>
    </div>
  </div>
</template>

<script>
import { API_ENDPOINT } from "../core.js";
import Header from "@/components/Header.vue";
const axios = require("axios");

export default {
  components: {
    Header,
  },
  data() {
    return {
      items: [
        "ballroom",
        "makeup",
        "boutiqe",
        "all in one",
        "a la carte",
        "fashion",
      ],
      packet: {
        title: "",
        detail: "",
        price: "",
        type: "",
        summary: "",
        vendor_id: "",
      },
      dialog: false,
      dialog_txt: "This is snackbar",

      register_type: "",
      loader: false,
    };
  },
  methods: {
    register: function () {
      let app = this;
      this.packet.vendor_id = parseInt(sessionStorage.getItem("session"));

      if (this.packet.title == "" || this.packet.detail == "") {
        app.dialog = true;
        app.dialog_txt = "Nama paket dan detail paket tidak boleh kosong";
        return;
      }

      if (this.packet.type == "") {
        app.dialog = true;
        app.dialog_txt = "Kategori paket tidak boleh kosong";
        return;
      }

      // Payload for odoo
      let args_data = [];
      let endpoint = "";
      if (this.register_type < 0) {
        endpoint = "create";
        args_data = [
          [
            {
              ...app.packet,
            },
          ],
        ];
      } else if (this.register_type > 0) {
        endpoint = "write";
        args_data = [
          this.register_type,
          {
            ...app.packet,
          },
        ];
      }

      let payload = {
        params: {
          args: args_data,
          kwargs: {},
        },
      };

      app.loader = true;
      let DEFAULT_END = API_ENDPOINT + "api/v1/model/master.packet/" + endpoint;
      axios.post(DEFAULT_END, payload).then((response) => {
        let data = response.data;
        app.dialog = true;
        if (this.register_type <= 0) {
          app.dialog_txt = "Paket baru berhasil ditambahkan";
          app.$router.replace("/");
        } else if (this.register_type > 0) {
          app.dialog_txt = "Paket berhasil diubah";
        }
        app.loader = false;
      });
    },

    get_data: function (id) {
      let app = this;
      let payload = {
        params: {
          domain: [["id", "=", id]],
          fields: ["title", "detail", "price", "type", "summary"],
          args: [],
          kwargs: {},
        },
      };

      let DEFAULT_END = API_ENDPOINT + "api/v1/model/master.packet/read";
      axios.post(DEFAULT_END, payload).then((response) => {
        app.packet = response.data.result.records[0];
        console.log(response);
      });
    },
  },
  created() {
    if (this.$route.params.id == "new") {
      this.register_type = -1;
    } else {
      this.register_type = parseInt(this.$route.params.id);
      this.get_data(this.register_type);
    }
    this.packet.vendor_id = parseInt(sessionStorage.getItem("session"));
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
