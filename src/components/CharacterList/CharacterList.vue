<template>
   <div class="w-full min-h-screen flex flex-col justify-between">
      <div class="filters w-full p-4 bg-gray-900 flex flex-wrap justify-center items-center gap-2">
         <SearchInput v-model="name" placeholder="Search by name" />
         <SpeciesDropdown v-model="status" />
         <button @click="applyFilters"
            class="p-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 w-full sm:w-auto h-full"
            style="height: 40px;">
            Apply
         </button>
      </div>
      <div class="character-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 pb-[88px]">
         <transition-group name="fade">
            <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
         </transition-group>
      </div>
      <div class="fixed bottom-0 left-0 right-0 flex justify-center p-4 bg-transparent">
         <div
            class="pagination-buttons flex items-center justify-center w-full max-w-md bg-white bg-opacity-20 backdrop-blur-sm rounded-full py-2 px-4">
            <button @click="prevPage" :disabled="!info.prev" class="pagination-button mr-2"
               :class="{ 'cursor-not-allowed opacity-50': !info.prev }">
               <i class="fas fa-chevron-left text-2xl">&lt</i>
            </button>
            <span class="page-number mx-2">{{ page }}</span>
            <button @click="nextPage" :disabled="!info.next" class="pagination-button ml-2"
               :class="{ 'cursor-not-allowed opacity-50': !info.next }">
               <i class="fas fa-chevron-right text-2xl">&gt</i>
            </button>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getCharacters } from '../../api/api';
import CharacterCard from '../CharacterCard/CharacterCard.vue';
import SearchInput from '../SearchInput/SearchInput.vue';
import SpeciesDropdown from '../SpeciesDropdown/SpeciesDropdown.vue';
import { Character, Info } from '../../types/types';

export default defineComponent({
   components: { CharacterCard, SearchInput, SpeciesDropdown },
   setup() {
      const characters = ref<Character[]>([]);
      const info = ref<Info>({ count: 0, pages: 0, next: null, prev: null });
      const name = ref<string>('');
      const status = ref<string>('');
      const page = ref<number>(1);

      const fetchCharacters = async () => {
         try {
            const response = await getCharacters(page.value, name.value, status.value);
            characters.value = response.data.results;
            info.value = response.data.info;
         } catch (error) {
            console.error('Error fetching characters:', error);
            alert('Failed to fetch characters. Please try again later.');
         }
      };

      const applyFilters = () => {
         page.value = 1;
         fetchCharacters();
      };

      const prevPage = () => {
         if (info.value.prev) {
            page.value--;
            fetchCharacters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
         }
      };

      const nextPage = () => {
         if (info.value.next) {
            page.value++;
            fetchCharacters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
         }
      };

      onMounted(fetchCharacters);

      return {
         characters,
         info,
         name,
         status,
         page,
         applyFilters,
         prevPage,
         nextPage,
      };
   }
});
</script>

<style scoped>
.pagination-buttons {
   @apply max-w-md w-auto flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2;
}

.pagination-button {
   @apply bg-transparent border-none text-white flex items-center justify-center transition duration-300 ease-in-out;
}

.pagination-button i {
   @apply text-white bg-white bg-opacity-30 w-10 h-10 rounded-full pt-1;
}

.pagination-button:disabled {
   @apply cursor-not-allowed opacity-50;
}

.page-number {
   @apply text-white text-lg font-semibold;
}
</style>