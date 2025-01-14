'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { savePhaseData } from '../../utils/savePhaseData'
import { PHASE_NAMES, PAGE_TITLES } from '../../utils/constants'
import { useAuth } from '../../utils/useAuth'

export default function PlanningPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [planningFormData, setPlanningFormData] = useState({
    selectedIdea: '',
    projectOutline: '',
    keyMilestones: '',
    learningGoals: ''
  })
  const [isClient, setIsClient] = useState(false);
  const { isLoading, fetchData } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isLoading) {
      fetchData(PHASE_NAMES.PLANNING, setPlanningFormData)
    }
  }, [isClient, isLoading, fetchData])

  const handleChange =
    (field: keyof typeof planningFormData) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPlanningFormData((prev) => ({
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
      await savePhaseData(PHASE_NAMES.PLANNING, planningFormData)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isClient || isLoading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {PAGE_TITLES[PHASE_NAMES.PLANNING]} Phase
        </h1>
        <p className="text-xl text-gray-300">Time: 11:00am - 12:00pm</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6">
          <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-100 mb-4">
            Your responses have been saved successfully!
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 px-6 text-xl font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Workbook Home
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Selected Project Idea:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Which project idea have you decided to pursue? Why did you choose this idea?"
              value={planningFormData.selectedIdea}
              onChange={handleChange('selectedIdea')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Project Outline:
            </label>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Provide a detailed outline of your project. What are the main components? How do they fit together?"
              value={planningFormData.projectOutline}
              onChange={handleChange('projectOutline')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Key Milestones:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What are the key milestones for your project today? What do you need to achieve at each stage?"
              value={planningFormData.keyMilestones}
              onChange={handleChange('keyMilestones')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Learning Goals:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What specific skills or technologies do you want to learn or improve during this project?"
              value={planningFormData.learningGoals}
              onChange={handleChange('learningGoals')}
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
            {loading ? 'Saving...' : 'Save Planning Data'}
          </button>
        </div>
      </form>
    </div>
  )
}