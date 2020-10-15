<template>
  <div>
    <input type="text" @keypress.enter="setSearch" />

    <div>
      Toggle Done or Not Done
      <input @input="activeTodos" type="checkbox" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'

export default defineComponent({
  setup() {
    const store = useStore()

    const setSearch = (e: Event) => {
      const element = e.target as HTMLInputElement
      store.commit(MutationType.SetFilter, element.value)
    }

    const activeTodos = (e: Event) => {
      const element = e.target as HTMLInputElement
      store.commit(MutationType.ActiveTodos, element.checked)
    }

    return { setSearch, activeTodos }
  }
})
</script>
