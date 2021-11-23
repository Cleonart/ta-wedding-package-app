<template>
  <v-card class="mx-auto" style="overflow-x: hidden">
    <Header />

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-subtitle class="text-h6" style="margin-top: 5px">
          Kristian Dame
        </v-list-item-subtitle>

        <v-list-item-title class="text-caption mt-1">
          0821786761408
        </v-list-item-title>
      </v-list-item-content>

      <v-btn class="ml-2 mr-2" fab dark x-small color="#212121">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
    </v-list-item>

    <!-- Pilihan -->

    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card color="#212121" dark>
            <v-list-item three-line>
              <v-list-item-avatar tile size="80">
                <v-img :src="item.src"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="item.title"
                  class="text-button text-uppercase font-weight-bold mb-1"
                >
                </v-list-item-title>

                <v-list-item-subtitle
                  v-text="'by ' + item.vendor"
                  class="text-caption"
                  style="margin-top: -10px"
                >
                </v-list-item-subtitle>
                <div v-text="item.price" class="text-overline"></div>
              </v-list-item-content>

              <v-btn class="ml-2 mr-2" fab dark x-small color="yellow darken-3">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <!-- Checkout -->

      <div class="ml-1 mt-5">
        <p class="font-weight-bold">Checkout</p>
      </div>

      <v-card style="margin-top: 10px" color="#F9A825" dark>
        <div style="margin-left: 10px">
          <p class="text-button font-weight-bold">TOTAL</p>
          <p
            style="margin-top: -20px; margin-bottom: -10px"
            class="font-weight-bold"
          >
            IDR 13,000,000
          </p>
        </div>
        <v-list-group
          style="margin-left: -20px"
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Payment</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="([title, icon], i) in payment" :key="i" link>
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-card>
    </v-container>

    <v-bottom-navigation v-model="value">
      <v-btn value="recent">
        <span>Book Now</span>

        <v-icon>mdi-ring</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <footer>
      <p
        class="text-center pt-2 mt-5"
        style="border-top: 1px solid black; font-size: 12px"
      >
        Hope you have a nice and beautiful day
      </p>
    </footer>
  </v-card>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data: () => ({
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Nikah Jumbo",
        vendor: "Jumbo Restaurant",
        price: "IDR 5,000,000",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Bapesta",
        vendor: "Rumah Alam",
        price: "IDR 8,000,000",
      },
    ],

    selectedPayment: 1,
    payment: [
      ["Cash", "mdi-cash-multiple"],
      ["Card", "mdi-credit-card-multiple-outline"],
    ],
  }),
};
</script>
