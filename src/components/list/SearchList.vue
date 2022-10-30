<template>
    <!-- input-tagg @click="search_product()"-->
    <form @submit.prevent="search_product()">
        <input id="searchbar" type="text" name="search" class="form-control-lg" placeholder="key word">
        <br><br>
        <input type="submit" class="btn btn-dark" value="Search!">
    </form>
    <br>
    <button class="btn btn-dark" @click="reloadList()">Reload list!</button>

</template>

<script>

export default {
    methods: {
        // sök product-funktion
        async search_product() {
            //variabler
            let input = document.getElementById('searchbar').value
            //gör text till gemaner
            input = input.toLowerCase();
            let x = document.getElementsByClassName('listobject');
            let i;

            //loopa igenom alla HTML-objekt
            for (i = 0; i < x.length; i++) {
                //göm icke-match
                if (!x[i].innerHTML.toLowerCase().includes(input)) {
                    x[i].style.display = "none";
                }
                //visa matchade
                else {
                    x[i].style.display = "item";
                }
            }
        },

        reloadList() {
            this.$router.go(0);
        }


    }
}
</script>

<style>

</style>