<template>
  <div>
    <!-- Componente genérico para container, basta instanciá-lo com os paramêtros do slot correto em qualquer arquivo -->
      <v-col cols="12" sm="12" md="12" class="content">
        <!-- Slot principal -->
        <slot name="main"></slot>
      </v-col>
      <v-footer padless>
          <!-- Footer  -->
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
