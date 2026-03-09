'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts'
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
} from '@/components/ui/chart'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BarChartProps {
  title: string
  description?: string
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  dataKey?: string
  height?: number
  showGrid?: boolean
  horizontal?: boolean
  action?: React.ReactNode
  colorful?: boolean
  className?: string
}

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export function BarChartComponent({
  title,
  description,
  data,
  dataKey = 'value',
  height = 300,
  showGrid = true,
  horizontal = false,
  action,
  colorful = false,
  className,
}: BarChartProps) {
  // Build dynamic chart config based on data
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: item.color || (colorful ? chartColors[index % chartColors.length] : 'var(--chart-1)'),
    }
    return acc
  }, {} as ChartConfig)

  // Add the value key
  chartConfig[dataKey] = {
    label: 'Valeur',
    color: 'var(--chart-1)',
  }

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
          <ChartContainer config={chartConfig} className={`h-[${height}px] w-full`}>
            <BarChart
              data={data}
              layout={horizontal ? 'vertical' : 'horizontal'}
              margin={{ top: 10, right: 10, left: horizontal ? 60 : -20, bottom: 0 }}
            >
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={!horizontal}
                  vertical={horizontal}
                />
              )}
              {horizontal ? (
                <>
                  <XAxis type="number" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    width={80}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                </>
              )}
              <ChartTooltip
                cursor={{ fill: 'var(--accent)', opacity: 0.3 }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey={dataKey} radius={[6, 6, 6, 6]} maxBarSize={50}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.color ||
                      (colorful ? chartColors[index % chartColors.length] : 'var(--chart-1)')
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
