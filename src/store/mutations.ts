import { MutationTree } from 'vuex'
import { State, TodoItem } from './state'

export enum MutationType {
  CreateItem = 'CREATE_ITEM',
  SetItems = 'SET_ITEMS',
  CompleteItem = 'COMPLETE_ITEM',
  SetLoading = 'SET_LOADING',
  SetFilter = 'SET_FILTER',
  ActiveTodos = 'SET_ACTIVE_TODOS'
}

export type Mutations = {
  [MutationType.CreateItem](state: State, item: TodoItem): void
  [MutationType.SetItems](state: State, items: TodoItem[]): void
  [MutationType.CompleteItem](
    state: State,
    item: Partial<TodoItem> & { id: number }
  ): void
  [MutationType.SetLoading](state: State, value: boolean): void
  [MutationType.SetFilter](state: State, value: string): void
  [MutationType.ActiveTodos](state: State, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
  async [MutationType.CreateItem](state, item) {
    state.loading = true
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const createdItem: TodoItem = await response.json()
    state.loading = false
    state.items.unshift(createdItem)
  },
  [MutationType.SetItems](state, items) {
    state.items = items
    state.allItems = items
  },
  [MutationType.CompleteItem](state, newItem) {
    const item = state.items.findIndex(s => s.id === newItem.id)
    if (item === -1) return
    state.items[item] = { ...state.items[item], ...newItem }
  },
  [MutationType.SetLoading](state, value) {
    state.loading = value
  },
  [MutationType.SetFilter](state, value) {
    state.filter = value
  },
  [MutationType.ActiveTodos](state, value) {
    state.activeTodos = value
    state.items = state.allItems
    if (value) {
      const x = state.allItems.filter(i => i.completed == true)
      state.items = x
    }
  }
}
