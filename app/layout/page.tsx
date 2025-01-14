'use client'

import Link from 'next/link'
import withAuth from '@/utils/withAuth'

function HomePage() {

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">AI Build Day Workbook</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
          <div className="grid gap-4">
            {[
              {
                href: "/kickoff",
                title: "1. Kickoff (10:00 - 11:00)",
                desc: "Welcome, purpose, and build-in-public overview"
              },
              {
                href: "/planning",
                title: "2. Planning (11:00 - 12:00)",
                desc: "Brainstorming, research, and project outline"
              },
              {
                href: "/building",
                title: "3. Building (12:00 - 4:00)",
                desc: "Main development and implementation phase"
              },
              {
                href: "/demo-prep",
                title: "4. Demo Prep (4:00 - 5:00)",
                desc: "Prepare your 90-second demonstration"
              },
              {
                href: "/demonstrations",
                title: "5. Demonstrations (5:00 - 8:00)",
                desc: "Present your work and record final reflections"
              }
            ].map(phase => (
              <Link 
                key={phase.href}
                href={phase.href} 
                className="p-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors bg-gray-800"
              >
                <h3 className="text-white font-semibold">{phase.title}</h3>
                <p className="text-gray-400">{phase.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default withAuth(HomePage);