<template>
  <div class="px-15">
    <div>
      <span v-if="isEdit">edit blog</span>
      <span v-else>new blog</span>
    </div>

    <div>
      <ValidationObserver ref="observer" v-slot="{ validate, invalid }">
        <div class="form-group d-flex my-3">
          <label class="me-3">Title<required-mark /></label>
          <ValidationProvider name="title" rules="required|max:249" v-slot="{ errors }">
            <input type="text" name="title" class="form-control form-control-lg" v-model="blogData.title"/>
            <span class="error-explanation">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group d-flex my-3">
          <label class="me-3">Title<required-mark /></label>
          <ValidationProvider name="content" rules="required|max:249" v-slot="{ errors }">
            <input type="text" name="content" class="form-control form-control-lg" v-model="blogData.content"/>
            <span class="error-explanation">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="custom-file d-flex my-3">
          <label class="me-3">Image</label>
          <div class="custom-file-input d-flex align-item-center flex-column">
            <input
              class="fh-50"
              accept="image/*"
              maxsize="10000000"
              type="file"
              ref="file"
              @change="addMedia($event)"
            />

            <div v-if="blogData.image.url" class="blog-image mt-2" :style="{ backgroundImage: 'url(' + blogData.image.url + ')'}"></div>
          </div>
        </div>

        <div class="d-flex justify-content-start my-2">
          <submit-button object="Create" class="btn btn-modal" @click="validate().then(onSubmit)"></submit-button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        idRc: null,
        imageBlob: null,
        blogData: {
          title: '',
          content: '',
          image: {
            url: ''
          },
        },
        isEdit: false,
      }
    },
    created() {
      this.idRc = parseInt(this.$route.params.id)
      if (this.idRc !== 0) {
        this.loadBlog()
        this.isEdit = true
      }
    },
    methods: {
      ...mapActions('blog', ['newBlog', 'getBlog', 'updateBlog']),
      addMedia(event) {
        const file = event.currentTarget.files[0]
        const _this = this;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          _this.blogData.image.url = e.target.result;
          _this.imageBlob = file;
        };
      },
      async onSubmit() {
        let data = new FormData();
        data.append('blog[image]', this.imageBlob);
        data.append('blog[title]', this.blogData.title);
        data.append('blog[content]', this.blogData.content);
        if (this.isEdit) {
          const dataEdit = {
            id: this.idRc,
            formData: data
          }
          const res = await this.updateBlog(dataEdit);
          this.onReceiveCreateBroadcastResponse(res.status == 201)
        } else {
          const res = await this.newBlog(data);
          this.onReceiveCreateBroadcastResponse(res.status == 201)
        }
      },
      // Handle broadcast creation response
      onReceiveCreateBroadcastResponse(success) {
        if (success) {
          window.toastr.success('success')
          this.$router.push({ path: '/' })
        } else {
          window.toastr.error('error')
        }
      },
      async loadBlog() {
        const res = await this.getBlog({ id: this.idRc })
        if (res.status == 200) this.blogData = _.cloneDeep(res.data.data)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .blog-image {
    display: inline-block;
    height: 150px;
    width: 130px;
    background-size: cover;
    background-position: center center;
    text-align: center;
  }
</style>