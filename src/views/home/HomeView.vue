<template>
  <div>
    <div class="px-15" :class="isLoading ? 'd-none' : ''">
      <div>
        <router-link :to="{ name: 'blogNew', params: { id: 0 }}">Create new blog</router-link>
      </div>
      <ul class="list-unstyled my-3" v-for="(blog, index) in blogs" :key="index">
        <li class="media d-flex">
          <router-link :to="{ name: 'blogDetail', params: { id: blog.id }}"><img :src="blog.image.url" class="w-150 mr-3" alt=""></router-link>
          <div class="media-body d-block text-start px-2">
            <h5 class="mt-0 mb-1">{{ blog.title}}</h5>
            {{blog.content}}
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-center">
        <b-pagination
          v-if="totalRows && totalRows/20 > 1"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="my-table"
          first-number
          last-number
          @change="loadBlogs"
        ></b-pagination>
      </div>
    </div>
    <loading-spinner></loading-spinner>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        currentPage: 1,
        queryParams: {
          search: ''
        },
        isLoading: false
      }
    },
    async created() {
      await this.loadBlogs()
      this.queryParams = _.cloneDeep(this.getQueryParams)
      this.currentPage = this.queryParams.page
    },
    computed: {
      ...mapGetters('blog', ['getQueryParams']),
      ...mapState('blog', {
        blogs: state => state.blogs,
        totalRows: state => state.totalRows,
        perPage: state => state.perPage
      }),
    },
    methods: {
      ...mapMutations('blog', ['setQueryParam']),
      ...mapActions('blog', ['getBlogs']),
      async loadBlogs(page) {
        this.$nextTick(async() => {
          this.$store.dispatch('system/setLoading', true);
          this.isLoading = true;
          await this.getBlogs({ page: page || 1, search: this.queryParams.search })
          this.$store.dispatch('system/setLoading', false);
          this.isLoading = false;
        })
      },
    }
  };
</script>
