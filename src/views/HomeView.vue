<template>
  <br>
  <div class="row">
    <div class="col-md bg-dark bg-gradient text-white p-4">
      <!-- logga in-del-->
      <h2>LOG IN</h2>
      <p>
        Log in below, then navigate through the buttons in top.
      </p>
      <!-- kalla på en barnkomponent-->
      <Login />
    </div>

    <div class="col-md bg-dark bg-gradient text-white p-4">
      <h2>REGISTER</h2>
      <p>
        Register below. The key is used by the employer.
      </p>
      <!-- kalla på en barnkomponent: MGG7654??-->
      <Registration />

    </div>
  </div>
</template>

<script scoped>
// importera
import Login from '../components/user/Login.vue';
import Registration from '../components/user/Registration.vue';

export default {
  // lägg till komponenter
  components: {
    Login, Registration
  }
}
</script>