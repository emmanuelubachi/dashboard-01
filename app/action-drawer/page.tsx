'use client'
import { ActionDrawerHeader } from '@/components/elements/action-drawer'
import useActionDrawerStore from '@/store/useActionDrawerStore'
import { Button } from '@/components/ui/button'
import { useCallback } from 'react'

export default function Page() {
  const { toggleDrawer, setDrawerContent } = useActionDrawerStore()

  const openSecondDrawer = useCallback(() => {
    toggleDrawer()
    setDrawerContent(
      <>
        <ActionDrawerHeader>Second Drawer</ActionDrawerHeader>
        <p className="text-sm">This is the content of the second drawer.</p>
      </>
    )
  }, [toggleDrawer, setDrawerContent])

  return (
    <section className="m-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* Trigger via Function */}
      <Button
        onClick={openSecondDrawer}
        variant="secondary"
        className="rounded px-4 py-2"
      >
        Open Second Drawer
      </Button>
    </section>
  )
}
