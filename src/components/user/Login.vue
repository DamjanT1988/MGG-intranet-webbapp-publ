<template>
    <!-- formulär för att logga in-->
    <form @submit.prevent="loginUser()">
        <label>Your email:</label>
        <br>
        <input v-model="email" type="text" id="email" class="form-control-lg">
        <br><br>

        <label>Your password:</label>
        <br>
        <input v-model="password" type="password" id="password" class="form-control-lg">
        <br><br>

        <input type="submit" value="Log in!" class="btn btn-dark">
        <br>

        <!-- meddelande vid inloggförsök-->
        <p id="responseLoginFail"></p>
        <p id="responseLoginSuccess"></p>
    </form>
</template>

<script scoped>

export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    // skapa funktion för att lagra data - ASYNC/WAIT alltid vid fetch()
    methods: {
        async loginUser() {
            // kontroll att något fylls i
            if (this.email.length > 0) {
                document.getElementById("responseLoginFail").innerHTML = "";
                document.getElementById("responseLoginSuccess").innerHTML = "";

                // skapa en JS-objekt att skicka med
                let productBody = {
                    email: this.email,
                    password: this.password
                };

                // skicka till API
                const resp = await fetch("https://produktlagerapi.herokuapp.com/api/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },

                    // omvandla JS-objekt till JSON
                    body: JSON.stringify(productBody)
                });


                // lagra svar
                const data = await resp.json();
                const msg = data.message;

                //kolla om lyckad inlogg med token
                if (data.token == undefined) {
                    //inget värde
                    document.cookie = "UserToken=";
                } else {
                    //sätt värde
                    document.cookie = "UserToken=" + data.token;
                    this.$router.go(0);
                }

                if (msg == "Användare inloggad!") {
                    // skriv ut meddelande
                    document.getElementById("responseLoginSuccess").innerHTML = data.message;
                } else {
                    document.getElementById("responseLoginFail").innerHTML = data.message;
                }
            }
        }
    }
}
</script>

<style scoped>
#responseLoginFail {
    font-size: 1.5em;
    font-weight: bolder;
    color: red;
}

#responseLoginSuccess {
    font-size: 1.5em;
    font-weight: bolder;
    color: green;
}
</style>