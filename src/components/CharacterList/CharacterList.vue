<template>
   <div class="w-full min-h-screen flex flex-col justify-between">
      <div class="filters w-full p-4 bg-gray-900 flex flex-wrap justify-center items-center gap-2">
         <!-- Кнопка "Поиск" -->
         <div class="relative flex-1 w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 max-w-xs" style="height: 42px;">
            <input v-model="name" class="p-2 rounded border-gray-300 w-full h-full" placeholder="Search by name" />
         </div>
         <!-- Выпадающий список "Species" -->
         <div class="relative flex-1 w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 max-w-xs" style="height: 42px;">
            <select v-model="status" class="p-2 rounded border-gray-300 w-full h-full">
               <option value="">Any Status</option>
               <option value="alive">Alive</option>
               <option value="dead">Dead</option>
               <option value="unknown">Unknown</option>
            </select>
         </div>
         <!-- Кнопка "Применить" -->
         <button @click="applyFilters"
            class="p-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 w-full sm:w-auto h-full"
            style="height: 40px;">Apply</button>
      </div>
      <div class="character-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
         <transition-group name="fade">
            <CharacterCard v-for="(character, index) in characters" :key="index"
               :character="character" />
         </transition-group>
      </div>
      <div class="pagination fixed bottom-0 left-0 w-full p-4 bg-gray-900 flex justify-center items-center">
         <button @click="prevPage" :disabled="!info.prev"
            class="p-2 bg-gray-300 rounded-full mr-2 w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer"
            :class="{ 'cursor-not-allowed opacity-50': !info.prev }">
            <i class="fas fa-chevron-left text-black text-2xl">&lt</i>
         </button>
         <span class="text-white mx-2">{{ page }}</span>
         <button @click="nextPage" :disabled="!info.next"
            class="p-2 bg-gray-300 rounded-full ml-2 w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer"
            :class="{ 'cursor-not-allowed opacity-50': !info.next }">
            <i class="fas fa-chevron-right text-black text-2xl">&gt</i>
         </button>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getCharacters } from '../../api/api';
import CharacterCard from '../CharacterCard/CharacterCard.vue';
import { Character, Info } from '../../types/types';

export default defineComponent({
   components: { CharacterCard },
   setup() {
      const characters = ref<Character[]>([]);
      const info = ref<Info>({ count: 0, pages: 0, next: null, prev: null });
      const name = ref<string>('');
      const status = ref<string>('');
      const page = ref<number>(1);

      const fetchData = async () => {
         const response = await getCharacters(page.value, name.value, status.value);
         characters.value = response.data.results;
         info.value = response.data.info;
      };

      const applyFilters = () => {
         page.value = 1;
         fetchData();
      };

      const prevPage = () => {
         if (info.value.prev) {
            page.value--;
            fetchData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
         }
      };

      const nextPage = () => {
         if (info.value.next) {
            page.value++;
            fetchData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
         }
      };

      onMounted(fetchData);

      return {
         characters,
         info,
         name,
         status,
         page,
         applyFilters,
         prevPage,
         nextPage
      };
   }
});
</script>

<style scoped>
.character-list {
   padding-bottom: 88px;
}
</style>
