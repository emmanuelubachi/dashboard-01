'use client'
import {
  ActionDrawer,
  ActionDrawerContent,
  ActionDrawerHeader,
  ActionDrawerClose,
} from '@/components/elements/ActionDrawer'
import useActionDrawerStore from '@/store/useActionDrawerStore'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { openDrawer, setDrawerContent } = useActionDrawerStore()

  const openFirstDrawer = () => {
    setDrawerContent(
      <>
        <ActionDrawerHeader>First Drawer</ActionDrawerHeader>
        <p className="text-sm">This is the content of the first drawer.</p>
      </>
    )
    openDrawer()
  }

  const openSecondDrawer = () => {
    setDrawerContent(
      <>
        <ActionDrawerHeader>Second Drawer</ActionDrawerHeader>
        <p className="text-sm">This is the content of the second drawer.</p>
      </>
    )
    openDrawer()
  }
  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* Trigger via Function */}
      <Button
        onClick={openFirstDrawer}
        variant="secondary"
        className="rounded px-4 py-2"
      >
        Open First Drawer
      </Button>

      <Button
        onClick={openSecondDrawer}
        variant="outline"
        className="rounded px-4 py-2"
      >
        Open Second Drawer
      </Button>

      <ActionDrawer>
        <ActionDrawerContent className="h-screen w-80">
          <ActionDrawerClose
            variant="ghost"
            className="absolute right-2 top-2 rounded-2xl"
          />
          {useActionDrawerStore.getState().actionDrawerContent}
        </ActionDrawerContent>
      </ActionDrawer>
    </main>
  )
}
