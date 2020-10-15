export type TodoItem = {
  id: number
  title: string
  completed: boolean
  userId: number
}

export type State = {
  loading: boolean
  allItems: TodoItem[]
  items: TodoItem[]
  filter: string
  activeTodos: boolean
}

export const state: State = {
  loading: false,
  allItems: [],
  items: [],
  filter: '',
  activeTodos: false
}
