<!-- skapa Header-fil med templatekod--> 

<template>
    <header class="row">
        <div>
            <br><br><br><br>
            <!-- skapa huvudmeny-->
            <nav class="navbar fixed-top navbar-dark bg-dark bg-gradient d-flex justify-content-center">

                <!-- skapa länker (känner av RouterLink redan)-->
                <a id="start">
                    <RouterLink to="/" class="m-1 btn btn-light text-decoration-none">START</RouterLink>
                </a>
                <a id="add">
                    <RouterLink to="/productadd" class="m-1 btn btn-light text-decoration-none">ADD</RouterLink>
                </a>
                <a id="manage">
                    <RouterLink to="/productmanagement" class="m-1 btn btn-light text-decoration-none">EDIT</RouterLink>
                </a>
                <a id="logout" class="m-1">
                    <Logout />
                </a>
            </nav>
        </div>
    </header>
</template>

<script>
// importera routerlänk
import { RouterLink } from 'vue-router';
import Logout from '../user/Logout.vue';
// vilka komponenter vi vill använda
export default {
    components: {
        RouterLink, Logout
    }
}
</script>

<style>
.navbar {
    max-height: 20%;
    }
</style>
