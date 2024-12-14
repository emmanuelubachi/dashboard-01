'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, ButtonProps } from '@/components/ui/button'
import useActionDrawerStore from '@/store/useActionDrawerStore'

import { cn } from '@/lib/utils'

const sharedButtonStyles =
  'gap-2 rounded-lg shadow-lg transition-all duration-300 active:scale-95'

// ---- Components ----

// Root Drawer
const ActionDrawer = ({
  className,
  overlay = true,
  from = 'left',
}: {
  className?: string
  overlay?: boolean
  from?: 'left' | 'right' | 'bottom' | 'top'
}) => {
  const { isDrawerOpen, closeDrawer, actionDrawerContent } =
    useActionDrawerStore()
  const drawerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    closeDrawer()
  }, [pathname, closeDrawer])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer()
      }
    }

    if (isDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, closeDrawer])

  const directionVariants = {
    bottom: { y: '100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
    left: { x: '-100%', opacity: 0 },
    right: { x: '100%', opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div role="dialog" aria-modal="true">
          {overlay && <ActionDrawerOverlay />}
          <motion.div
            ref={drawerRef}
            className={cn('fixed inset-0 z-50 w-fit', className)}
            initial={directionVariants[from]}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={directionVariants[from]}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {actionDrawerContent}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Trigger Button
const ActionDrawerTrigger = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  content = null,
}: {
  children: React.ReactNode
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  content?: React.ReactNode
}) => {
  const { toggleDrawer, setDrawerContent } = useActionDrawerStore()

  const handleClick = useCallback(() => {
    if (!content) {
      toggleDrawer()
    }
    setDrawerContent(content)
    toggleDrawer()
  }, [content, setDrawerContent, toggleDrawer])

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn('focus:outline-none', className)}
    >
      {children}
    </Button>
  )
}

// Overlay
const ActionDrawerOverlay = () => {
  const { closeDrawer } = useActionDrawerStore()

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
      onClick={closeDrawer}
    />
  )
}

// Content
const ActionDrawerContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { isDrawerOpen } = useActionDrawerStore()

  // Focus trap
  useEffect(() => {
    if (isDrawerOpen && contentRef.current) {
      const currentRef = contentRef.current // Store the current ref value
      const focusableElements = currentRef.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      firstElement.focus()
      currentRef.addEventListener('keydown', handleTabKey)

      return () => {
        currentRef.removeEventListener('keydown', handleTabKey)
      }
    }
  }, [isDrawerOpen])

  return (
    <div
      ref={contentRef}
      className={cn(
        'overflow-y-auto bg-background p-4 shadow-lg focus:outline-none',
        className
      )}
      tabIndex={-1}
    >
      {children}
    </div>
  )
}

// Header
const ActionDrawerHeader = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn('py-4 text-lg font-semibold', className)}>{children}</div>
)

// Footer
const ActionDrawerFooter = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('mt-auto p-4', className)}>{children}</div>

// Close Button
const ActionDrawerClose = ({
  className,
  variant = 'outline',
  size = 'icon',
}: {
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}) => {
  const { closeDrawer } = useActionDrawerStore()

  return (
    <Button
      onClick={closeDrawer}
      variant={variant}
      size={size}
      className={cn('focus:outline-none', sharedButtonStyles, className)}
    >
      <Cross2Icon className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
}

// ---- Export All Components ----
export {
  ActionDrawer,
  ActionDrawerTrigger,
  ActionDrawerOverlay,
  ActionDrawerContent,
  ActionDrawerHeader,
  ActionDrawerFooter,
  ActionDrawerClose,
}

// 'use client'

// import React, { useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Cross2Icon } from '@radix-ui/react-icons'
// import { Button, ButtonProps } from '@/components/ui/button'
// import useActionDrawerStore from '@/store/useActionDrawerStore'
// import { cn } from '@/lib/utils'

// const sharedButtonStyles =
//   'gap-2 rounded-lg shadow-lg transition-all duration-300 active:scale-95'

// // ---- Components ----

// // Root Drawer
// const ActionDrawer = ({
//   children,
//   from = 'left',
// }: {
//   children: React.ReactNode
//   from?: 'left' | 'right' | 'bottom' | 'top'
// }) => {
//   const { isDrawerOpen, closeDrawer } = useActionDrawerStore()
//   const drawerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         closeDrawer()
//       }
//     }

//     if (isDrawerOpen) {
//       document.addEventListener('keydown', handleKeyDown)
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown)
//     }
//   }, [isDrawerOpen, closeDrawer])

//   const directionVariants = {
//     bottom: { y: '100%', opacity: 0 },
//     top: { y: '-100%', opacity: 0 },
//     left: { x: '-100%', opacity: 0 },
//     right: { x: '100%', opacity: 0 },
//   }

//   return (
//     <AnimatePresence>
//       {isDrawerOpen && (
//         <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
//           <ActionDrawerOverlay />
//           <motion.div
//             ref={drawerRef}
//             className="fixed inset-0 z-50 w-fit"
//             initial={directionVariants[from]}
//             animate={{ x: 0, y: 0, opacity: 1 }}
//             exit={directionVariants[from]}
//             transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//           >
//             {children}
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   )
// }

// // Trigger Button
// const ActionDrawerTrigger = ({
//   children,
//   className,
//   variant = 'default',
//   size = 'default',
//   content = null,
// }: {
//   children: React.ReactNode
//   className?: string
//   variant?: ButtonProps['variant']
//   size?: ButtonProps['size']
//   content?: React.ReactNode
// }) => {
//   const { toggleDrawer, setDrawerContent } = useActionDrawerStore()

//   if (!content) {
//     return (
//       <Button
//         onClick={toggleDrawer}
//         variant={variant}
//         size={size}
//         className={cn('focus:outline-none', className)}
//       >
//         {children}
//       </Button>
//     )
//   }

//   const handleClick = () => {
//     setDrawerContent(content)
//     toggleDrawer()
//   }

//   return (
//     <Button
//       onClick={handleClick}
//       variant={variant}
//       size={size}
//       className={cn('focus:outline-none', className)}
//     >
//       {children}
//     </Button>
//   )
// }

// // Overlay
// const ActionDrawerOverlay = () => {
//   const { closeDrawer } = useActionDrawerStore()

//   return (
//     <motion.div
//       className="fixed inset-0 z-40 bg-black/50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       aria-hidden="true"
//       onClick={closeDrawer}
//     />
//   )
// }

// // Content
// const ActionDrawerContent = ({
//   children,
//   className = '',
// }: {
//   children: React.ReactNode
//   className?: string
// }) => {
//   const contentRef = useRef<HTMLDivElement>(null)
//   const { isDrawerOpen } = useActionDrawerStore()

//   useEffect(() => {
//     if (isDrawerOpen && contentRef.current) {
//       const focusableElements = contentRef.current.querySelectorAll(
//         'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//       )
//       const firstElement = focusableElements[0] as HTMLElement
//       const lastElement = focusableElements[
//         focusableElements.length - 1
//       ] as HTMLElement

//       const handleTabKey = (e: KeyboardEvent) => {
//         if (e.key === 'Tab') {
//           if (e.shiftKey) {
//             if (document.activeElement === firstElement) {
//               e.preventDefault()
//               lastElement.focus()
//             }
//           } else {
//             if (document.activeElement === lastElement) {
//               e.preventDefault()
//               firstElement.focus()
//             }
//           }
//         }
//       }

//       firstElement.focus()
//       contentRef.current.addEventListener('keydown', handleTabKey)

//       return () => {
//         contentRef.current?.removeEventListener('keydown', handleTabKey)
//       }
//     }
//   }, [isDrawerOpen])
//   return (
//     <div
//       ref={contentRef}
//       className={cn(
//         'overflow-y-auto bg-background p-4 shadow-lg focus:outline-none',
//         className
//       )}
//       tabIndex={-1} // To enable focus trapping later
//     >
//       {children}
//     </div>
//   )
// }

// // Header
// const ActionDrawerHeader = ({
//   children,
//   className = '',
// }: {
//   children: React.ReactNode
//   className?: string
// }) => (
//   <div className={cn('py-4 text-lg font-semibold', className)}>{children}</div>
// )

// // Footer
// const ActionDrawerFooter = ({
//   children,
//   className = '',
// }: {
//   children: React.ReactNode
//   className?: string
// }) => <div className={cn('mt-auto p-4', className)}>{children}</div>

// // Close Button
// const ActionDrawerClose = ({
//   className,
//   variant = 'outline',
//   size = 'icon',
// }: {
//   className?: string
//   variant?: ButtonProps['variant']
//   size?: ButtonProps['size']
// }) => {
//   const { closeDrawer } = useActionDrawerStore()

//   return (
//     <Button
//       onClick={closeDrawer}
//       variant={variant}
//       size={size}
//       className={cn('focus:outline-none', sharedButtonStyles, className)}
//     >
//       <Cross2Icon className="h-4 w-4" />
//       <span className="sr-only">Close</span>
//     </Button>
//   )
// }

// // ---- Export All Components ----
// export {
//   ActionDrawer,
//   ActionDrawerTrigger,
//   ActionDrawerOverlay,
//   ActionDrawerContent,
//   ActionDrawerHeader,
//   ActionDrawerFooter,
//   ActionDrawerClose,
// }
