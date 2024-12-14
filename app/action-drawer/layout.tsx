'use client'
import React from 'react'
import {
  ActionDrawer,
  ActionDrawerContent,
  ActionDrawerClose,
} from '@/components/elements/ActionDrawer'
import useActionDrawerStore from '@/store/useActionDrawerStore'

export default function ActionDrawerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { actionDrawerContent } = useActionDrawerStore()
  return (
    <main>
      {children}
      <ActionDrawer>
        <ActionDrawerContent className="h-screen w-80">
          <ActionDrawerClose
            variant="ghost"
            className="absolute right-2 top-2 rounded-2xl"
          />
          {actionDrawerContent}
        </ActionDrawerContent>
      </ActionDrawer>
    </main>
  )
}
