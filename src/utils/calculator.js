export function calcScheme(margin) {
  const projectCost = margin / 0.10
  const loanAmount  = projectCost * 0.90

  let scheme
  if (projectCost <= 140000) {
    scheme = { name: 'Micro Finance Scheme', rate: 6.5, years: 3, mora: 3, maxLoan: 125000 }
  } else if (projectCost <= 5000000) {
    scheme = { name: 'Term Loan Scheme',     rate: 8.0, years: 7, mora: 6, maxLoan: 4500000 }
  } else {
    return { error: 'Exceeds ₹50 lakh limit' }
  }

  const loan = Math.min(loanAmount, scheme.maxLoan)
  const qRate = scheme.rate / 100 / 4
  const moraQ = scheme.mora / 3
  const repayQ = scheme.years * 4 - moraQ
  const balAfterMora = loan * Math.pow(1 + qRate, moraQ)
  const emi = balAfterMora * qRate * Math.pow(1+qRate, repayQ) / (Math.pow(1+qRate, repayQ) - 1)
  const totalRepay  = emi * repayQ
  const totalInterest = totalRepay - loan

  return {
    projectCost: Math.round(projectCost),
    loanAmount:  Math.round(loan),
    schemeName:  scheme.name,
    rate:        scheme.rate,
    tenure:      scheme.years,
    moratorium:  scheme.mora,
    emi:         Math.round(emi),
    totalRepay:  Math.round(totalRepay),
    totalInterest: Math.round(totalInterest),
  }
}
