import { GetterTree } from 'vuex'
import { State, TodoItem } from './state'

export type Getters = {
  filterTodoItems(state: State): Array<TodoItem>
}

export const getters: GetterTree<State, State> & Getters = {
  filterTodoItems(state) {
    return state.items.filter(i => i.title.includes(state.filter))
  }
}
