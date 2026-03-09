'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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

interface LineChartProps {
  title: string
  description?: string
  data: Array<Record<string, string | number>>
  lines: Array<{
    dataKey: string
    name: string
    color?: string
  }>
  height?: number
  showGrid?: boolean
  action?: React.ReactNode
  showLegend?: boolean
  className?: string
}

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export function LineChartComponent({
  title,
  description,
  data,
  lines,
  height = 300,
  showGrid = true,
  action,
  showLegend = true,
  className,
}: LineChartProps) {
  // Build chart config from lines
  const chartConfig = lines.reduce((acc, line, index) => {
    acc[line.dataKey] = {
      label: line.name,
      color: line.color || chartColors[index % chartColors.length],
    }
    return acc
  }, {} as ChartConfig)

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
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
              )}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />
              <ChartTooltip
                cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '5 5' }}
                content={<ChartTooltipContent indicator="line" />}
              />
              {showLegend && (
                <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
              )}
              {lines.map((line, index) => (
                <Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  name={line.name}
                  stroke={`var(--color-${line.dataKey})`}
                  strokeWidth={2}
                  dot={{
                    fill: `var(--color-${line.dataKey})`,
                    strokeWidth: 0,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: 'var(--background)',
                  }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
