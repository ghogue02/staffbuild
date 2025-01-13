"use client"
import React, { useState } from 'react'
import { savePhaseData } from '../../utils/savePhasteData'

export default function DemonstrationsPage() {
  const [loading, setLoading] = useState(false)
  const [reflections, setReflections] = useState('')
  const [feedback, setFeedback] = useState('')
  const [nextSteps, setNextSteps] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = { reflections, feedback, nextSteps }
      await savePhaseData('demonstrations', formData)
      alert('Demonstration reflections saved!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Demonstrations Reflection</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Final Reflections:
          <textarea
            value={reflections}
            onChange={(e) => setReflections(e.target.value)}
          />
        </label>
        <br />
        <label>
          Feedback Received:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </label>
        <br />
        <label>
          Next Steps:
          <textarea
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Demonstration Reflections'}
        </button>
      </form>
    </div>
  )
}