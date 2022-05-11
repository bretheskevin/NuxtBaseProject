<template>
  <div>
    <Navbar/>
    <form>
      <div class="grix xs1">
        <h1>Login</h1>
        <div class="form-field">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control rounded-1" v-model="name"/>
        </div>
        <div class="form-field">
          <label for="name">Password</label>
          <input type="password" id="password" class="form-control rounded-1" v-model="password"/>
        </div>
      </div>
      <div class="btn shadow-1 rounded-1 blue" @click="login">Login</div>
      <p class="text-red">{{ this.errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'index',
  auth: false,

  data() {
    return {
      name: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.name,
            password: this.password
          }
        })

        // await this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    }
  }
}
</script>

<style scoped>
form {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
