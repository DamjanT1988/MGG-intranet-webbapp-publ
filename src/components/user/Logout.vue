<template>
    <br>
    <button @click="logoutUser('UserToken')" class="btn btn-red">LOG OUT</button>
    <br>
    <br>
</template>

<script scoped>
export default {
    methods: {
        // logga ut-funktion
        async logoutUser(cname) {

            // hitta token i kaka
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

                    const resp = await fetch("https://produktlagerapi.herokuapp.com/api/logout", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    // ta bord nuvaranda token i kaka
                    document.cookie = "UserToken=";

                    //rensa meny
                    document.getElementById("add").innerHTML = " ";
                    document.getElementById("manage").innerHTML = " ";
                    document.getElementById("logout").innerHTML = " ";

                    // gå tillbaka till startsida
                    this.$router.push({ name: 'start' })
                }
            }
        }
    }
}
</script>


<style scoped>
.btn-red {
    background-color: white;
    color: red;
}
</style>