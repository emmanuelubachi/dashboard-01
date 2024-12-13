'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ModeButton } from '../theme-toggle'

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
      className="fixed bottom-8 left-0 right-0 md:bottom-16"
    >
      <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-6 rounded-2xl bg-muted/50 p-4 drop-shadow-lg">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Home →
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/action-drawer"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Action Drawer
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <ModeButton classname="p-1.5 bg-transparent hover:bg-transparent dark:hover:bg-transparent" />
      </div>
    </motion.footer>
  )
}
