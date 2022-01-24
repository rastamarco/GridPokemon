<template>
  <v-row justify="center">
    <!-- MODAL genérico, que pode ser instanciado como preferir, contém um botão de cancelar, 
    podendo ser adicionado mais props para inserir mais botoes entre outros -->
    <v-dialog v-model="show" no-click-animation persistent width="60%">
      <div class="modal-container">
        <!-- header fixo que emit para o pai o fechamento do modal -->
        <div class="header">
            <span> {{ title }} </span>
            <v-icon class="close" @click="$emit('close')">mdi-window-close</v-icon>
        </div>
        <!-- slot para manipular o contéudo do modal -->
        <div class="content">
          <div class="main">
            <slot name="main" />
          </div>
        </div>

        <!-- Footer que contém botão de cancelar, podendo ser adicionado mais botões sendo estes controlados por props também -->
        <div class="footer">
          <v-btn id="btnCancel" color="error darken-1" text @click="$emit('close')" >
            Fechar
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </v-row>  
</template>
<script> 
export default {
  props: {
    show: {
      default: true,
      type: Boolean
    },

    title: {
      default: '',
      type: String
    }
  }
}
</script>
<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: bold;
  min-height: 3em;
  max-height: 3em;
  padding-left: 2%; 
}

.content {
  padding: 1em 2em;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
}

.footer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 3em;
  max-height: 3em;
  border-top: 1px solid #ccc;
}

.v-dialog {
  overflow: hidden;
}

.close {
  cursor: pointer;
  padding: 0 .5em;
}

</style>   
    