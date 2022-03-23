<template>
  <p
    style="
      font-family: 'Serif';
      text-align: center;
      border-bottom: 1px solid black;
    "
    class="py-3"
  >
    <v-snackbar v-model="dialog">
      {{ dialog_txt }}
    </v-snackbar>

    <img @click="gotoHome" src="@/assets/pic.png" style="width: 120px" />

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          style="
            font-family: 'Sans-Serif';
            position: absolute;
            left: 15px;
            top: 12px;
          "
          color="primary"
          size="32"
        >
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="logOut()">Keluar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Cart Badge [Top Right] -->
    <v-badge
      :content="cart"
      :value="cart"
      style="position: absolute; right: 15px; top: 15px"
      color="red"
      overlap
    >
      <v-icon @click="gotoShoppingCart" medium> mdi-cart </v-icon>
    </v-badge>
  </p>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialog_txt: true,
      cart: []
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    gotoShoppingCart() {
      this.$router.push("/shoppingcart");
    },
    logOut() {
      let app = this;
      this.dialog = true;
      this.dialog_txt = "Anda berhasil keluar dari akun anda";
      sessionStorage.clear();
      setTimeout(function () {
        app.$router.replace("/login");
      }, 1000);
    },
  },
};
</script>
