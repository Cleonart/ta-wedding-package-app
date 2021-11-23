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

      <v-card-actions style="margin-bottom: -35px; margin-left: -15px">
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>Nikah Jumbo</v-list-item-title>
            <p class="text-caption">by Jumbo Restaurant</p>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <span class="mr-1">·</span>
            <v-icon class="mr-1"> mdi-share-variant </v-icon>
          </v-row>
        </v-list-item>
      </v-card-actions>

      <v-card class="mx-auto mt-3" max-width="344">
        <v-card-text>
          <div class="text-overline">Price</div>
          <p class="text-decoration-line-through">IDR 7,000,000</p>
          <p class="text-h5 text--primary font-weight-bold justify-end">
            IDR 5,000,000
          </p>
        </v-card-text>

        <!-- Pilih Tanggal -->
        <div class="ml-4 mr-6">
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
                v-model="date"
                label="Pilih Tanggal"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </div>

        <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = true">
            tambahkan paket
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="ml-2 mt-5">
        <p class="font-weight-bold">Package Detail</p>
        <p class="text-caption font-weight-medium">
          Wedding Organizer <br />
          - 4 crew on the day <br />
          - technical meeting <br />
          - time keeper <br />
          - testing food <br />
          <br />
          Noted : Untuk Tamu 30 - 250 pax
        </p>
      </div>

      <v-btn text color="teal accent-4" @click="reveal = true">
        Kunjungi Vendor
      </v-btn>

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
import Header from "@/components/Header.vue"
export default {
components: {
  Header,
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
  },
}
</script>
