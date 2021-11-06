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
      <!-- Review -->
      <v-carousel
        :continuous="false"
        :cycle="cycle"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="300"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-list two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Jumbo Restaurant</v-list-item-title>
            <v-list-item-subtitle>Wedding Venue</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Isi Paket -->
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.col">
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
    cards: [
      {
        title: "Ballroom",
        src: "https://image.freepik.com/free-photo/restaurant-ballroom-ornated-with-flowers_140725-3811.jpg",
        price: "Rp 5.000.000,-",
        about:
          "menyediakan tempat untuk 500 - 1000 orang dengan dekorasi sesuai keinginan calon pengantin",
        col: 4,
      },
      {
        title: "Hair and Makeup",
        src: "https://image.freepik.com/free-photo/top-view-arrangement-with-beauty-bag-copy-space_23-2148301851.jpg",
        price: "Rp 12.000.000,-",
        about: "makeup untuk brides dan juga bridesmaid",
        col: 4,
      },
      {
        title: "Photography",
        src: "https://image.freepik.com/free-photo/high-angle-shot-lens-headphones-gimbal-phone_181624-43878.jpg",
        price: "Rp 25.500.000,-",
        about: "terdiri dari preweding, morning express, photobooth dan acara ",
        col: 4,
      },
    ],

    colors: [
      "green",
      "secondary",
      "yellow darken-4",
      "red lighten-2",
      "orange darken-1",
    ],

    reveal: false,

    cycle: false,
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
  }),
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
