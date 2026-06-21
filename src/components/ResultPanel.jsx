import { useEffect, useRef, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../utils/emiUtils'

const COLORS = {
  principal: '#9b51e0',
  interest:  '#f5c542',
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div style={{
        background: 'rgba(17, 10, 30, 0.95)',
        border: '1px solid rgba(149, 76, 233, 0.3)',
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '0.85rem',
        color: '#f0eaf8',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <div style={{ fontWeight: 700, marginBottom: '2px' }}>{item.name}</div>
        <div style={{ color: item.payload.color, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
          {formatCurrency(item.value)}
        </div>
        <div style={{ color: '#9b8bb5', fontSize: '0.75rem' }}>{item.payload.pct}% of total</div>
      </div>
    )
  }
  return null
}

const AnimatedValue = ({ value, formatter }) => {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)
  const frameRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    const from = prevRef.current
    const to = value
    const duration = 400

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    startTimeRef.current = null

    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts
      const elapsed = ts - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (to - from) * eased)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        prevRef.current = to
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value])

  return <>{formatter(display)}</>
}

const ResultPanel = ({ emi, totalAmount, totalInterest, principal, tenureMonths }) => {
  const principalPct = totalAmount > 0 ? Math.round((principal / totalAmount) * 100) : 0
  const interestPct  = totalAmount > 0 ? Math.round((totalInterest / totalAmount) * 100) : 0

  const pieData = [
    { name: 'Principal', value: principal,     color: COLORS.principal, pct: principalPct },
    { name: 'Interest',  value: totalInterest, color: COLORS.interest,  pct: interestPct  },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ── Primary EMI Card ── */}
      <section
        className="card animate-fade-up"
        style={{ animationDelay: '0.2s' }}
        aria-label="EMI Results"
      >
        <h2 className="card-title">
          <span className="card-title-icon">📊</span>
          Your EMI Breakdown
        </h2>

        {/* Monthly EMI */}
        <div className="result-primary" role="region" aria-label="Monthly EMI">
          <div className="result-primary-label">Monthly EMI</div>
          <div className="result-primary-value" aria-live="polite">
            <span>₹</span>
            <AnimatedValue
              value={emi}
              formatter={(v) => Math.round(v).toLocaleString('en-IN')}
            />
          </div>
          <div className="result-primary-sub">per month for {tenureMonths} months</div>
        </div>

        {/* Summary cards */}
        <div className="result-secondary-grid">
          <div className="result-secondary-card total" role="region" aria-label="Total Amount Payable">
            <div className="result-secondary-label">Total Payable</div>
            <div className="result-secondary-value teal" aria-live="polite">
              <AnimatedValue
                value={totalAmount}
                formatter={(v) => formatCurrency(v, true)}
              />
            </div>
          </div>
          <div className="result-secondary-card interest" role="region" aria-label="Total Interest Paid">
            <div className="result-secondary-label">Total Interest</div>
            <div className="result-secondary-value gold" aria-live="polite">
              <AnimatedValue
                value={totalInterest}
                formatter={(v) => formatCurrency(v, true)}
              />
            </div>
          </div>
        </div>

        {/* Breakdown rows */}
        <div aria-label="Loan Breakdown Details">
          <div className="breakdown-title">
            <span>📋</span> Detailed Breakdown
          </div>
          {[
            { label: 'Principal Amount',   val: formatCurrency(principal),     color: COLORS.principal },
            { label: 'Total Interest',     val: formatCurrency(totalInterest), color: COLORS.interest  },
            { label: 'Total Amount',       val: formatCurrency(totalAmount),   color: '#00d4aa'        },
            { label: 'Monthly EMI',        val: formatCurrency(emi),           color: '#f0eaf8'        },
          ].map(({ label, val, color }) => (
            <div className="breakdown-row" key={label}>
              <span className="breakdown-key">
                <span className="breakdown-key-dot" style={{ background: color }} aria-hidden="true" />
                {label}
              </span>
              <span className="breakdown-val">{val}</span>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="progress-bar-wrapper" aria-label="Principal vs Interest split">
          <div className="progress-bar-label">
            <span>Principal</span>
            <span>{principalPct}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${principalPct}%`,
                background: 'linear-gradient(90deg, var(--clr-primary), var(--clr-primary-light))',
              }}
              role="progressbar"
              aria-valuenow={principalPct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="progress-bar-label" style={{ marginTop: '10px' }}>
            <span>Interest</span>
            <span>{interestPct}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${interestPct}%`,
                background: 'linear-gradient(90deg, var(--clr-accent), var(--clr-accent-light))',
              }}
              role="progressbar"
              aria-valuenow={interestPct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </section>

      {/* ── Pie Chart Card ── */}
      <section
        className="card animate-fade-up"
        style={{ animationDelay: '0.3s' }}
        aria-label="Loan Composition Chart"
      >
        <h2 className="card-title">
          <span className="card-title-icon">🥧</span>
          Loan Composition
        </h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                animationBegin={0}
                animationDuration={600}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={0.9}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-legend" role="list" aria-label="Chart legend">
            {pieData.map((item) => (
              <div className="legend-item" key={item.name} role="listitem">
                <span
                  className="legend-dot"
                  style={{ background: item.color }}
                  aria-hidden="true"
                />
                <span>{item.name}: <strong>{item.pct}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResultPanel
