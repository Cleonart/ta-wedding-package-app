<template>
  <v-card class="mx-auto">
    <!-- Toolbar -->
    <v-toolbar color="#D7CCC8">
      <v-toolbar-side-icon>
        <v-btn icon color="black">
          <v-icon dark> mdi-chevron-left </v-icon>
        </v-btn>
      </v-toolbar-side-icon>

      <v-toolbar-title>Detail</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-row dense>
        <!-- Review -->

        <v-carousel height="300" hide-delimiters>
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>

        <v-card-actions>
          <v-col v-for="pays in pay" :key="pays.title" cols="6">
            <h2 v-text="pays.title"></h2>
            <p class="text-justify" v-text="pays.benefit"></p>
          </v-col>

          <!-- Pembayaran -->
          <v-col v-for="pays in pay" :key="pays.title" cols="6">
            <v-card elevation="2">
              <v-card-title v-text="pays.price"></v-card-title>

              <v-card-subtitle>Pembayaran</v-card-subtitle>

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
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </div>

              <!-- Pilihan Pembayaran -->
              <v-list>
                <v-list-group
                  v-for="item in list"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Pilih Pembayaran</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item v-for="child in item.items" :key="child.title">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="child.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-list>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-btn outlined color="black"> Tambahkan </v-btn>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-card-actions>
      </v-row>

      <!-- Isi Paket -->
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" cols="4">
            <v-card color="#D7CCC8">
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <span class="subheading mr-2" v-text="card.price"></span>

                <v-spacer></v-spacer>

                <v-btn icon @click="reveal = card.title">
                  <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <v-card
                  v-if="reveal == card.title"
                  class="transition-fast-in-fast-out v-card--reveal"
                  height="200px"
                >
                  <v-card-text class="pb-0">
                    <p class="text-h4 text--primary" v-text="card.title"></p>
                    <p v-text="card.about"></p>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-btn text color="black" @click="reveal = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    pay: [
      {
        title: "Ballroom",
        price: "Rp 5.000.000,-",
        benefit: 'Prewedding Outdoor conceptual we have the meeting before the photoshoot such as to discuss about concept, outfit and location before photo&videoshoot. Make up will be running in our Studio at Kelapa Gading Time Schedulle for Shooting 4 Hours for session1, 4 Hours for session2'
      },
    ],

    cards: [
      {
        title: "Ballroom",
        src: "https://image.freepik.com/free-photo/restaurant-ballroom-ornated-with-flowers_140725-3811.jpg",
        price: "Rp 5.000.000,-",
        about: "menyediakan tempat untuk 500 - 1000 orang dengan dekorasi sesuai keinginan calon pengantin",
      },
      {
        title: "Hair and Makeup",
        src: "https://image.freepik.com/free-photo/top-view-arrangement-with-beauty-bag-copy-space_23-2148301851.jpg",
        price: "Rp 12.000.000,-",
        about: "makeup untuk brides dan juga bridesmaid",
      },
      {
        title: "Photography",
        src: "https://image.freepik.com/free-photo/high-angle-shot-lens-headphones-gimbal-phone_181624-43878.jpg",
        price: "Rp 25.500.000,-",
        about: "terdiri dari preweding, morning express, photobooth dan acara ",
      },
    ],

    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],

    list: [
      {
        action: "mdi-cash-multiple",
        active: false,
        items: [{ title: "M-banking" }, { title: "Virtual Account" }],
      },
    ],

    activePicker: null,
    date: null,
    menu: false,

    reveal: false,
  }),
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
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
