<template>
  <v-card class="mx-auto" style="overflow-x: hidden">
    <Header />

    <v-snackbar v-model="dialog">
      {{ dialog_txt }}
    </v-snackbar>

    <v-container>
      <v-img
        src="https://picsum.photos/350/165?random"
        height="125"
        class="grey darken-4"
        style="m"
      >
      </v-img>

      <div
        style="background-color: #f7f7f7; border-radius: 8px"
        class="px-4 py-2 mt-3"
        v-if="booking.status_booking"
      >
        Paket sudah berhasil dipesan, silahkan lihat status paket sebelum lanjut
        ke tahap selanjutnya
        <br />
        <v-chip
          class="mt-2"
          color="yellow"
          v-if="booking.status_booking == 'waiting'"
        >
          <span style="font-weight: bold">Menunggu Konfirmasi</span>
        </v-chip>
        <v-chip
          class="mt-2"
          color="green"
          v-if="booking.status_booking == 'confirmed'"
        >
          <span style="font-weight: bold">Dikonfirmasi</span>
        </v-chip>
      </div>
      <!--
      <v-banner>
        Paket sudah ada dalam keranjang anda
        <v-chip class="mt-2" color="yellow">
          <span style="font-weight: bold">Menunggu Konfirmasi</span>
        </v-chip>
      </v-banner> -->

      <!-- Vendor Detail -->
      <v-card-actions style="margin-bottom: -35px; margin-left: -15px">
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>{{ items.title }}</v-list-item-title>
            <p class="text-caption">by {{ items.vendor_name }}</p>
            <p class="text-caption">Kontak {{ items.vendor_contact }}</p>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>

      <v-card class="mx-auto mt-3" max-width="344">
        <v-card-text>
          <div class="text-overline">Harga</div>
          <p class="text-h5 font-weight-bold justify-end">
            {{ formatRupiah(items.price, "Rp") }}
          </p>
        </v-card-text>

        <!-- Pilih Tanggal -->
        <div class="ml-4 mr-6 mt-0">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="booking.date_booking"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="booking.date_booking"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="booking.date_booking" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(booking.date_booking)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <!-- Booking note -->
          <v-textarea
            v-model="booking.summary_booking"
            name="input-7-1"
            label="Tentang Booking Anda"
            hint="Apa yang ingin anda sampaikan..."
          ></v-textarea>
        </div>

        <v-card-actions>
          <v-btn
            color="green"
            elevation="2"
            class="ml-2 mb-2"
            @click="register"
            :loading="loader"
            >Konfirmasi</v-btn
          >
          <v-btn
            color="error"
            elevation="2"
            class="ml-2 mb-2"
            @click="cancel"
            :loading="loader"
            >Batalkan</v-btn
          >
        </v-card-actions>
      </v-card>

      <div class="ml-2 mt-5">
        <p class="font-weight-bold">Package Detail</p>
        <p class="text-caption font-weight-medium">
          {{ items.detail }}
        </p>
      </div>

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
import Header from "@/components/Header.vue";
import { API_ENDPOINT } from "../core.js";
import { formatRupiah } from "../utils/converter.js";
var axios = require("axios");

export default {
  components: {
    Header,
  },
  data() {
    return {
      booking: {
        packet_id: "",
        date_booking: "",
        summary: "",
        packet_id: "",
        user_id: "",
        vendor_id: "",
      },
      date: "",
      items: {},

      packet_id: -1,
      register_type: -1,

      loader: false,
      dialog: false,
      dialog_txt: "",
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    formatRupiah: function (angka, prefix) {
      return formatRupiah(angka, prefix);
    },
    register: function () {
      let app = this;

      this.booking.user_id = parseInt(sessionStorage.getItem("session"));
      this.booking.packet_id = this.packet_id;
      this.booking.vendor_id = this.items.vendor_id;

      let payload = {
        params: {
          args: [this.booking.id],
          kwargs: {},
        },
      };

      app.loader = true;
      let DEFAULT_END = API_ENDPOINT + "api/v1/model/master.booking/confirm";
      axios.post(DEFAULT_END, payload).then((response) => {
        let data = response.data;
        console.log(response);
        app.dialog = true;
        app.dialog_txt = "Paket berhasil dikonfirmasi";
        app.loader = false;
      });
    },
    cancel: function () {
      let app = this;
      let payload = {
        params: {
          args: [this.register_type],
          kwargs: {},
        },
      };
      let DEFAULT_END = API_ENDPOINT + "api/v1/model/master.booking/unlink";
      axios.post(DEFAULT_END, payload).then((response) => {
        let data = response.data;
        console.log(response);
        app.dialog = true;
        app.dialog_txt = "Paket berhasil dibatalkan";
        setTimeout(function () {
          app.$router.replace("/");
        }, 1000);
      });
    },

    get_book_data: function (id) {
      let app = this;
      let payload = {
        params: {
          domain: [["id", "=", id]],
          args: [],
          kwargs: {},
        },
      };

      let DEFAULT_END = API_ENDPOINT + "api/v1/model/master.booking/search_read";
      axios.post(DEFAULT_END, payload).then((response) => {
        app.items = response.data.result.records[0];
        console.log(response);
        app.register_type = app.items.id;
        app.booking = app.items;
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    this.packet_id = id;
    this.get_book_data(id);
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
