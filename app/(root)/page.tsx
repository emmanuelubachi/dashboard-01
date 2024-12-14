import {
  ActionDrawerClose,
  ActionDrawerContent,
  ActionDrawerHeader,
  ActionDrawerTrigger,
} from '@/components/elements/action-drawer'

export default function Home() {
  return (
    <main className="m-auto flex min-h-screen w-full items-center justify-center">
      <div className="flex gap-4">
        {/* Trigger via Button */}

        <ActionDrawerTrigger
          className="rounded px-4 py-2"
          content={<FirstDrawerContent />}
        >
          Open First Drawer
        </ActionDrawerTrigger>
      </div>
    </main>
  )
}

const FirstDrawerContent = () => {
  return (
    <ActionDrawerContent className="h-screen w-80">
      <ActionDrawerClose
        variant="ghost"
        className="absolute right-2 top-2 rounded-2xl"
      />
      <ActionDrawerHeader>First Drawer</ActionDrawerHeader>
      <p className="text-sm">This is the content of the first drawer.</p>
    </ActionDrawerContent>
  )
}
