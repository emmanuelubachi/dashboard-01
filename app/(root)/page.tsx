import { ModeButton } from '@/components/theme-toggle'
import {
  ActionDrawer,
  ActionDrawerButton,
  ActionDrawerTooltip,
} from '@/components/elements/action-drawer'

export default function Home() {
  return (
    <main className="m-auto flex min-h-screen w-full items-center justify-center">
      <div className="flex gap-4">
        <ActionDrawerButton label="Filter" variant="secondary">
          <ModeButton />
        </ActionDrawerButton>
        <ActionDrawerTooltip
          variant="outline"
          tooltip="Filter"
        ></ActionDrawerTooltip>
        <ActionDrawer />
      </div>
    </main>
  )
}
