'use client'

import useActionDrawerStore from '@/store/useActionDrawerStore'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { toggleDrawer, setDrawerContent } = useActionDrawerStore()

  const openSecondDrawer = () => {
    toggleDrawer()
    setDrawerContent(<Component />)
  }

  return (
    <section className="m-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* Trigger via Function */}
      <Button
        onClick={openSecondDrawer}
        variant="secondary"
        className="gap-2 rounded-lg px-4 py-2 shadow-lg transition-all duration-300 active:scale-90"
      >
        Open Second Drawer
      </Button>
    </section>
  )
}

const Component = () => {
  const { closeDrawer } = useActionDrawerStore()
  return (
    <div className="min-h-svh">
      <div className="relative m-2 h-[calc(100svh_-_1rem)] w-80 space-y-4 rounded-lg border border-muted/50 bg-background p-4">
        <h2 className="text-3xl">Second Drawer</h2>
        <p className="text-sm">This is the content of the second drawer.</p>
        <Button onClick={closeDrawer}>Close</Button>
      </div>
    </div>
  )
}
