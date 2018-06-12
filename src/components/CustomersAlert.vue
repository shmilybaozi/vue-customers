<template>
  <div class="alert alert-warning alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">x</span></button>
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'CustomersAlert',
    props: ["message"],
  }
</script>

<style scoped>

</style>