import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { langOptions } from '../i18n/lang'
import { calcScheme } from '../utils/calculator'
import { api } from '../lib/api'
import { TrendingUp, Loader2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '', mobile: '', village: '', district: '', state: '', lang: 'en',
    category: '', margin: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  const handleNext = () => {
    if (step < 2) setStep(step + 1)
  }
  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const fillDemoData = () => {
    setFormData({
      name: 'Savita Yadav', mobile: '9876543210', village: 'Morshi', district: 'Amravati', state: 'Maharashtra', lang: 'hi',
      category: 'Dairy', margin: 14000
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Async mock backend call
      await api.registerUser(formData)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const schemePreview = formData.margin ? calcScheme(Number(formData.margin)) : null

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      <header className="p-4 bg-brand-navy border-b border-[var(--border)] text-center font-bold text-white flex items-center justify-center gap-2 shadow-sm relative z-10">
         <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-brand-gold font-bold shadow-sm backdrop-blur-sm">
           <TrendingUp size={18} strokeWidth={2.5} />
         </div>
         <span className="text-xl tracking-tight">Vyapar Mitra AI</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 items-start">
          
          {/* Form Side */}
          <Card className="w-full">
            <div className="mb-6 flex justify-between items-center text-sm font-medium text-[var(--text-muted)] border-b border-[var(--border)] pb-4">
              <span>Step {step} of 2</span>
              <span className="text-brand-navy dark:text-brand-gold">
                {step === 1 ? 'Personal Details' : 'Business Details'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} 
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile Number</label>
                    <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} 
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Village/Town</label>
                      <input required name="village" value={formData.village} onChange={handleChange} 
                        className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">District</label>
                      <input required name="district" value={formData.district} onChange={handleChange} 
                        className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <select required name="state" value={formData.state} onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy">
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Language</label>
                    <select name="lang" value={formData.lang} onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy">
                      {langOptions.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Category</label>
                    <select required name="category" value={formData.category} onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy">
                      <option value="">Select category</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Goat rearing">Goat rearing</option>
                      <option value="Kirana retail">Kirana retail</option>
                      <option value="Textiles">Textiles/Tailoring</option>
                      <option value="Food processing">Food processing</option>
                      <option value="Vermicompost">Vermicompost</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Available Margin Money (₹)</label>
                    <p className="text-xs text-[var(--text-muted)] mb-2">How much of your own money can you invest?</p>
                    <input required type="number" name="margin" value={formData.margin} onChange={handleChange} 
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy text-xl font-semibold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Brief Description (Optional)</label>
                    <textarea name="desc" rows="3" 
                      className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy"></textarea>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-[var(--border)] mt-6">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={handleBack}>Back</Button>
                ) : (
                  <Button type="button" variant="ghost" onClick={fillDemoData} className="text-[var(--text-muted)] hover:text-brand-navy">
                    Fill Demo Details
                  </Button>
                )}
                {step < 2 ? (
                  <Button type="button" onClick={handleNext}>Next Step</Button>
                ) : (
                  <Button type="submit" variant="gold" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="animate-spin mr-2" size={16} /> Processing...</> : 'Generate Plan'}
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Info / Preview Side */}
          <div className="hidden md:block">
            {step === 1 && (
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Start your journey today</h3>
                <p className="text-[var(--text-muted)] mb-6">It takes just 2 minutes to generate a data-backed business plan for your area.</p>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex items-center gap-2">✅ Free hyper-local market analysis</li>
                  <li className="flex items-center gap-2">✅ Government scheme calculation</li>
                  <li className="flex items-center gap-2">✅ AI business guidance</li>
                </ul>
              </div>
            )}
            
            {step === 2 && (
              <Card className="bg-brand-navy text-white border-none shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
                <h3 className="text-lg font-semibold text-brand-gold mb-6">Live Scheme Preview</h3>
                {schemePreview && !schemePreview.error ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-white/70">Estimated Project Cost</p>
                      <p className="text-2xl font-bold">₹{schemePreview.projectCost.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Eligible Loan Amount (90%)</p>
                      <p className="text-2xl font-bold">₹{schemePreview.loanAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="pt-4 border-t border-white/20 mt-4">
                      <p className="text-xs text-white/70">Recommended Scheme</p>
                      <p className="font-semibold text-brand-gold">{schemePreview.schemeName}</p>
                      <p className="text-sm mt-1">{schemePreview.rate}% p.a. • {schemePreview.tenure} Years</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-white/60 text-sm">Enter your margin money to see your loan eligibility instantly.</p>
                )}
              </Card>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
