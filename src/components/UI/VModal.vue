<template>
  <div class="dialog" v-if="show" @click="hideModal">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MToggle from "@/mixins/MToggle";

export default {
  name: 'v-dialog',
  mixins: [MToggle]
}
</script>

<style scoped>
  .dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    display: flex;
    position: fixed;
  }
  .dialog_content {
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    min-height: 100px;
    min-width: 300px;
    padding: 15px;
  }
</style>