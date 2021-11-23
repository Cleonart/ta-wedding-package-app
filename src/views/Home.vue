<template>
  <v-card class="mx-auto" style="overflow-x: hidden">
    <Header />
    <v-container>
      <!-- Top Subtitle -->
      <div class="top-header mb-5">
        <h2 class="h1">Halo, Pengguna</h2>
        <p class="subtitle-2" style="opacity: 0.7; font-weight: normal">
          Your trusworthy wedding partner
        </p>
      </div>

      <swiper :options="swiperOption">
        <swiper-slide v-for="categ in categories" :key="categ">
          <v-chip outlined>{{ categ }}</v-chip>
        </swiper-slide>
      </swiper>

      <!-- Search Field -->
      <v-text-field
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

        <v-progress-linear
          v-if="items.length == 0"
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>

        <v-col v-for="(item, i) in items" :key="i" cols="12">
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
  }),
  methods: {
    get_data: function () {
      var app = this;
      let url = "https://618f8e02f6bf45001748493a.mockapi.io/api/v1/packets";
      axios.get(url).then((response) => {
        app.items = response.data;
        console.log(app.items);
      });
    },
  },
  created() {
    this.get_data();
  },
};
</script>
