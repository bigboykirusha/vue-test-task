<template>
   <div class="character-card bg-gray-800 rounded-lg p-4 shadow-lg text-white">
      <img :src="character.image" :alt="character.name" class="w-32 h-32 rounded-full mx-auto mb-4" />
      <h3 class="text-xl font-bold text-center mb-2">{{ character.name }}</h3>
      <p class="text-center mb-2">
         <span :class="getStatusClass(character.status) + ' rounded-full h-3 w-3 inline-block mr-3 my-auto'"></span>
         <b>Status:</b>
         {{ character.status }}
      </p>
      <p class="text-center mb-2"><b>Species:</b> {{ character.species }}</p>
      <p class="text-center mb-2"><b>Gender:</b> {{ character.gender }}</p>
      <p class="text-center mb-2"><b>Last known location:</b> {{ character.location.name }}</p>
      <p class="text-center"><b>First seen in:</b> {{ character.origin.name }}</p>
   </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Character } from '../../types/types';

export default defineComponent({
   props: {
      character: {
         type: Object as PropType<Character>,
         required: true
      }
   },
   methods: {
      getStatusClass(status: string): string {
         return {
            Alive: 'bg-green-500',
            Dead: 'bg-red-500',
         }[status] || 'bg-yellow-500';
      }
   }
});
</script>

<style scoped>
.text-green-500 {
   color: #10B981;
}

.text-red-500 {
   color: #EF4444;
}
</style>