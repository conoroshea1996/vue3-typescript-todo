<template>
  <div>
    <TodoItem v-for="item in filterItems" :key="item" v-bind="item" />
    <Search />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import TodoItem from './TodoItem.vue'
import Search from './Search.vue'
export default defineComponent({
  components: { TodoItem, Search },
  setup() {
    const store = useStore()
    const filterItems = computed(() => store.getters.filterTodoItems)
    return { filterItems }
  }
})
</script>
