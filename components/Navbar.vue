<template>
  <nav class='navbar shadow-1 dark-3 mb-5'>
    <div class='navbar-menu ml-auto'>
      <div v-if='$auth.loggedIn' class='d-flex'>
        <NuxtLink class='navbar-link mr-1 rounded-3' to='/'>Home</NuxtLink>
        <NuxtLink class='navbar-link mr-1 rounded-3' to='/hello'>Hello</NuxtLink>
        <div @click='logout'>
          <NuxtLink class='navbar-link rounded-3' to='/'>Logout</NuxtLink>
        </div>
      </div>
      <div v-else class='d-flex'>
        <NuxtLink class='navbar-link mr-1 rounded-3' to='/'>Home</NuxtLink>
        <NuxtLink class='navbar-link rounded-3' to='/login'>Login</NuxtLink>
        <NuxtLink class='navbar-link rounded-3' to='/register'>Register</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  },
  mounted() {
    this.$auth.refreshTokens()
  }
}
</script>

<style>
.navbar {
  width: 100%;
  height: 80px;
  background-color: #f1fbfe;
}
</style>
