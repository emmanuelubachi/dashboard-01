"use client";
import { useCallback, ReactNode, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDeviceType from "@/hooks/useDeviceType";
import useActionDrawerStore from "@/store/useActionDrawerStore";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  children?: ReactNode;
  className?: string;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

type ActionTooltipProps = ActionButtonProps & {
  tooltip: string;
};

const sharedButtonStyles =
  "gap-2 rounded-lg shadow-lg transition-all duration-300 active:scale-95";

/**
 * A button component that toggles the action drawer and sets its content
 * when clicked. It accepts various props to customize its appearance
 * and behavior.
 *
 * @param {ReactNode} children - The content to be set in the action drawer.
 * @param {string} [className] - Additional classes to style the button.
 * @param {string} [label="Button"] - The label displayed next to the action icon.
 * @param {string} [variant="default"] - The variant of the button, affecting its styling.
 * @param {string} [size="default"] - The size of the button, affecting its dimensions.
 */
export const ActionDrawerButton: React.FC<ActionButtonProps> = ({
  children,
  className,
  label = "Button",
  variant = "default",
  size = "default",
}) => {
  const { toggleDrawer, setDrawerContent } = useActionDrawerStore();

  const handleClick = useCallback(() => {
    setDrawerContent(children);
    toggleDrawer();
  }, [children, setDrawerContent, toggleDrawer]);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className, sharedButtonStyles)}
      onClick={handleClick}
    >
      <Filter className="h-4 w-4" />
      <span className="text-pxs sm:text-sm">{label}</span>
    </Button>
  );
};

/**
 * A button component that toggles the action drawer and sets its content
 * when clicked, with an optional tooltip. It accepts various props to
 * customize its appearance and behavior.
 *
 * @param {ReactNode} children - The content to be set in the action drawer.
 * @param {string} [label=""] - The label displayed next to the action icon.
 * @param {string} [className] - Additional classes to style the button.
 * @param {string} [tooltip="Tooltip"] - The text displayed in the tooltip.
 * @param {string} [variant="default"] - The variant of the button, affecting its styling.
 * @param {string} [size="icon"] - The size of the button, affecting its dimensions.
 */
export const ActionDrawerTooltip: React.FC<ActionTooltipProps> = ({
  children,
  label,
  className,
  tooltip = "Tooltip",
  variant = "default",
  size = "icon",
}) => {
  const { toggleDrawer, setDrawerContent } = useActionDrawerStore();

  const handleClick = useCallback(() => {
    setDrawerContent(children);
    toggleDrawer();
  }, [children, setDrawerContent, toggleDrawer]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn(className, sharedButtonStyles)}
            onClick={handleClick}
          >
            <Filter className="h-4 w-4" />
            {label && <span className="text-pxs sm:text-sm">{label}</span>}
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        {tooltip && <TooltipContent side="top">{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

/**
 * A component that renders a slide-in drawer on the left side of the
 * viewport when the user clicks on an action button. The drawer is
 * closed when the user clicks outside of it or presses the escape key.
 *
 * The component accepts no props and renders a drawer with a white
 * background. The drawer is positioned absolutely at the top-left of
 * the viewport and has a fixed width of 240px on desktop and 100vw on
 * mobile.
 *
 * The component uses the `useFilterStore` hook to get the current state
 * of the filter drawer and the `useDeviceType` hook to determine if the
 * user is on a mobile device. It also uses the `AnimatePresence` component
 * from Framer Motion to animate the drawer in and out.
 */
export const ActionDrawer = () => {
  const { isMobile } = useDeviceType();
  const { isDrawerOpen, closeDrawer, actionDrawerContent } =
    useActionDrawerStore();

  const memoizedContent = useMemo(
    () => actionDrawerContent,
    [actionDrawerContent]
  );
  const handleOverlayClick = () => {
    if (isDrawerOpen) {
      closeDrawer();
    }
  };

  const animationVariants = useMemo(
    () => ({
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    }),
    []
  );

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 z-[35] bg-black opacity-50"
              aria-hidden="true"
              tabIndex={-1}
              onClick={handleOverlayClick}
            />
          )}

          <motion.div
            className="fixed left-0 top-0 z-40 h-screen overflow-hidden bg-background shadow-lg sm:border-r dark:bg-background sm:py-10"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariants}
            transition={{
              type: isDrawerOpen ? "tween" : "spring",
              duration: 0.3,
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="h-full w-64 sm:w-72">
              <div className="flex h-full w-full flex-col gap-4">
                {!isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 h-4 w-4 rounded-full p-0 opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:bg-transparent hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={closeDrawer}
                  >
                    <Cross2Icon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                )}
                <div className="py-2 mx-auto">{memoizedContent}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
