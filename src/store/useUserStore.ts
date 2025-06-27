import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
  isLogin: boolean
  userName: string
  userId:number
  email: string
  token: string
  photo: string
}

interface Actions {
  setUser: (data: Partial<State>) => void
  setToken: (token: string) => void
}

const initialState: State = {
  isLogin: false,
  userName: '',
  email: '',
  token: '',
  photo: '',
  userId:0
}

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (data) =>
        set((state) => ({
          ...state,
          ...data,
          isLogin: !!data.token || data.isLogin || false,
        })),
      setToken: (token) =>
        set({
          token,
          isLogin: !!token,
        }),
    }),
    {
      name: 'auth-storage-gymapp-fitwinner',
      storage: createJSONStorage(() => localStorage),
    }
  )
)