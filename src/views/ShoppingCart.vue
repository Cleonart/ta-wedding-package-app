<template>
  <v-card class="mx-auto" style="overflow-x: hidden">
    <Header />

    <div style="margin-left: 20px">
      <h2 class="h1">Daftar pesanan</h2>
      <p class="subtitle-2" style="opacity: 0.7; font-weight: normal">
        Silahkan cek daftar pesanan anda disini
      </p>
      <p class="subtitle-2" style="opacity: 0.7; font-weight: normal">
        <v-icon
          small
          v-if="session_user_type == 'user'"
          style="margin-right: 5px"
          >mdi-account-multiple</v-icon
        >
        <v-icon small v-else style="margin-right: 5px">mdi-domain</v-icon>
        Anda masuk sebagai {{ session_user_type }}
      </p>
    </div>

    <v-progress-linear
      v-if="items.length == 0"
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>
    <!-- Pilihan -->
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card color="#212121" dark @click="go_to(item)">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.title"
                  class="text-button text-uppercase font-weight-bold mb-1"
                >
                </v-list-item-title>

                <v-list-item-subtitle
                  v-text="'by ' + item.vendor_name"
                  class="text-caption"
                  style="margin-top: 0px"
                >
                </v-list-item-subtitle>
                <div
                  v-text="formatRupiah(item.price, 'Rp.')"
                  class="text-overline"
                ></div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Header from "@/components/Header.vue";
import { API_ENDPOINT } from "../core.js";
var axios = require("axios");

export default {
  components: {
    Header,
  },
  data: () => ({
    session_user_id: false,
    session_user_type: false,
    session_user_name: false,

    items: [],
  }),
  methods: {
    formatRupiah: function (angka, prefix) {
      angka = angka.toString();
      var number_string = angka.replace(/[^,\d]/g, "").toString();
      var split = number_string.split(",");
      var sisa = split[0].length % 3;
      var rupiah = split[0].substr(0, sisa);
      var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
      var separator;
      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }
      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    },
    go_to: function (id) {
      if (this.session_user_type == "user") {
        this.$router.replace("/detail/" + id.packet_id[0]);
      } else if (this.session_user_type == "vendor") {
        this.$router.replace("/booking/" + id.id);
      }
    },
    get_data: function () {
      let app = this;
      let url = API_ENDPOINT + "api/v1/model/master.booking/search_read";

      // use domain to search only products that related to vendor_id
      let domain = [];
      if (this.session_user_type == "vendor") {
        domain = [["vendor_id", "=", parseInt(app.session_user_id)]];
      } else if (this.session_user_type == "user") {
        domain = [["user_id", "=", parseInt(app.session_user_id)]];
      }

      // Payload for odoo
      let payload = {
        params: {
          domain: domain,
        },
      };

      axios.post(url, payload).then((response) => {
        app.items = response.data.result.records;
        console.log(response);
      });
    },
  },
  created() {
    this.session_user_id = sessionStorage.getItem("session");
    this.session_user_type = sessionStorage.getItem("session_type");
    this.session_user_name = sessionStorage.getItem("session_user_name");

    if (this.session_user_id == "null" || this.session_user_id == null) {
      this.$router.replace("login");
      alert("Waktu login anda telah habis, silahkan login kembali!");
    }

    this.get_data();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
