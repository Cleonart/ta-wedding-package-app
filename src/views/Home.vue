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
        <v-col v-for="(item, i) in items" :key="i" :cols="item.col">
          <v-card v-if="item.status == 'Favorite'" color="#D7CCC8">
            <v-img class="white--text align-end" height="200px" :src="item.img">
            </v-img>

            <v-card-title v-text="item.title"></v-card-title>

            <v-card-subtitle v-text="item.detail"></v-card-subtitle>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" :src="item.src"> </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.vendor"></v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <span class="subheading mr-2" v-text="item.price"></span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>

          <v-card v-if="item.status == 'Basic'" color="#D7CCC8">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title v-text="item.title"></v-card-title>

                <v-card-subtitle v-text="item.detail"></v-card-subtitle>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar>
                      <v-img class="elevation-6" :src="item.src"> </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.vendor"
                      ></v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <span class="subheading mr-2" v-text="item.price"></span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    item: {},
    items: [
      {
        title: "Intimate Wedding Package",
        detail: "Foster the People",
        price: "IDR 19.000.000,-",
        src: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        vendor: "Jumbo Restaurant",
        status: "Favorite",
        img: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        col: 12,
      },
      {
        title: "Supermodel",
        detail: "",
        price: "IDR 2.500.000,-",
        src: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        vendor: "Foster the People",
        status: "Basic",
        col: 4,
      },
      {
        title: "Halcyon Days",
        detail: "",
        price: "IDR 10.000.000,-",
        src: "",
        vendor: "Ellie Goulding",
        status: "Basic",
        col: 4,
      },
      {
        title: "Halcyon Days",
        detail: "",
        price: "IDR 2.500.000",
        src: "",
        vendor: "Ellie Goulding",
        status: "Basic",
        col: 4,
      },
    ],
  }),
};
</script>
