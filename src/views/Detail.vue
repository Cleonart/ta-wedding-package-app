<template>
  <v-card class="mx-auto" style="overflow-x: hidden">
    <Header />

    <v-container>
      <v-img
        src="https://picsum.photos/350/165?random"
        height="125"
        class="grey darken-4"
        style="m"
      >
      </v-img>

      <!-- Vendor Detail -->
      <v-card-actions style="margin-bottom: -35px; margin-left: -15px">
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>{{ items.title }}</v-list-item-title>
            <p class="text-caption">by {{ items.vendor_name }}</p>
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
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="booking.date_booking"
                label="Pilih Tanggal"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <!-- Booking date -->
            <v-date-picker
              v-model="booking.date_booking"
              :active-picker.sync="activePicker"
              :min="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              @change="save"
            ></v-date-picker>
          </v-menu>

          <!-- Booking note -->
          <v-textarea
            v-model="booking.summary"
            name="input-7-1"
            label="Tentang Booking Anda"
            hint="Apa yang ingin anda sampaikan..."
          ></v-textarea>
        </div>

        <v-card-actions>
          <v-btn text color="teal accent-4" @click="register()">
            Tambahkan Paket
          </v-btn>
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

      register_type: -1,
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
      this.booking.packet_id = this.register_type;
      this.booking.vendor_id = this.items.vendor_id;

      // Payload for odoo
      let args_data = [];
      let endpoint = "";
      if (this.register_type < 0) {
        endpoint = "create";
        args_data = [
          [
            {
              ...app.booking,
            },
          ],
        ];
      } else if (this.register_type > 0) {
        endpoint = "write";
        args_data = [
          this.register_type,
          {
            ...app.booking,
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
      let DEFAULT_END =
        API_ENDPOINT + "api/v1/model/master.booking/" + endpoint;
      axios.post(DEFAULT_END, payload).then((response) => {
        let data = response.data;
        console.log(response);
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
          fields: [
            "title",
            "detail",
            "price",
            "type",
            "summary",
            "vendor_id",
            "vendor_name",
          ],
          args: [],
          kwargs: {},
        },
      };
      let DEFAULT_END = API_ENDPOINT + "api/v1/model/master.packet/read";
      axios.post(DEFAULT_END, payload).then((response) => {
        app.items = response.data.result.records[0];
        console.log(response);
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    this.get_data(id);
  },

  created() {
    if (this.$route.params.id == "new") {
      this.register_type = -1;
    } else {
      this.register_type = parseInt(this.$route.params.id);
      this.get_data(this.register_type);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
