import { create } from 'zustand'
//create store
export const useCounterStore = create((set) => ({
  newCounter: 0,
  newCounter1: 10,
  user: {
    name: 'Ravi',
    email: 'ravi@mail.com',
    age: 21
  },
  incrementCounter: () =>
    set((state) => ({ newCounter: state.newCounter + 1 })),
  decrementCounter: () =>
    set((state) => ({ newCounter: state.newCounter - 1 })),
  reset: () => set({ newCounter: 0 }),
  incrementCounter1: () =>
    set((state) => ({ newCounter1: state.newCounter1 + 1 })),
  decrementCounter1: () =>
    set((state) => ({ newCounter1: state.newCounter1 - 1 })),
  reset1: () => set({ newCounter1: 0 }),
  changeCounter: () => set({ newCounter: 500 }),
  decrementCounter20: () =>
    set((state) => ({ newCounter1: state.newCounter1 - 20 })),
  changeEmail: () => set({ ...user, email: 'ravikumar@mail.com' }),
  changeName: () => set({ ...user, name: 'ravikumar@mail.com' }),
  changeAge: () => set({ ...user, age: 'ravikumar@mail.com' })
}))
