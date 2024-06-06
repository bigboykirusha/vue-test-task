<template>
   <div
      class="character-card bg-gray-800 rounded-lg p-4 shadow-lg text-white transform transition-transform hover:scale-105 duration-300 ease-in-out">
      <div class="flex justify-center mb-4">
         <img :src="character.image" :alt="character.name"
            class="w-32 h-32 rounded-full border-4 border-gray-700 shadow-lg" />
      </div>
      <h3 class="text-xl font-bold text-center mb-2">{{ character.name }}</h3>
      <p class="text-center mb-2 flex items-center justify-center">
         <span :class="getStatusClass(character.status) + ' rounded-full h-3 w-3 inline-block mr-3'"></span>
         <b class="pr-1">Status:</b> {{ character.status }}
      </p>
      <p class="text-center mb-2"><b>Species:</b> {{ character.species }}</p>
      <p class="text-center mb-2"><b>Gender:</b> {{ character.gender }}</p>
      <p class="text-center mb-2"><b>Last known location:</b><br /> {{ character.location.name }}</p>
      <p class="text-center"><b>First seen in:</b><br /> {{ character.origin.name }}</p>
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
.character-card {
   background-color: #1f2937;
   border-radius: 0.5rem;
   padding: 1rem;
   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
   color: white;
   transition: transform 0.3s ease-in-out;
}

.character-card:hover {
   transform: scale(1.02);
}

.character-card img {
   width: 8rem;
   height: 8rem;
   border-radius: 9999px;
   border-width: 4px;
   border-color: #374151;
   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}

.character-card h3 {
   font-size: 1.25rem;
   font-weight: 700;
   margin-bottom: 0.5rem;
   text-align: center;
}

.character-card p {
   margin-bottom: 0.5rem;
   text-align: center;
}

.character-card p span {
   border-radius: 9999px;
   height: 0.75rem;
   width: 0.75rem;
   display: inline-block;
   margin-right: 0.75rem;
}

.bg-green-500 {
   background-color: #10B981;
}

.bg-red-500 {
   background-color: #EF4444;
}

.bg-yellow-500 {
   background-color: #F59E0B;
}
</style>
