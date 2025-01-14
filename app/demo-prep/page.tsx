'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PHASE_NAMES, PAGE_TITLES } from '../../utils/constants';
import { savePhaseData } from '../../utils/savePhaseData';

interface FormData {
  projectTitle: string;
  problemStatement: string;
  solutionOverview: string;
  technicalHighlights: string;
  keyLearnings: string;
  demoScript: string;
}

function DemoPrepForm({ 
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
          {PAGE_TITLES[PHASE_NAMES.DEMO_PREP]} Phase
        </h1>
        <p className="text-xl text-gray-300">Time: 4:00pm - 5:00pm</p>
        <p className="text-lg text-gray-400 mt-4">Prepare your 90-second demonstration. Think carefully about what you want to highlight in your limited time.</p>
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
              Project Title:
            </label>
            <p className="text-gray-400 mb-4">What's a catchy, descriptive name for your project?</p>
            <textarea
              className="w-full h-16 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Enter a memorable title for your project..."
              value={formData.projectTitle}
              onChange={onChange('projectTitle')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Problem Statement:
            </label>
            <p className="text-gray-400 mb-4">What problem or need does your project address?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Briefly describe the problem you're solving..."
              value={formData.problemStatement}
              onChange={onChange('problemStatement')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Solution Overview:
            </label>
            <p className="text-gray-400 mb-4">How does your project solve the problem? What's your approach?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Explain your solution and how it works..."
              value={formData.solutionOverview}
              onChange={onChange('solutionOverview')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Technical Highlights:
            </label>
            <p className="text-gray-400 mb-4">What are the most impressive or interesting technical aspects of your solution?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="List the key technical features or challenges you overcame..."
              value={formData.technicalHighlights}
              onChange={onChange('technicalHighlights')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Key Learnings:
            </label>
            <p className="text-gray-400 mb-4">What were your most important insights or takeaways from building with AI?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Share your main learnings and insights..."
              value={formData.keyLearnings}
              onChange={onChange('keyLearnings')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Demo Script (90 seconds):
            </label>
            <p className="text-gray-400 mb-4">Plan your demo flow and talking points. Remember to stay within the 90-second time limit!</p>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Write out your demo script, including what you'll show and say..."
              value={formData.demoScript}
              onChange={onChange('demoScript')}
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
            {loading ? 'Saving...' : 'Save Demo Prep'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function DemoPrepPage() {
  const [formData, setFormData] = React.useState<FormData>({
    projectTitle: '',
    problemStatement: '',
    solutionOverview: '',
    technicalHighlights: '',
    keyLearnings: '',
    demoScript: '',
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
          .eq('phase', PHASE_NAMES.DEMO_PREP)
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
        phase: PHASE_NAMES.DEMO_PREP,
        formData
      });

      await savePhaseData(PHASE_NAMES.DEMO_PREP, formData);
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
    <DemoPrepForm
      formData={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      loading={loading}
      error={error}
      success={success}
    />
  );
}