'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PHASE_NAMES, PAGE_TITLES } from '../../utils/constants';
import { savePhaseData } from '../../utils/savePhaseData';
import type { Session } from '@supabase/auth-helpers-nextjs';

interface FormData {
  leadershipNotes: string;
  focusAreas: string;
  initialIdeas: string;
  projectGoals: string;
}

// Form Component
function KickoffForm({ 
  formData, 
  onSubmit, 
  onChange, 
  loading, 
  error, 
  success 
}: { 
  formData: FormData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  loading: boolean;
  error: string | null;
  success: boolean;
}) {
  const router = useRouter();

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
            onClick={() => router.push('/homepage')}
            className="w-full py-4 px-6 text-xl font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Workbook Home
          </button>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Key notes from leadership talk:
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="What were the main points discussed in the leadership presentation?"
              value={formData.leadershipNotes}
              onChange={onChange('leadershipNotes')}
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
              onChange={onChange('focusAreas')}
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
              onChange={onChange('initialIdeas')}
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
              onChange={onChange('projectGoals')}
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
  );
}

// Main Page Component
export default function KickoffPage() {
  const [formData, setFormData] = React.useState<FormData>({
    leadershipNotes: '',
    focusAreas: '',
    initialIdeas: '',
    projectGoals: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log('No session found, redirecting to login');
          router.push('/login');
          return;
        }

        console.log('Fetching existing data for user:', session.user.id);
        const { data, error: fetchError } = await supabase
          .from('workbook_responses')
          .select('data')
          .eq('phase', PHASE_NAMES.KICKOFF)
          .eq('user_id', session.user.id)
          .single();

        if (fetchError) {
          console.error('Error fetching data:', fetchError);
          setError('Failed to fetch existing data');
          return;
        }

        if (data) {
          console.log('Found existing data:', data);
          setFormData(data.data);
        }
      } catch (err) {
        console.error('Error in loadData:', err);
        setError('Failed to load data');
      }
    };

    loadData();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log('Starting form submission...');

    try {
      console.log('Saving phase data:', {
        phase: PHASE_NAMES.KICKOFF,
        formData
      });

      await savePhaseData(PHASE_NAMES.KICKOFF, formData);
      console.log('Data saved successfully');
      setSuccess(true);
      
      // Short delay before redirect
      setTimeout(() => {
        router.push('/homepage');
      }, 1000);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <KickoffForm
      formData={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      loading={loading}
      error={error}
      success={success}
    />
  );
}