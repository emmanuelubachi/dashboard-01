'use client'

import React from 'react'
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
  children,
  from = 'left',
}: {
  children: React.ReactNode
  from?: 'left' | 'right' | 'bottom' | 'top'
}) => {
  const { isDrawerOpen } = useActionDrawerStore()

  const directionVariants = {
    bottom: { y: '100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
    left: { x: '-100%', opacity: 0 },
    right: { x: '100%', opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
          <ActionDrawerOverlay />
          <motion.div
            className="fixed inset-0 z-50 w-fit"
            initial={directionVariants[from]}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={directionVariants[from]}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {children}
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
}: {
  children: React.ReactNode
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}) => {
  const { toggleDrawer } = useActionDrawerStore()

  return (
    <Button
      onClick={toggleDrawer}
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
  return (
    <div
      className={cn(
        'overflow-y-auto bg-background p-4 shadow-lg focus:outline-none',
        className
      )}
      tabIndex={-1} // To enable focus trapping later
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

// "use client";

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import useActionDrawerStore from "@/store/useActionDrawerStore";
// import useDeviceType from "@/hooks/useDeviceType";
// import { cn } from "@/lib/utils";

// // ---- Components ----

// // Root Drawer
// const ActionDrawer = ({
//   children,
//   from = "left",
// }: {
//   children: React.ReactNode;
//   from?: "left" | "right" | "bottom" | "top";
// }) => {
//   const { isDrawerOpen, closeDrawer } = useActionDrawerStore();

//   const directionVariants = {
//     bottom: { y: "100%", opacity: 0 },
//     top: { y: "-100%", opacity: 0 },
//     left: { x: "-100%", opacity: 0 },
//     right: { x: "100%", opacity: 0 },
//   };

//   return (
//     <AnimatePresence>
//       {isDrawerOpen && (
//         <>
//           <ActionDrawerOverlay />
//           <motion.div
//             className="fixed w-fit inset-0 z-50"
//             initial={directionVariants[from]}
//             animate={{ x: 0, y: 0, opacity: 1 }}
//             exit={directionVariants[from]}
//             transition={{ type: "spring", damping: 20, stiffness: 300 }}
//           >
//             {children}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Trigger Button
// const ActionDrawerTrigger = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   const { toggleDrawer } = useActionDrawerStore();

//   return (
//     <button
//       onClick={toggleDrawer}
//       className={cn("focus:outline-none", className)}
//     >
//       {children}
//     </button>
//   );
// };

// // Overlay
// const ActionDrawerOverlay = () => {
//   const { closeDrawer } = useActionDrawerStore();

//   return (
//     <motion.div
//       className="fixed inset-0 bg-black/50 z-40"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       onClick={closeDrawer}
//     />
//   );
// };

// // Content
// const ActionDrawerContent = ({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={`bg-background shadow-lg p-4 overflow-y-auto ${className}`}>
//       {children}
//     </div>
//   );
// };

// // Header
// const ActionDrawerHeader = ({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <div className={`p-4 font-semibold text-lg ${className}`}>{children}</div>
// );

// // Footer
// const ActionDrawerFooter = ({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => <div className={`p-4 mt-auto ${className}`}>{children}</div>;

// // Close Button
// const ActionDrawerClose = () => {
//   const { closeDrawer } = useActionDrawerStore();

//   return (
//     <button
//       onClick={closeDrawer}
//       className="focus:outline-none p-2 rounded-full hover:bg-gray-200"
//     >
//       Close
//     </button>
//   );
// };

// // ---- Export All Components ----
// export {
//   ActionDrawer,
//   ActionDrawerTrigger,
//   ActionDrawerOverlay,
//   ActionDrawerContent,
//   ActionDrawerHeader,
//   ActionDrawerFooter,
//   ActionDrawerClose,
// };
