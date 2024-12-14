import { create } from 'zustand'

type DrawerState = {
  isDrawerOpen: boolean
  actionDrawerContent: React.ReactNode | null // New state for dynamic content

  toggleDrawer: () => void
  setDrawerContent: (content: React.ReactNode) => void

  openDrawer: () => void
  closeDrawer: () => void
}

const useActionDrawerStore = create<DrawerState>((set) => ({
  isDrawerOpen: false,
  actionDrawerContent: null,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerContent: (content) => set({ actionDrawerContent: content }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false, actionDrawerContent: null }),
}))

export default useActionDrawerStore

// import { create } from 'zustand'

// type FilterState = {
//   isDrawerOpen: boolean // Tracks global drawer state
//   actionDrawerContent: React.ReactNode // Dynamic content for the global drawer

//   activeDrawer: 'global' | 'local' | null // Tracks the active drawer
//   localDrawerContent: React.ReactNode // Default content for local drawer

//   // Actions
//   toggleDrawer: (scope?: 'global' | 'local') => void
//   setDrawerContent: (
//     content: React.ReactNode,
//     scope?: 'global' | 'local'
//   ) => void
//   openDrawer: (scope?: 'global' | 'local') => void
//   closeDrawer: (scope?: 'global' | 'local') => void
// }

// const useActionDrawerStore = create<FilterState>((set) => ({
//   isDrawerOpen: false,
//   actionDrawerContent: null,
//   activeDrawer: null,
//   localDrawerContent: null,

//   toggleDrawer: (scope = 'global') =>
//     set((state) => ({
//       isDrawerOpen: !state.isDrawerOpen,
//       activeDrawer: !state.isDrawerOpen ? scope : null,
//     })),

//   setDrawerContent: (content, scope = 'global') =>
//     set((state) =>
//       scope === 'global'
//         ? { actionDrawerContent: content }
//         : { localDrawerContent: content }
//     ),

//   openDrawer: (scope = 'global') =>
//     set({
//       isDrawerOpen: true,
//       activeDrawer: scope,
//     }),

//   closeDrawer: (scope = 'global') =>
//     set((state) => ({
//       isDrawerOpen: false,
//       activeDrawer: state.activeDrawer === scope ? null : state.activeDrawer,
//       ...(scope === 'global' ? { actionDrawerContent: null } : {}),
//       ...(scope === 'local' ? { localDrawerContent: null } : {}),
//     })),
// }))

// export default useActionDrawerStore
