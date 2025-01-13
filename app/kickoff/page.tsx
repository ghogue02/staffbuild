// pages/kickoff.tsx
import React, { useState } from 'react'
import { savePhaseData } from '../../utils/savePhasteData' // adjust path if needed

export default function KickoffPage() {
  const [loading, setLoading] = useState(false)
  // Form fields for the Kickoff. Just an example:
  const [notes, setNotes] = useState('')
  const [focusAreas, setFocusAreas] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      // Gather form fields into an object
      const formData = { notes, focusAreas }
      await savePhaseData('kickoff', formData)
      alert('Data saved for Kickoff phase!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Kickoff Phase</h1>
      <p>Time: 10:00am - 11:00am</p>
      <form onSubmit={handleSubmit}>
        <label>
          Key notes from leadership talk:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <br />
        <label>
          Focus areas or big takeaways:
          <textarea
            value={focusAreas}
            onChange={(e) => setFocusAreas(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Kickoff Data'}
        </button>
      </form>
    </div>
  )
}