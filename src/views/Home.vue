<template>
  <v-card class="mx-auto" style="overflow-x: hidden">
    <Header />
    <v-container>
      <!-- Top Subtitle -->
      <div class="top-header mb-5">
        <h2 class="h1">Halo, {{ session_user_name }}</h2>
        <p class="subtitle-2" style="opacity: 0.7; font-weight: normal">
          Your trusworthy wedding partner
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

      <swiper :options="swiperOption">
        <swiper-slide v-for="categ in categories" :key="categ">
          <v-chip outlined>{{ categ }}</v-chip>
        </swiper-slide>
      </swiper>

      <!-- Search Field -->
      <v-text-field
        v-model="search_bar"
        label="Cari Kategori"
        required
        append-icon="mdi-magnify"
      ></v-text-field>

      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="text-h6">
              Pilihan Tanpa Batas Bisa
            </v-card-title>
            <v-card-subtitle>
              Cari paket pernikahan sesuai dengan yang anda inginkan tanpa perlu
              repot kesana kemari
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text> Cari Sekarang </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" v-if="session_user_type == 'vendor'">
          <v-card color="#E4CDA7" light>
            <v-card-title class="text-h6"> Tambahkan paket baru? </v-card-title>
            <v-card-subtitle>
              Silahkan tambahkan dan susun paket baru anda disini
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text @click="$router.replace('register_packet/new')">
                Tambah Sekarang
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-progress-linear
          v-if="items.length == 0"
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>

        <v-col v-for="(item, i) in filteredData" :key="i" cols="12">
          <CustomCard :item="item" />
        </v-col>
      </v-row>

      <footer>
        <p
          class="text-center pt-2 mt-5"
          style="border-top: 1px solid black; font-size: 12px"
        >
          Hope you have a nice and beautiful day
        </p>
      </footer>
    </v-container>
  </v-card>
</template>

<script>
const axios = require("axios");
import CustomCard from "@/components/Card.vue";
import Header from "@/components/Header.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { API_ENDPOINT } from "../core.js";
import "swiper/swiper.min.css";
export default {
  name: "Home",
  components: {
    CustomCard,
    Header,
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    cart: 2,
    categories: [
      "Ballroom",
      "Makeup",
      "Boutiqe",
      "All in one",
      "Ala Carte",
      "Fashion",
    ],

    swiperOption: {
      slidesPerView: 4,
      spaceBetween: 30,
      freeMode: true,
    },
    item: {},
    items: [],

    search_bar: "",

    session_user_id: false,
    session_user_type: false,
    session_user_name: false,
  }),
  computed: {
    filteredData() {
      return this.items.filter((tableData) => {
        return tableData.title
          .toLowerCase()
          .includes(this.search_bar.toLowerCase());
      });
    },
  },
  methods: {
    get_data: function () {
      let app = this;
      let url = API_ENDPOINT + "api/v1/model/master.packet/search_read";

      // use domain to search only products that related to vendor_id
      let domain = [];
      if (this.session_user_type == "vendor") {
        domain = [["vendor_id", "=", parseInt(app.session_user_id)]];
      }

      // Payload for odoo
      let payload = {
        params: {
          domain: domain,
        },
      };

      axios.post(url, payload).then((response) => {
        app.items = response.data.result.records;
        //console.log(app.items);
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
