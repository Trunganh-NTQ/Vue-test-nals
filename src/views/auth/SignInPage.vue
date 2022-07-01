<template>
  <div class="vue-tempalte">
      <h3>Sign In</h3>
      <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control form-control-lg" />
      </div>
      <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      <p class="register text-right mt-2 mb-4">
          <router-link to="/register">New Account?</router-link>
      </p>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {}
        }
    }
</script>