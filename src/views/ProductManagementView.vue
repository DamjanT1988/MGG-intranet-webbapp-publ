<template>
  <!-- skapa en ny view-fil-->
  <div class="container text-center">
    <br>
    <div class="row">
      <div class="col-md p-1">
        <h2>EDIT AN ARTICLE</h2>
        <p>
          <strong>
            Search for the article product number for edit: if no result then the article number does not exist. Edit of
            article number might write over existing article.
          </strong>
        </p>
        <!--barnkomponent med en emit-->
        <SoleProductUpdate @addedProduct="getProducts('UserToken')" />
      </div>
      <div class="col-md p-1">
        <h2>ALL PRODUCTS VIEW</h2>
        <p>
          <strong>Search a product by any key word (like product name or #1 article number) and view the result below; or view the whole list
            below without search; reload to search the whole list again: </strong>
        </p>
        <SearchList />
        <br>

        <p>
          <strong>
            Newest product shown first.
          </strong>
        </p>

        <!--barnkomponent med flera emits 
          (@deleteProduct="deleteProduct(product.id, 'UserToken')" 
          @updateProduct="updateProduct(product.id, 'UserToken'))"-->
        <ListProductsLimited @click="getProducts('UserToken')" v-for="product in reverseObjects" :product="product"
          :key="product.id" />

      </div>

    </div>
  </div>

</template>

<script>
// importera komponent
import ListProductsLimited from '../components/list/ListProductsLimited.vue';
import SoleProductUpdate from '../components/edit/SoleProductUpdate.vue';
import SearchList from '../components/list/SearchList.vue';

export default {
  // skapa props för varje AddProduct-objekt
  // array skickas med till relevant komponent (AddProducts)
  // dessa array-objekt har properties som skrivs ut 
  data() {
    return {
      products: []
    }
  },

  //omvänd ordning av lista
  computed: {
    reverseObjects() {
      return this.products.reverse();
    }
  },
  // lägg till komponenter
  components: {
    ListProductsLimited, SoleProductUpdate, SearchList
  },
  //  hämta data dynamiskt via AJAX; skapa funktion (hämtar inte)
  methods: {
    // hämta data om produkter med token; hitta token
    async getProducts(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          const token = c.substring(name.length, c.length);
          // vue-fetch syntax mot API/webbtjänst (await = vänta in ett svar)
          const resp = await fetch("https://produktlagerapi.herokuapp.com/api/lager", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          // svar från api, lagra i data
          const data = await resp.json();

          // lagra listan
          this.products = data;
        }
      }
    },
  },

  //skapa funktion med metod mounted för att anropa API; kör när laddats in
  mounted() {
    this.getProducts('UserToken');

    if (document.cookie == "UserToken=") {
      this.$router.push({ name: 'start' })
    }
  },
}

</script>

<style>

</style>