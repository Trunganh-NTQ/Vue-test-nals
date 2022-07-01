<template>
  <div class="d-inline p-0 m-0">
    <button
      type="submit"
      :class="`btn btn-success ${classes}`"
      @click="$emit('click')"
    >
      <span v-if="object">{{ object }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['object', 'action', 'submitted', 'disabled', 'classes']
};
</script>