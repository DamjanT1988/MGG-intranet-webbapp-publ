<!-- lägg till bibliotekfunktioner-->
<template>
    <!-- händelselyssnare för DELETE, genom ett EMIT mot föräldrarkomponent-->
    <article class="listobject">
        <!-- fixa listan med HTML-->
        <h3 id="h3title">{{ product.product_title }} <br>#{{ product.id }}</h3>
        <br>
        <p><strong>Product title:</strong>
        <p class="list">{{ product.product_title }} </p>
        </p>
        <p><strong>Article number:</strong>
        <p>{{ product.id }} </p>
        </p>
        <p><strong>EAN number:</strong>
        <p>{{ product.ean_number }} </p>
        </p>
        <p><strong>Product description:</strong>
        <p>{{ product.product_description }} </p>
        </p>
        <p><strong>Selling price:</strong>
        <p>{{ product.price }} kr</p>
        </p>
        <p><strong>Amount in storage:</strong>
        <p>{{ product.amount_storage }}</p>
        </p>
        <!-- knappar för öka/minska lager med händelselyssnare-->
        <button class="btn btn-light-red lager" @click="decrease(product.id, product.amount_storage, 'UserToken')">
            -1 storage</button>
        <button class="btn btn-light-green lager" @click="increase(product.id, product.amount_storage, 'UserToken')">
            +1 storage</button>
        <br>
        <p><strong>Expiration date:</strong>
        <p>{{ product.expiration_date }} </p>
        </p>
        <p><strong>Visual description:</strong>
        <p>{{ product.image_alt }} </p>
        </p>
        <p><strong>Article created:</strong>
        <p>{{ product.created_at }} </p>
        </p>
        <p><strong>Article updated:</strong>
        <p>{{ product.updated_at }} </p>
        </p>
        <br>
        <!-- händelselyssnare som skickar id till funktion att förstöra en artikel-->
        <button @click="deleteProduct(product.id, 'UserToken')" class="btn btn-red"> Delete article!</button>

        <br>
        <hr><br>
    </article>
</template>


<script scoped>

// ta emot objekter; markera product-objekt som objekt
export default {
    props: {
        product: Object
    },
    // hämta data dynamiskt via AJAX; skapa funktion (hämtar inte)
    methods: {
        // funktion för att öka/minska lager
        async increase(id, amount, cname) {
            this.product.amount_storage++;

            const amountComp = amount + 1;
            // skapa en JS-objekt att skicka med
            let productBody = {
                id: id,
                amount_storage: amountComp
            };

            //hitta token i kaka sedan skicka id till API 
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
                        // 22-6 omvandla JS-objekt till JSON
                        body: JSON.stringify(productBody)
                    })
                }
            }
        },

        // funktion för att öka/minska lager
        async decrease(id, amount, cname) {
            this.product.amount_storage--;

            const amountComp = amount - 1;
            // skapa en JS-objekt att skicka med
            let productBody = {
                id: id,
                amount_storage: amountComp
            };

            //hitta token i kaka sedan skicka id till API 
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
                }
            }
        },
        // skapa funktion för DELETE; skickar ID som parameter; 20.-> async
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
                    // nytt AJAX-anrop, med FETCH-data
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

                    // läs in bibliotek på nytt
                    this.$emit("addedProduct");
                }
            }
        }
    },
    // deklarera emit före
    emits: ["addedProduct"]

}

</script>

<style scoped>
#h3title {
    font-weight: bolder;
    font-size: 1.65em;
}

strong,
h3 {
    font-size: 1.4em;
}

label {
    font-weight: bold;
    font-size: 1.5em;
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
</style>