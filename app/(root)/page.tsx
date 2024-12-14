'use client'
import { motion as m } from 'framer-motion'
import {
  ActionDrawerClose,
  ActionDrawerContent,
  ActionDrawerHeader,
  ActionDrawerTrigger,
} from '@/components/elements/action-drawer'

export default function Home() {
  return (
    <main className="m-auto flex min-h-screen w-full items-center justify-center">
      {/* Trigger via Button */}
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ActionDrawerTrigger
          className="rounded px-4 py-2"
          content={<FirstDrawerContent />}
        >
          Open First Drawer
        </ActionDrawerTrigger>
      </m.div>
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
