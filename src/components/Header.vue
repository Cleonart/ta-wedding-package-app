<template>
  <p
    style="
      font-family: 'Serif';
      text-align: center;
      border-bottom: 1px solid black;
    "
    class="py-3"
  >
    <img @click="gotoHome" src="@/assets/pic.png" style="width: 120px" />

    <v-avatar
      style="
        font-family: 'Sans-Serif';
        position: absolute;
        left: 15px;
        top: 12px;
      "
      color="primary"
      size="32"
      ><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
    /></v-avatar>

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
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    gotoShoppingCart() {
      this.$router.push("/shoppingcart");
    },
  },
};
</script>
