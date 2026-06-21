import { useState, useMemo, useRef, useEffect } from 'react'
import { useEMI, formatCurrency } from '../utils/emiUtils'
import ResultPanel from './ResultPanel'

const LOAN_MIN = 10000
const LOAN_MAX = 10000000
const RATE_MIN = 1
const RATE_MAX = 30
const TENURE_MONTHS_MIN = 1
const TENURE_MONTHS_MAX = 360
const TENURE_YEARS_MIN = 1
const TENURE_YEARS_MAX = 30

const Calculator = () => {
  const [loanAmount, setLoanAmount]   = useState(500000)
  const [rate, setRate]               = useState(8.5)
  const [tenure, setTenure]           = useState(24)
  const [tenureUnit, setTenureUnit]   = useState('months') // 'months' | 'years'

  const tenureInMonths = tenureUnit === 'years' ? tenure * 12 : tenure

  const { emi, totalAmount, totalInterest } = useEMI(loanAmount, rate, tenureInMonths)

  // Slider fill style helper
  const sliderStyle = (value, min, max) => {
    const pct = ((value - min) / (max - min)) * 100
    return {
      background: `linear-gradient(to right, var(--clr-primary) ${pct}%, var(--clr-border) ${pct}%)`
    }
  }

  const handleTenureUnitToggle = (unit) => {
    if (unit === tenureUnit) return
    // Convert tenure when switching
    if (unit === 'years') {
      setTenure(prev => Math.max(1, Math.round(prev / 12)))
    } else {
      setTenure(prev => Math.min(360, prev * 12))
    }
    setTenureUnit(unit)
  }

  const tenureMin = tenureUnit === 'years' ? TENURE_YEARS_MIN : TENURE_MONTHS_MIN
  const tenureMax = tenureUnit === 'years' ? TENURE_YEARS_MAX : TENURE_MONTHS_MAX

  return (
    <div className="calculator-grid">
      {/* ── Input Panel ── */}
      <section className="card animate-fade-up" style={{ animationDelay: '0.1s' }} aria-label="Loan Input">
        <h2 className="card-title">
          <span className="card-title-icon">⚙</span>
          Loan Parameters
        </h2>

        {/* Loan Amount */}
        <div className="form-group">
          <div className="form-label">
            <label className="form-label-text" htmlFor="loan-amount">
              Loan Amount
            </label>
            <span className="form-label-value" aria-live="polite">
              {formatCurrency(loanAmount, true)}
            </span>
          </div>
          <div className="input-wrapper">
            <span className="input-prefix" aria-hidden="true">₹</span>
            <input
              id="loan-amount"
              type="number"
              className="form-input has-prefix"
              value={loanAmount}
              min={LOAN_MIN}
              max={LOAN_MAX}
              step={10000}
              onChange={e => {
                const v = Number(e.target.value)
                setLoanAmount(Math.min(LOAN_MAX, Math.max(0, v)))
              }}
              aria-label="Loan amount in rupees"
            />
          </div>
          <input
            type="range"
            className="range-slider"
            min={LOAN_MIN}
            max={LOAN_MAX}
            step={10000}
            value={loanAmount}
            onChange={e => setLoanAmount(Number(e.target.value))}
            style={sliderStyle(loanAmount, LOAN_MIN, LOAN_MAX)}
            aria-label="Loan amount slider"
            aria-valuemin={LOAN_MIN}
            aria-valuemax={LOAN_MAX}
            aria-valuenow={loanAmount}
          />
          <div className="range-limits">
            <span className="range-limit-text">₹10K</span>
            <span className="range-limit-text">₹1Cr</span>
          </div>
        </div>

        {/* Annual Interest Rate */}
        <div className="form-group">
          <div className="form-label">
            <label className="form-label-text" htmlFor="interest-rate">
              Annual Interest Rate
            </label>
            <span className="form-label-value" aria-live="polite">
              {rate}%
            </span>
          </div>
          <div className="input-wrapper">
            <input
              id="interest-rate"
              type="number"
              className="form-input"
              value={rate}
              min={RATE_MIN}
              max={RATE_MAX}
              step={0.1}
              onChange={e => {
                const v = Number(e.target.value)
                setRate(Math.min(RATE_MAX, Math.max(0, Number(v.toFixed(1)))))
              }}
              aria-label="Annual interest rate in percent"
            />
          </div>
          <input
            type="range"
            className="range-slider"
            min={RATE_MIN}
            max={RATE_MAX}
            step={0.1}
            value={rate}
            onChange={e => setRate(Number(parseFloat(e.target.value).toFixed(1)))}
            style={sliderStyle(rate, RATE_MIN, RATE_MAX)}
            aria-label="Interest rate slider"
            aria-valuemin={RATE_MIN}
            aria-valuemax={RATE_MAX}
            aria-valuenow={rate}
          />
          <div className="range-limits">
            <span className="range-limit-text">1%</span>
            <span className="range-limit-text">30%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="form-group">
          <div className="form-label">
            <label className="form-label-text" htmlFor="tenure">
              Loan Tenure
            </label>
            <span className="form-label-value" aria-live="polite">
              {tenure} {tenureUnit === 'years' ? (tenure === 1 ? 'yr' : 'yrs') : 'mo'}
            </span>
          </div>
          <div className="input-wrapper" style={{ marginBottom: '12px' }}>
            <input
              id="tenure"
              type="number"
              className="form-input"
              value={tenure}
              min={tenureMin}
              max={tenureMax}
              step={1}
              onChange={e => {
                const v = Number(e.target.value)
                setTenure(Math.min(tenureMax, Math.max(0, Math.round(v))))
              }}
              aria-label={`Loan tenure in ${tenureUnit}`}
            />
          </div>
          <div className="toggle-group" role="group" aria-label="Tenure unit">
            <button
              className={`toggle-btn ${tenureUnit === 'months' ? 'active' : ''}`}
              onClick={() => handleTenureUnitToggle('months')}
              id="toggle-months"
              aria-pressed={tenureUnit === 'months'}
            >
              Months
            </button>
            <button
              className={`toggle-btn ${tenureUnit === 'years' ? 'active' : ''}`}
              onClick={() => handleTenureUnitToggle('years')}
              id="toggle-years"
              aria-pressed={tenureUnit === 'years'}
            >
              Years
            </button>
          </div>
          <input
            type="range"
            className="range-slider"
            min={tenureMin}
            max={tenureMax}
            step={1}
            value={tenure}
            onChange={e => setTenure(Number(e.target.value))}
            style={sliderStyle(tenure, tenureMin, tenureMax)}
            aria-label="Tenure slider"
            aria-valuemin={tenureMin}
            aria-valuemax={tenureMax}
            aria-valuenow={tenure}
          />
          <div className="range-limits">
            <span className="range-limit-text">{tenureMin} {tenureUnit === 'years' ? 'yr' : 'mo'}</span>
            <span className="range-limit-text">{tenureMax} {tenureUnit === 'years' ? 'yrs' : 'mo'}</span>
          </div>
        </div>
      </section>

      {/* ── Results Panel ── */}
      <ResultPanel
        emi={emi}
        totalAmount={totalAmount}
        totalInterest={totalInterest}
        principal={Number(loanAmount)}
        tenureMonths={tenureInMonths}
      />
    </div>
  )
}

export default Calculator
