<template>


  <v-card class="mx-auto">
    <!-- Toolbar -->
    <v-toolbar color="#D7CCC8">
      <v-toolbar-side-icon>
        <v-btn icon color="black">
          <v-icon dark> mdi-chevron-left </v-icon>
        </v-btn>
      </v-toolbar-side-icon>

      <v-toolbar-title>Checkout</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <div class="text-center">
        <v-btn
          v-if="!chip1 && !chip2 && !chip3 && !chip4"
          close
          color="primary"
          dark
          @click="
            (chip1 = true), (chip2 = true), (chip3 = true), (chip4 = true)
          "
        >
          Reset Chips
        </v-btn>

        <v-chip v-if="chip1" class="ma-2" close @click:close="chip1 = false">
          Ballroom
        </v-chip>

        <v-chip v-if="chip1" class="ma-2" close @click:close="chip1 = false">
          Photobooth
        </v-chip>

        <v-chip v-if="chip1" class="ma-2" close @click:close="chip1 = false">
          Honeymoon
        </v-chip>
      </div>


    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    chip1: true,
    chip2: true,
    chip3: true,
    pay: [
      {
        title: "Ballroom",
        price: "Rp 5.000.000,-",
        benefit:
          "Prewedding Outdoor conceptual we have the meeting before the photoshoot such as to discuss about concept, outfit and location before photo&videoshoot. Make up will be running in our Studio at Kelapa Gading Time Schedulle for Shooting 4 Hours for session1, 4 Hours for session2",
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
