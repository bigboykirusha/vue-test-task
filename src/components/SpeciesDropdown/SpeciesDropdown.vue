<template>
   <div class="relative flex-1 w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 max-w-xs" style="height: 42px;">
      <select v-model="selectedSpecies" class="p-2 rounded border-gray-300 w-full h-full">
         <option value="">Any Status</option>
         <option value="alive">Alive</option>
         <option value="dead">Dead</option>
         <option value="unknown">Unknown</option>
      </select>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
   props: {
      modelValue: {
         type: String,
         required: true
      }
   },
   setup(props, { emit }) {
      const selectedSpecies = ref(props.modelValue);

      watch(selectedSpecies, (newValue) => {
         emit('update:modelValue', newValue);
      });

      return {
         selectedSpecies
      };
   }
});
</script>