"use client"
import React, { useState } from 'react'
import { savePhaseData } from '../../utils/savePhaseData'

export default function BuildingPage() {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState('')
  const [troubles, setTroubles] = useState('')
  const [questions, setQuestions] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = { tasks, troubles, questions }
      await savePhaseData('building', formData)
      alert('Building data saved!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Building Phase</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tasks Completed:
          <textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
        </label>
        <br />
        <label>
          Challenges Encountered:
          <textarea
            value={troubles}
            onChange={(e) => setTroubles(e.target.value)}
          />
        </label>
        <br />
        <label>
          Questions/Help Needed:
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Building Progress'}
        </button>
      </form>
    </div>
  )
}