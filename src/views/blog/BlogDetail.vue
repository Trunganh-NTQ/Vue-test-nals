<template>
  <div>
    <div class="px-15" :class="isLoading ? 'd-none' : ''">
      <div class="d-flex mt-4">
        <img :src="blog.image.url" class="w-350 mr-3" alt="">
        <div class="media-body d-block text-start p-2">
          <h5 class="mt-0 mb-1">{{ blog.title}}</h5>
          {{blog.content}}
        </div>
      </div>
      <div class="d-flex mt-4">
        <router-link class="mx-2" to="/">Back to list</router-link> |
        <router-link class="mx-2" :to="{ name: 'blogNew', params: { id: idRc }}">Edit</router-link>
      </div>
    </div>
    <loading-spinner></loading-spinner>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  export default {
  data() {
      return {
        idRc: null,
        blog: {
          content: '',
          title:'',
          image: {
            url: ''
          }
        },
        isLoading: false
      }
    },
    created() {
      this.idRc = this.$route.params.id
      this.loadBlog()
    },
    methods: {
      ...mapActions('blog', ['getBlog']),
      async loadBlog() {
        this.$nextTick(async() => {
          this.$store.dispatch('system/setLoading', true);
          this.isLoading = true;
          const res = await this.getBlog({ id: this.idRc })
          if (res.status == 200) this.blog = _.cloneDeep(res.data.data)
          this.$store.dispatch('system/setLoading', false);
          this.isLoading = false;
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>