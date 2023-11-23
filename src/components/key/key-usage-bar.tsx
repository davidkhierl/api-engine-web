'use client'

import { Key } from '@/lib/api-engine/api.types'
import { cn } from '@/lib/utils/class-name'
import { ResponsiveBar } from '@nivo/bar'

export interface KeyUsageBarProps extends Key {
  className?: string
}

function KeyUsageBar({ className, ...props }: KeyUsageBarProps) {
  return (
    <div className={cn(className)}>
      <ResponsiveBar
        data={[
          {
            name: props.name,
            request_count: 230,
            request_limit: props.request_limit,
          },
        ]}
        keys={['request_count']}
        indexBy="name"
        maxValue={props.request_limit}
        groupMode="grouped"
        layout="horizontal"
        padding={0}
        innerPadding={0}
        axisTop={null}
        axisLeft={null}
        axisBottom={null}
        enableLabel={false}
        tooltip={({ data }) => (
          <div>
            <p>usage</p>
            <p>request_count: {data.request_count}</p>
            <p>request_limit: {data.request_limit}</p>
          </div>
        )}
      />
    </div>
  )
}

export { KeyUsageBar }
