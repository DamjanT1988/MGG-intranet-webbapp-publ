<template>
    <!-- skapa en ny view-fil-->
    <div class="container text-center">
        <br>
        <div class="row">
            <div class="col-md p-1">
                <h2>ADD A PRODUCT</h2>
                <p>
                    <strong>Add a new product article below; title and EAN number must be filled:</strong>
                </p>
                <!-- ladda om listan från barnkomponent-->
                <AddProduct @addedProduct="getProducts('UserToken')" />
                <br><br>

            </div>
            <div class="col-md p-1">
                <h2>YOUR PRODUCTS</h2>
                <p>
                    <strong>The five latest new products are shown; newest first:</strong>
                </p>
                <br>
                <!--  @click-funktion för att hämta vid klick/tag bort-->
                <!-- rendera endast 10 senaste objekt med .slice()-metod-->
                <ListProductsLimited @addedProduct="getProducts('UserToken')"
                    v-for="product in reverseObjects.slice(0,5)" :product="product" :key="product.id" />
            </div>
        </div>
    </div>

</template>

<script>
// importera komponent
import ListProductsLimited from '../components/list/ListProductsLimited.vue';
import AddProduct from '../components/edit/AddProduct.vue';


export default {
    // lägg till komponenter
    components: {
        ListProductsLimited,
        AddProduct
    },

    // skapa props för varje AddProduct-objekt
    // array skickas med till relevant komponent (AddProducts)
    // dessa array-objekt har properties som skrivs ut 
    data() {
        return {
            products: []
        }
    },

    computed: {
        // omvänd ordning av lista (sist skapade syns först)
        reverseObjects() {
            return this.products.reverse();
        }
    },
    // hämta data dynamiskt via AJAX; skapa funktion (hämtar inte)
    methods: {
        async getProducts(cname) {
            // hitta token i kaka
            // vue-fetch syntax mot API/webbtjänst (await = vänta in ett svar)
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
        }
    },

    // skapa funktion med metod mounted för att anropa API; kör när laddats in
    mounted() {
        this.getProducts('UserToken');

        if (document.cookie == "UserToken=") {
            this.$router.push({ name: 'start' })
        }
    }
}

</script>