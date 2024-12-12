import {
  ActionDrawer,
  ActionDrawerTrigger,
  ActionDrawerContent,
  ActionDrawerHeader,
  ActionDrawerFooter,
  ActionDrawerClose,
} from "@/components/elements/ActionDrawer";

export default function Demo() {
  return (
    <main className="m-auto w-full h-screen flex items-center justify-center">
      <ActionDrawerTrigger variant="secondary" className=" px-4 py-2 rounded">
        Open Drawer
      </ActionDrawerTrigger>

      <ActionDrawer>
        <ActionDrawerContent className="w-80 h-screen">
          <ActionDrawerHeader>Drawer Title</ActionDrawerHeader>
          <p>This is the drawer content. Add anything you want here!</p>
          <ActionDrawerFooter>
            <ActionDrawerClose />
          </ActionDrawerFooter>
        </ActionDrawerContent>
      </ActionDrawer>
    </main>
  );
}
