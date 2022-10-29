<template>
    <!-- formulär för att registrera-->
    <form @submit.prevent="registerUser(securitykey)">
        <label>Your first and last name:</label>
        <br>
        <input v-model="name" type="text" id="name" class="form-control-lg">
        <br><br>

        <label>Your company email:</label>
        <br>
        <input v-model="email" type="text" id="email" class="form-control-lg">
        <br><br>

        <label>Your desired password:</label>
        <br>
        <input v-model="password" type="password" id="password" class="form-control-lg">
        <br><br>

        <label>Security key (MGG7654??):</label>
        <br>
        <input v-model="securitykey" type="text" id="securitykey" class="form-control-lg">
        <br><br>

        <input type="submit" value="Register!" class="btn btn-dark">
        <br>

        <p id="responseReg"></p>

    </form>
</template>

<script scoped>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            securitykey: ""
        }
    },
    // skapa funktion för att lagra data - ASYNC/WAIT alltid vid fetch()
    methods: {
        async registerUser(secKey) {

/*            const resp2 = await fetch("http://127.0.0.1:8000/api/securitykey/1", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })

            // svar från api, lagra i data
            const data2 = await resp2.json();
*/
            // kontroll att något fylls i-- && data2.securitykey == secKey
            if (this.email.length > 0) {

                // skapa en JS-objekt att skicka med
                let productBody = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };

                // skicka till API
                const resp = await fetch("https://produktlagerapi.herokuapp.com/api/register", {
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

                // kolla lyckad registrering
                if (resp.status == 201) {
                    // skriv ut meddelande
                    document.getElementById("responseReg").innerHTML = data.message;
                    // spara kaka
                    document.cookie = "UserToken=" + data.token;
                    // uppdatera sida
                    this.$router.go(0);
                } else {
                    document.getElementById("responseReg").innerHTML = data.message;
                    document.cookie = "UserToken=";
                }
                //respons vid inget inmatat eller fel nyckel
            } else {
                document.getElementById("responseReg").innerHTML = "Mata i fält/Fel säkerhetsnyckel";
            }
        }
    }
}
</script>

<style>
#responseReg {
    font-size: 1.5em;
    font-weight: bolder;
    color: red;
}
</style>