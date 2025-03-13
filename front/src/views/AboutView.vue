<script>
import Button from 'primevue/button'
import {InputText} from "primevue";

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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
