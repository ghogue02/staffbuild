'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PHASE_NAMES, PAGE_TITLES } from '../../utils/constants';
import { savePhaseData } from '../../utils/savePhaseData';

interface FormData {
  brainstorming: string;
  research: string;
  projectOutline: string;
  projectScope: string;
}

function PlanningForm({ 
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
              Brainstorming (11:00am - 11:20am):
            </label>
            <p className="text-gray-400 mb-4">Review the provided prompt options (fun/personal/work) and explore possibilities. What project concept interests you most and why?</p>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Document your initial project concept, including which category it falls under and why it interests you..."
              value={formData.brainstorming}
              onChange={onChange('brainstorming')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Research (11:20am - 11:45am):
            </label>
            <p className="text-gray-400 mb-4">Research similar existing projects and gather technical requirements. What examples or frameworks have you found that could help?</p>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Document your research findings, including similar projects, useful code examples, and key technical requirements..."
              value={formData.research}
              onChange={onChange('research')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Project Outline (11:45am - 12:00pm):
            </label>
            <p className="text-gray-400 mb-4">Break down your project into small, manageable tasks. What are the key components you'll need to build?</p>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="List out your project tasks, components, and mini-milestone targets..."
              value={formData.projectOutline}
              onChange={onChange('projectOutline')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Project Scope Selection:
            </label>
            <p className="text-gray-400 mb-4">Based on the time available (12:00pm - 4:00pm for building), which tier of functionality are you aiming for?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Describe which tier (1, 2, or 3) you're targeting and why this scope feels achievable..."
              value={formData.projectScope}
              onChange={onChange('projectScope')}
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
  );
}

export default function PlanningPage() {
  const [formData, setFormData] = React.useState<FormData>({
    brainstorming: '',
    research: '',
    projectOutline: '',
    projectScope: '',
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
          .select('*')
          .eq('phase', PHASE_NAMES.PLANNING)
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching data:', fetchError);
          if (fetchError.code !== 'PGRST116') {
            setError('Failed to fetch existing data');
          }
          return;
        }

        if (data?.data) {
          console.log('Found existing data:', data);
          setFormData(data.data);
        } else {
          console.log('No existing data found, using default empty form');
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
        phase: PHASE_NAMES.PLANNING,
        formData
      });

      await savePhaseData(PHASE_NAMES.PLANNING, formData);
      console.log('Data saved successfully');
      setSuccess(true);
      
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
    <PlanningForm
      formData={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      loading={loading}
      error={error}
      success={success}
    />
  );
}