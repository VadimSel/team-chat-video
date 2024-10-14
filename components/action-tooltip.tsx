"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ActionaTooltipProps {
  label: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align
}: ActionaTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}> {/* Через какое время выскакивает подсказка */}
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}> {/* выбор расположения надписи внутри облака подсказки */}
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}