'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PHASE_NAMES, PAGE_TITLES } from '../../utils/constants';
import { savePhaseData } from '../../utils/savePhaseData';

interface FormData {
  presentationReflection: string;
  keyAccomplishments: string;
  aiLearnings: string;
  futureApplications: string;
  buildDayFeedback: string;
  nextSteps: string;
}

function DemonstrationsForm({ 
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
          {PAGE_TITLES[PHASE_NAMES.DEMONSTRATIONS]} Phase
        </h1>
        <p className="text-xl text-gray-300">Time: 5:00pm - 8:00pm</p>
        <p className="text-lg text-gray-400 mt-4">Final reflections and learnings from the Build Day experience.</p>
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
              Presentation Reflection:
            </label>
            <p className="text-gray-400 mb-4">How did your demonstration go? What went well and what would you do differently?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Reflect on your presentation experience..."
              value={formData.presentationReflection}
              onChange={onChange('presentationReflection')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Key Accomplishments:
            </label>
            <p className="text-gray-400 mb-4">What are you most proud of achieving during the Build Day?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="List your main achievements and proud moments..."
              value={formData.keyAccomplishments}
              onChange={onChange('keyAccomplishments')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              AI Learnings:
            </label>
            <p className="text-gray-400 mb-4">What did you learn about working with AI? What surprised you most?</p>
            <textarea
              className="w-full h-48 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Share your insights about working with AI tools..."
              value={formData.aiLearnings}
              onChange={onChange('aiLearnings')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Future Applications:
            </label>
            <p className="text-gray-400 mb-4">How do you plan to apply what you've learned about AI in your future work?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Describe how you'll use AI tools and learnings going forward..."
              value={formData.futureApplications}
              onChange={onChange('futureApplications')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Build Day Feedback:
            </label>
            <p className="text-gray-400 mb-4">What feedback do you have about the Build Day format and experience?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Share your thoughts on the Build Day structure, timing, and support..."
              value={formData.buildDayFeedback}
              onChange={onChange('buildDayFeedback')}
            />
          </div>

          <div className="form-group">
            <label className="block text-xl font-medium text-white mb-3">
              Next Steps:
            </label>
            <p className="text-gray-400 mb-4">What are your plans for continuing to develop your AI skills or project?</p>
            <textarea
              className="w-full h-32 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Outline your next steps for continuing your AI journey..."
              value={formData.nextSteps}
              onChange={onChange('nextSteps')}
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
            {loading ? 'Saving...' : 'Save Final Reflections'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function DemonstrationsPage() {
  const [formData, setFormData] = React.useState<FormData>({
    presentationReflection: '',
    keyAccomplishments: '',
    aiLearnings: '',
    futureApplications: '',
    buildDayFeedback: '',
    nextSteps: '',
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
          .eq('phase', PHASE_NAMES.DEMONSTRATIONS)
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
        phase: PHASE_NAMES.DEMONSTRATIONS,
        formData
      });

      await savePhaseData(PHASE_NAMES.DEMONSTRATIONS, formData);
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
    <DemonstrationsForm
      formData={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      loading={loading}
      error={error}
      success={success}
    />
  );
}