<template>
  <div class="vue-tempalte">
    <ValidationObserver ref="observer" v-slot="{ validate, invalid }">
        <h3>Sign Up</h3>
        <div class="form-group">
          <label>Full Name<required-mark /></label>
          <ValidationProvider name="name" rules="required|max:49" v-slot="{ errors }">
            <input type="text" name="name" class="form-control form-control-lg" v-model="userData.name"/>
            <span class="error-explanation">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label>Email address<required-mark /></label>
          <ValidationProvider name="email" rules="required|max:49|email" v-slot="{ errors }">
            <input type="email" class="form-control form-control-lg" v-model="userData.email"/>
            <span class="error-explanation">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label>Password<required-mark /></label>
          <ValidationProvider name="password" rules="required|min:8|max:49" v-slot="{ errors }" vid="password">
            <input type="password" class="form-control form-control-lg" v-model="userData.password"/>
            <span class="error-explanation">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label>Password Confirmation<required-mark /></label>
          <ValidationProvider name="passwordConfirmation" rules="required|min:8|max:49|confirmed:password" v-slot="{ errors }">
            <input type="password" class="form-control form-control-lg" v-model="userData.passwordConfirmation"/>
            <span class="error-explanation">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="custom-file fw-200">
          <label>Avatar</label>
          <div class="custom-file-input h-100 w-100">
            <input
              class="fh-50"
              accept="image/*"
              maxsize="10000000"
              type="file"
              ref="file"
              @change="addMedia($event, 'input')"
            />
          </div>
        </div>

        <div class="d-flex justify-content-end my-2">
          <button class="btn btn-info fw-120" :disabled="invalid" @click="validate().then(onSubmit)">登録</button>
        </div>

        <p class="register text-right">
          Already registered 
          <router-link :to="{name: 'login'}">sign in?</router-link>
        </p>
    </ValidationObserver>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        userData: {
          name: '',  
          email: '',  
          password: '',
          passwordConfirmation: '',
          avatar: null
        },
        submitted: false
      }
    },
    created() {
      console.log(process.env);
    },
    methods: {
      ...mapActions('auth', ['register']),

      async addMedia(event, status) {
        const input = status === 'input' ? event.currentTarget.files[0] : event.dataTransfer.files[0]

      },

      async onSubmit() {
        this.submitted = true
        const res = await this.register(this.userData);
      }
    }
  }
</script>