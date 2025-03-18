<script>
import Button from 'primevue/button'
import InputText from "primevue/inputtext";

export default {
  components: {
    Button,
    InputText
  }
}
</script>
<template>
  <div class="about">
    <div class="card flex justify-center">
      <Button label="Verify" />
      <InputText placeholder="Enter your email" />
    </div>
  </div>
</template>

<style>
</style>
