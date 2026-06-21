/**
 * useEMI — custom hook for EMI calculation
 *
 * Formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
 *   P = principal loan amount
 *   r = monthly interest rate (annual rate / 12 / 100)
 *   n = tenure in months
 */
export function useEMI(principal, annualRate, tenureMonths) {
  const P = Number(principal)
  const annualRateNum = Number(annualRate)
  const n = Number(tenureMonths)

  if (!P || !annualRateNum || !n || P <= 0 || annualRateNum <= 0 || n <= 0) {
    return { emi: 0, totalAmount: 0, totalInterest: 0 }
  }

  const r = annualRateNum / 12 / 100
  const factor = Math.pow(1 + r, n)
  const emi = (P * r * factor) / (factor - 1)
  const totalAmount = emi * n
  const totalInterest = totalAmount - P

  return {
    emi: isFinite(emi) ? emi : 0,
    totalAmount: isFinite(totalAmount) ? totalAmount : 0,
    totalInterest: isFinite(totalInterest) ? totalInterest : 0,
  }
}

/**
 * formatCurrency — format a number as Indian Rupees
 */
export function formatCurrency(value, compact = false) {
  if (!value || !isFinite(value)) return '₹0'

  if (compact) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`
    if (value >= 100000)   return `₹${(value / 100000).toFixed(2)}L`
    if (value >= 1000)     return `₹${(value / 1000).toFixed(1)}K`
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}
