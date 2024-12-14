'use client'
import { motion } from 'framer-motion'
import { ModeButton } from '../theme-toggle'
import { Home, Sidebar } from 'lucide-react'
import Link from 'next/link'

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
        {links.map((link) => (
          <Link
            key={link.href}
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href={link.href}
            rel="noopener noreferrer"
          >
            {link.icon}
            {link.title}
          </Link>
        ))}

        <ModeButton classname="p-1.5 bg-transparent hover:bg-transparent dark:hover:bg-transparent" />
      </div>
    </motion.footer>
  )
}

const links = [
  {
    title: 'Home →',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: 'Action Drawer',
    href: '/action-drawer',
    icon: <Sidebar className="h-4 w-4" />,
  },
]
