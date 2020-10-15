import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, TodoItem } from './state'

export enum ActionTypes {
  GetTodoItems = 'GET_ITEMS'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.GetTodoItems](context: ActionAugments): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoItems]({ commit }) {
    commit(MutationType.SetLoading, true)

    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data: Array<TodoItem> = await response.json()
    console.log(data)
    commit(MutationType.SetLoading, false)
    commit(MutationType.SetItems, data)
  }
}
