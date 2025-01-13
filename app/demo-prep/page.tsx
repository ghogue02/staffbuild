"use client"
import React, { useState } from 'react'
import { savePhaseData } from '../../utils/savePhasteData'

export default function DemoPrepPage() {
  const [loading, setLoading] = useState(false)
  const [presentationPoints, setPresentationPoints] = useState('')
  const [demoScript, setDemoScript] = useState('')
  const [technicalSetup, setTechnicalSetup] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = { presentationPoints, demoScript, technicalSetup }
      await savePhaseData('demo-prep', formData)
      alert('Demo prep data saved!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Demo Preparation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Key Presentation Points:
          <textarea
            value={presentationPoints}
            onChange={(e) => setPresentationPoints(e.target.value)}
          />
        </label>
        <br />
        <label>
          Demo Script (90 seconds):
          <textarea
            value={demoScript}
            onChange={(e) => setDemoScript(e.target.value)}
          />
        </label>
        <br />
        <label>
          Technical Setup Notes:
          <textarea
            value={technicalSetup}
            onChange={(e) => setTechnicalSetup(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Demo Prep'}
        </button>
      </form>
    </div>
  )
}