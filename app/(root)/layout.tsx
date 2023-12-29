"use client"
import { Sidebar } from "@/components/sidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  children: React.ReactNode,
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  children
}: Props) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const onCollapseHandler = () => {
    setIsCollapsed(true)
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      true
    )}`
  }
  const onExpandHandler = () => {
    setIsCollapsed(false)
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      false
    )}`
  }
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={onCollapseHandler}
          onExpand={onExpandHandler}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
          <Separator />
          <Sidebar
            isCollapsed={isCollapsed}
            links={[]}
          />
          {/* link object sample type {
                title: "",
                label: "",
                icon: Archive,
                variant: "ghost",
              } */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}