import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartData = [
  { area: '01', score: 24 },
  { area: '02', score: 39 },
  { area: '03', score: 31 },
  { area: '04', score: 56 },
  { area: '05', score: 46 },
  { area: '06', score: 71 },
  { area: '07', score: 61 },
]

function OpportunityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff6500" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#ff6500" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#ffffff" strokeOpacity={0.08} vertical={false} />
        <XAxis dataKey="area" tick={{ fill: '#b0b0b0', fontSize: 16 }} axisLine={false} tickLine={false} tickMargin={10} />
        <YAxis domain={[0, 100]} tick={{ fill: '#b0b0b0', fontSize: 16 }} axisLine={false} tickLine={false} tickMargin={8} width={43} />
        <Tooltip
          contentStyle={{ background: '#292929', border: '1px solid #555555', borderRadius: 8, color: '#f0f0f0', fontSize: 11 }}
          labelStyle={{ color: '#c5c5c5' }}
        />
        <Area type="monotone" dataKey="score" stroke="#ff7900" strokeWidth={2} fill="url(#chartFill)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default OpportunityChart
