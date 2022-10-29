<template>
    <!--  skapa formulär för inmatning av data-->
    <!--  lägg till händelselyssnare för att fånga submit/data (prevent default = ej laddas om)-->
    <form @submit.prevent="addProduct('UserToken')">
        <label for="addProduct" class="form-control-lg">Product title:</label>
        <br><br>
        <!-- länka inmatningsfält med "produkt"" i data (dynamiskt)-->
        <input v-model="product_title" type="text" class="form-control-lg" required>
        <br><br>

        <!-- lägg till övrigt-->
        <label for="addProduct" class="form-control-lg">EAN number:</label>
        <br><br>
        <input v-model="ean_number" type="text" class="form-control-lg">
        <br><br>

        <label for="addProduct" class="form-control-lg">Product description:</label>
        <br><br>
        <textarea v-model="product_description" type="text" placeholder="max 200 words" class="form-control-lg" rows="3"
            max-rows="6"></textarea>
        <br><br>

        <label for="addProduct" class="form-control-lg">Selling price:</label>
        <br><br>
        <input v-model="price" type="number" class="form-control-lg">
        <br><br>

        <label for="addProduct" class="form-control-lg">Amount in storage:</label>
        <br><br>
        <input v-model="amount_storage" type="number" class="form-control-lg">
        <br><br>

        <label for="addProduct" class="form-control-lg">Expiration date (earliest):</label>
        <br><br>
        <input v-model="expiration_date" type="text" placeholder="yyyy-mm-dd" class="form-control-lg">
        <br><br>

        <label for="addProduct" class="form-control-lg">Image description:</label>
        <br><br>
        <input v-model="image_alt" type="text" placeholder="key words" class="form-control-lg">
        <br><br>
        <!-- -->
        <input type="submit" value="Add product!" class="btn btn-dark">
    </form>

</template>

<script>

// skapa data för inmatning - länka det med objektet i data med HTML-elementet
export default {
    data() {
        return {
            product_title: "",
            ean_number: "",
            product_description: "",
            price: "",
            amount_storage: "",
            expiration_date: "",
            image_file_path: "",
            image_alt: ""
        }
    },
    // 22-3 skapa funktion för att lagra data - ASYNC/WAIT alltid vid fetch()
    methods: {
        async addImage() {
            const resp = await fetch("https://produktlagerapi.herokuapp.com/api/upload-file", {
                method: "POST",
                headers: { "Content-type": "application/json" }
            }
            )
            console.log(resp)
        },

        async addProduct(cname) {
            // kontroll att något fylls i
            if (this.product_title.length > 0) {

                // skapa en JS-objekt att skicka med
                let productBody = {
                    product_title: this.product_title,
                    ean_number: this.ean_number,
                    product_description: this.product_description,
                    price: this.price,
                    amount_storage: this.amount_storage,
                    expiration_date: this.expiration_date,
                    image_alt: this.image_alt
                };

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
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            // omvandla JS-objekt till JSON
                            body: JSON.stringify(productBody)
                        });

                        // töm inmatningsfält
                        this.product_title = "";
                        this.ean_number = "";
                        this.product_description = "";
                        this.price = "";
                        this.amount_storage = "";
                        this.expiration_date = "";
                        this.image_file_path = "";
                        this.image_alt = "";

                        // ladda om listan vid submit via emit mot förälderkomoponent
                        this.$emit("addedProduct");
                    }
                }
            }
        }
    },

   // deklarera emit före
    emits: ["addedProduct"]
}
</script>

<style scoped>
label {
    font-weight: bold;
    font-size: 1.65em;
}
</style>