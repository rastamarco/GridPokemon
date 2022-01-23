<template>
  <div>
      <v-col cols="12" sm="12" md="12" class="content">
        <slot name="main"></slot>
      </v-col>
      <v-footer padless>
          <slot name="page-footer"></slot> 
      </v-footer>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 78vh;
  overflow: auto;
}

</style>
