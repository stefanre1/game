<template>
  <img :src="`icons/${tile}.svg`" :alt="tile" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    tile: String
  }
}
</script>

<style scoped></style>
