<template>
  <section class="bg-header bg-cover min-h-screen">
    <div class="xl:container">
      <Slotmachine />
    </div>
  </section>
</template>

<script>
import Slotmachine from '@/components/games/Slotmachine';
export default {
  name: 'Home',
  components: { Slotmachine },
};
</script>

<style lang="scss">
.bg-header {
  background-image: url('../assets/bg-header.jpg');
}
</style>
