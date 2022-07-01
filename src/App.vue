<template>
  <div id="app" class="vue-tempalte">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
        <div class="d-flex" v-if="isShownInputSearch">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" v-model="queryParams.search">
          <submit-button object="Search" class="btn btn-modal" @click="onSearch"></submit-button>
        </div>
      </div>
    </nav>
    <!-- Main -->
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
        return {
          queryParams: {
            search: ''
          },
          isShownInputSearch: false
        };
    },
    created() {
      this.queryParams = _.cloneDeep(this.getQueryParams)
      this.isShownInputSearch = this.getSearch
    },
    computed: {
      ...mapGetters('blog', ['getQueryParams']),
      ...mapGetters('system', ['getSearch']),
    },
    watch: {
      getSearch(newValue, oldValue) {
        this.isShownInputSearch = newValue
      },
    },
    methods: {
      ...mapMutations('blog', ['setQueryParam']),
      ...mapActions('blog', ['getBlogs']),
      async onSearch() {
        this.$store.dispatch('system/setLoading', true);
          this.setQueryParam(this.queryParams)
          await this.getBlogs({ page: this.queryParams.page || 1, search: this.queryParams.search })
        this.$store.dispatch('system/setLoading', false);
      },
    }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
