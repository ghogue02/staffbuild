// pages/planning.tsx
"use client"
import React, { useState } from 'react'
import { savePhaseData } from '../../utils/savePhaseData'

export default function PlanningPage() {
  const [loading, setLoading] = useState(false)
  const [brainstormIdeas, setBrainstormIdeas] = useState('')
  const [researchNotes, setResearchNotes] = useState('')
  const [outline, setOutline] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = { brainstormIdeas, researchNotes, outline }
      await savePhaseData('planning', formData)
      alert('Planning data saved!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Planning Phase</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Brainstorming (11:00 - 11:20):
          <textarea
            value={brainstormIdeas}
            onChange={(e) => setBrainstormIdeas(e.target.value)}
          />
        </label>
        <br />
        <label>
          Research (11:20 - 11:45):
          <textarea
            value={researchNotes}
            onChange={(e) => setResearchNotes(e.target.value)}
          />
        </label>
        <br />
        <label>
          Outline (11:45 - 12:00):
          <textarea
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Planning Data'}
        </button>
      </form>
    </div>
  )
}