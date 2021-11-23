
<template>
  <v-card :color="item.color" dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div class="w-full">
        <v-card-title class="text-h6" v-text="item.title"></v-card-title>
        <v-card-subtitle v-text="item.detail"></v-card-subtitle>
        <div class="ml-3">
          <v-chip
            v-for="cat in item.category"
            :key="cat"
            pill
            color="orange"
            style="transform: scale(0.9); color: black"
          >
            {{ cat }}
          </v-chip>
        </div>
        <v-card-subtitle class="mb-0 pb-0"
          ><v-icon small color="white darken-2" class="mr-2 -mt-1">
            mdi-domain
          </v-icon>
          {{ item.vendor }}
        </v-card-subtitle>
        <v-card-subtitle class="mt-0 pt-1"
          ><v-icon small color="white darken-2" class="mr-2 -mt-1">
            mdi-currency-usd
          </v-icon>
          {{ formatRupiah(item.price, "Rp. ") }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="gotoDetail" class="ml-2 mt-1 mb-3" outlined rounded small>
            Buka Paket
            </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    formatRupiah: function (angka, prefix) {
      angka = angka.toString();
      var number_string = angka.replace(/[^,\d]/g, "").toString();
      var split = number_string.split(",");
      var sisa = split[0].length % 3;
      var rupiah = split[0].substr(0, sisa);
      var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
      var separator;
      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }
      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    },

    gotoDetail(){
      this.$router.push('/detail');
    }
  },
};



</script>