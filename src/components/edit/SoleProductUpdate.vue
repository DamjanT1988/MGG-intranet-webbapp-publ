<template>

    <br>
    <!-- formulär för att skriva in eftersökt artikelnummer-->
    <form @submit.prevent="getProductsById(product.artid, 'UserToken')">
        <input v-model="product.artid" type="text" placeholder="article number" class="form-control-lg">
        <p hidden class="hidden" id="id">{{ product.artid }}</p>
        <br><br>
        <input type="submit" value="Get article!" class="btn btn-dark">
        <br><br><br>
    </form>

    <!-- händelselyssnare för DELETE, genom ett EMIT mot föräldrarkomponent-->
    <form @submit.prevent="updateProduct(product.id, 'UserToken')">
        <label for="updateProduct" class="font-weight-bold">Product article number:</label>
        <br><br>
        <input v-model="product.id" type="text" class="form-control-lg">
        <p hidden class="hidden" id="id">{{ product.id }}</p>
        <br><br>

        <label for="updateProduct" class="font-weight-bold">Product title:</label>
        <br><br>
        <!-- länka inmatningsfält med "produkt"" i data (dynamiskt)-->
        <input v-model="product.product_title" type="text" class="form-control-lg">
        <!-- lägg till värde i fält-->
        <p hidden class="hidden" id="product_title">{{ product.product_title }}</p>
        <br><br>

        <!-- lägg till övrigt-->
        <label for="updateProduct" class="font-weight-bold">EAN number:</label>
        <br><br>
        <input v-model="product.ean_number" type="text" class="form-control-lg">
        <p hidden class="hidden" id="ean_number">{{ product.ean_number }}</p>
        <br><br>

        <label for="updateProduct" class="font-weight-bold">Product description:</label>
        <br><br>
        <input v-model="product.product_description" type="text" class="form-control-lg" rows="3" max-rows="6">
        <p hidden class="hidden" id="product_description">{{ product.product_description }}</p>
        <br><br>

        <label for="updateProduct" class="font-weight-bold">Selling price:</label>
        <br><br>
        <input v-model="product.price" type="number" class="form-control-lg">
        <p hidden class="hidden" id="price">{{ product.price }}</p>
        <br><br>

        <label for="updateProduct" class="font-weight-bold">Amount in storage:</label>
        <br><br>
        <input v-model="product.amount_storage" type="number" class="form-control-lg">
        <p hidden class="hidden" id="amount_storage">{{ product.amount_storage }}</p>
        <br><br>

        <label for="updateProduct" class="font-weight-bold">Expiration date:</label>
        <br><br>
        <input v-model="product.expiration_date" type="text" class="form-control-lg">
        <p hidden class="hidden" id="expiration_date">{{ product.expiration_date }}</p>
        <br><br>

        <label for="updateProduct2" class="font-weight-bold">Visual description:</label>
        <br><br>
        <input v-model="product.image_alt" type="text" class="form-control-lg">
        <p hidden class="hidden" id="image_alt">{{ product.image_alt }}</p>
        <br><br>

        <input type="submit" value="Uppdate article!" class="btn btn-dark">
    </form>

    <br>
    <button @click="deleteProduct(product.id, 'UserToken')" class="btn btn-red"> Delete article!</button>
    <br><br>
    <p id="messageUpdate"></p>
    <br>

</template>
    
<script>

export default {
    // skapa props för varje AddProduct-objekt
    // array skickas med till relevant komponent (AddProducts)
    // dessa array-objekt har properties som skrivs ut 

    mounted() {
        // lägg till värde i fält
        this.id = document.getElementById('id').innerHTML;
        this.product_title = document.getElementById('product_title').innerHTML;
        this.ean_number = document.getElementById('ean_number').innerHTML;
        this.product_description = document.getElementById('product_description').innerHTML;
        this.price = document.getElementById('price').innerHTML;
        this.amount_storage = document.getElementById('amount_storage').innerHTML;
        this.expiration_date = document.getElementById('expiration_date').innerHTML;
        this.image_alt = document.getElementById('image_alt').innerHTML;
    },

    props: {
        product: Object
    },

    data() {
        return {
            product: {
                artid: "",
                id: "",
                product_title: "",
                ean_number: "",
                product_description: "",
                price: "",
                amount_storage: "",
                expiration_date: "",
                image_file_path: "",
                image_alt: ""
            }
        }
    },

    // skapa funktion för att lagra data - ASYNC/WAIT alltid vid fetch()
    methods: {
        // hämta artikel genom id och token i kaka
        async getProductsById(id, cname) {
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
                    const resp = await fetch("https://produktlagerapi.herokuapp.com/api/lager/" + id, {
                        method: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })

                    // svar från api, lagra i data
                    const data = await resp.json();

                    // lagra listan
                    this.product = data;
                }
            }
        },
        // uppdate produkten med id & token
        async updateProduct(id, cname) {

            // skapa en JS-objekt att skicka med
            let productBody = {
                id: this.product.id,
                product_title: this.product.product_title,
                ean_number: this.product.ean_number,
                product_description: this.product.product_description,
                price: this.product.price,
                amount_storage: this.product.amount_storage,
                expiration_date: this.product.expiration_date,
                image_file_path: this.product.image_file_path,
                image_alt: this.product.image_alt
            };

            //hitta token i kaka & skicka till API
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
                    const resp = await fetch("https://produktlagerapi.herokuapp.com/api/lager/" + id, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        credentials: 'same-origin',
                        // omvandla JS-objekt till JSON
                        body: JSON.stringify(productBody)


                    })

                    // lagra svar
                    const data = await resp.json();

                    // töm inmatningsfält
                    this.product.id = "";
                    this.product.product_title = "";
                    this.product.ean_number = "";
                    this.product.product_description = "";
                    this.product.price = "";
                    this.product.amount_storage = "";
                    this.product.expiration_date = "";
                    this.product.image_file_path = "";
                    this.product.image_alt = "";

                    // ladda om listan vid submit via emit mot förälderkomoponent
                    this.$emit("addedProduct");
                };
            }
        },

        // skicka med id & token till API för delete
        async deleteProduct(id, cname) {
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
                    // 20. nytt AJAX-anrop, med FETCH-data
                    const resp = await fetch("https://produktlagerapi.herokuapp.com/api/lager/" + id, {
                        method: "DELETE",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    // lagra respons i JSON-format
                    const data = await resp.json()

                    // ladda om listan vid submit via emit mot förälderkomoponent
                    this.$emit("addedProduct");
                    this.updateProduct();

                    document.getElementById("messageUpdate").innerHTML = "Product deleted!"
                };
            }
        }

    },

    //23-1 deklarera emit före
    emits: ["addedProduct"]
}

</script>
    
  
<style scoped>
label {
    font-weight: bold;
    font-size: 1.65em;
}

.btn-red {
    background-color: red;
    color: white;
}

.btn-light-red {
    background-color: #F08784;
    font-weight: bold;
    font-size: 1.4em;
}

.btn-light-green {
    background-color: #A1FB8E;
    font-weight: bold;
    font-size: 1.4em;
}

#messageUpdate {
    color: green;
    font-weight: bolder;
    font-size: 2em;
}
</style>