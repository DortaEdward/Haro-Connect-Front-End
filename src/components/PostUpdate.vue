<template>
  <form class='container'>
    <div class="form-group my-1">
      <label class='my-4'>Content</label>
      <textarea
      v-model="contentRef"
      type="text"
      class="form-control"/>
    </div>
    <button
      type="button"
      @click='updatePost'
      class="btn btn-primary my-4">Submit Update</button>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const contentRef = ref('');
    const route = useRoute();
    const router = useRouter();
    const getPost = async (id) => {
      if (localStorage.tokken) {
        const url = `${process.env.VUE_APP_BASE_APIURL}/api/v1/posts/${id}`;
        console.log(url);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.tokken}`,
          },
        });
        const json = await response.json();
        contentRef.value = json.data.content;
      }
    };
    const updatePost = async () => {
      if (localStorage.tokken) {
        console.log(contentRef.value);
        const url = `${process.env.VUE_APP_BASE_APIURL}/api/v1/posts/update/${route.params.postId}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.tokken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: contentRef.value,
          }),
        });
        console.log(await response.json());
        if (response.ok) {
          router.push({ name: 'Home' });
        }
      }
    };

    onMounted(() => {
      getPost(route.params.postId);
    });
    return {
      contentRef,
      updatePost,
    };
  },
};
</script>

<style>

</style>
