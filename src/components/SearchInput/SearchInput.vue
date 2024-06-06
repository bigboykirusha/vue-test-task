<template>
   <div class="relative flex-1 w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 max-w-xs" style="height: 42px;">
      <input v-model="searchTerm" @input="emitSearch" class="p-2 rounded border-gray-300 w-full h-full"
         :placeholder="placeholder" />
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
   props: {
      modelValue: {
         type: String,
         required: true
      },
      placeholder: {
         type: String,
         default: 'Search'
      }
   },
   setup(props, { emit }) {
      const searchTerm = ref(props.modelValue);

      watch(searchTerm, (newValue) => {
         emit('update:modelValue', newValue);
      });

      const emitSearch = () => {
         emit('update:modelValue', searchTerm.value);
      };

      return {
         searchTerm,
         emitSearch
      };
   }
});
</script>