"use client"
import React, { useState } from 'react'
import { savePhaseData } from '../../utils/savePhaseData'

export default function KickoffPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    leadershipNotes: '',
    focusAreas: '',
    initialIdeas: '',
    projectGoals: ''
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    setError(null)
    setSuccess(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await savePhaseData('kickoff', formData)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Kickoff Phase</h1>
        <p className="text-xl text-gray-300">Time: 10:00am - 11:00am</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-100">
          Your responses have been saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Key notes from leadership talk:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What were the main points discussed in the leadership presentation?"
              value={formData.leadershipNotes}
              onChange={handleChange('leadershipNotes')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Focus areas or big takeaways:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What key concepts or focus areas resonated with you from the kickoff?"
              value={formData.focusAreas}
              onChange={handleChange('focusAreas')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Initial Project Ideas:
            </label>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What ideas are you considering exploring? What interests you about these ideas? What potential challenges do you foresee?"
              value={formData.initialIdeas}
              onChange={handleChange('initialIdeas')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Build Day Goals:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What do you hope to achieve by the end of today's build session?"
              value={formData.projectGoals}
              onChange={handleChange('projectGoals')}
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 text-xl font-medium text-white rounded-lg transition-colors ${
              loading 
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
            }`}
          >
            {loading ? 'Saving...' : 'Save Kickoff Data'}
          </button>
        </div>
      </form>
    </div>
  )
}