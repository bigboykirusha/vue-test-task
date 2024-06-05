<template>
  <div id="app">
    <CharacterList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CharacterList from './components/CharacterList/CharacterList.vue';

export default defineComponent({
  components: {
    CharacterList
  }
});
</script>
