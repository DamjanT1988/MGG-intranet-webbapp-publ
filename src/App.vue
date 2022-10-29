<template>
  <div class="container">
    <!-- infoga Header-component-->
    <Header />

    <!--  infoga RouterView-->
    <main>
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script>


import { RouterView } from 'vue-router'

// importera header/footer till rootkomponent
import Header from './components/main/Header.vue'
import Footer from './components/main/Footer.vue'

// använd header/footer
export default {
  // använd komponenter
  components: {
    Header, RouterView, Footer
  },
  methods: {
  // kolla om användare inloggad via token i kaka
    checkLogin() {
      //console.log(document.cookie)
      if (document.cookie == "" || document.cookie == "UserToken=") {
        document.getElementById("add").innerHTML = "";
        document.getElementById("manage").innerHTML = "";
        document.getElementById("logout").innerHTML = "";
        document.getElementById("start").innerHTML = "";
      } else {
        document.getElementById("start").innerHTML = "";
      }
    }
  },

  // kolla användarstatus i varje sida vid inladdning
  mounted() {
    this.checkLogin();
  }
}




</script>


<style scoped>

</style>
