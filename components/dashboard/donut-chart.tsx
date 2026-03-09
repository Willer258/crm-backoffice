'use client'

import * as React from 'react'
import { Cell, Pie, PieChart, Label } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DonutChartProps {
  title: string
  description?: string
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  height?: number
  innerRadius?: number
  outerRadius?: number
  action?: React.ReactNode
  showLegend?: boolean
  centerLabel?: {
    value: string | number
    label: string
  }
  className?: string
}

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export function DonutChartComponent({
  title,
  description,
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
  action,
  showLegend = true,
  centerLabel,
  className,
}: DonutChartProps) {
  // Build dynamic chart config based on data
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: item.color || chartColors[index % chartColors.length],
    }
    return acc
  }, {} as ChartConfig)

  // Add transformed data with fill colors
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.color || chartColors[index % chartColors.length],
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={cn(
          'rounded-2xl border-0 bg-card/50 backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-md',
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action}
        </CardHeader>
        <CardContent className="pt-4">
          <ChartContainer
            config={chartConfig}
            className={`mx-auto aspect-square h-[${height}px]`}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                {centerLabel && (
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {centerLabel.value}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-xs"
                            >
                              {centerLabel.label}
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                )}
              </Pie>
              {showLegend && (
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  verticalAlign="bottom"
                />
              )}
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
