'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { savePhaseData } from '../../utils/savePhaseData'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PHASE_NAMES, PAGE_TITLES } from '../../utils/constants'
import { useAuth } from '../../utils/useAuth'

export default function KickoffPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [kickoffFormData, setKickoffFormData] = useState({
    leadershipNotes: '',
    focusAreas: '',
    initialIdeas: '',
    projectGoals: '',
  });

  const { session, loading: authLoading, fetchData } = useAuth(); // Destructure fetchData

  useEffect(() => {
    if (session && !authLoading) {
      fetchData(PHASE_NAMES.KICKOFF, setKickoffFormData);
    }
  }, [session, authLoading, fetchData]);

  const handleChange =
    (field: keyof typeof kickoffFormData) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setKickoffFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setError(null);
      setSuccess(false);
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await savePhaseData(PHASE_NAMES.KICKOFF, kickoffFormData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {PAGE_TITLES[PHASE_NAMES.KICKOFF]} Phase
        </h1>
        <p className="text-xl text-gray-300">Time: 10:00am - 11:00am</p>
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
              Key notes from leadership talk:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What were the main points discussed in the leadership presentation?"
              value={kickoffFormData.leadershipNotes}
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
              value={kickoffFormData.focusAreas}
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
              value={kickoffFormData.initialIdeas}
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
              value={kickoffFormData.projectGoals}
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