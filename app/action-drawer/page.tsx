'use client'
import {
  ActionDrawerHeader,
  ActionDrawerTrigger,
} from '@/components/elements/ActionDrawer'
import useActionDrawerStore from '@/store/useActionDrawerStore'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { openDrawer, setDrawerContent } = useActionDrawerStore()

  const openSecondDrawer = () => {
    openDrawer()
    setDrawerContent(
      <>
        <ActionDrawerHeader>Second Drawer</ActionDrawerHeader>
        <p className="text-sm">This is the content of the second drawer.</p>
      </>
    )
  }

  return (
    <section className="m-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* Trigger via Button */}
      <ActionDrawerTrigger
        className="rounded px-4 py-2"
        content={<FirstDrawerContent />}
      >
        Open First Drawer
      </ActionDrawerTrigger>

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

const FirstDrawerContent = () => {
  return (
    <>
      <ActionDrawerHeader>First Drawer</ActionDrawerHeader>
      <p className="text-sm">This is the content of the first drawer.</p>
    </>
  )
}
