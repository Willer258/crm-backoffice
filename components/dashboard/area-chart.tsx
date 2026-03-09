'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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

interface AreaChartProps {
  title: string
  description?: string
  data: Array<{
    name: string
    value: number
    value2?: number
  }>
  dataKey?: string
  dataKey2?: string
  height?: number
  showGrid?: boolean
  action?: React.ReactNode
  className?: string
}

export function AreaChartComponent({
  title,
  description,
  data,
  dataKey = 'value',
  dataKey2,
  height = 300,
  showGrid = true,
  action,
  className,
}: AreaChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey === 'value' ? 'Valeur' : dataKey,
      color: 'var(--chart-1)',
    },
    ...(dataKey2 && {
      [dataKey2]: {
        label: dataKey2 === 'value2' ? 'Valeur 2' : dataKey2,
        color: 'var(--chart-2)',
      },
    }),
  } satisfies ChartConfig

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
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                </linearGradient>
                {dataKey2 && (
                  <linearGradient id="fillValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`var(--color-${dataKey2})`} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={`var(--color-${dataKey2})`} stopOpacity={0} />
                  </linearGradient>
                )}
              </defs>
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
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="var(--color-value)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#fillValue)"
              />
              {dataKey2 && (
                <Area
                  type="monotone"
                  dataKey={dataKey2}
                  stroke={`var(--color-${dataKey2})`}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#fillValue2)"
                />
              )}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
