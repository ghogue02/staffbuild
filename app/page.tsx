"use client"
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">AI Build Day Workbook</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
          <div className="grid gap-4">
            <Link href="/kickoff" className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">1. Kickoff (10:00 - 11:00)</h3>
              <p className="text-gray-600">Welcome, purpose, and build-in-public overview</p>
            </Link>
            
            <Link href="/planning" className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">2. Planning (11:00 - 12:00)</h3>
              <p className="text-gray-600">Brainstorming, research, and project outline</p>
            </Link>
            
            <Link href="/building" className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">3. Building (12:00 - 4:00)</h3>
              <p className="text-gray-600">Main development and implementation phase</p>
            </Link>
            
            <Link href="/demo-prep" className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">4. Demo Prep (4:00 - 5:00)</h3>
              <p className="text-gray-600">Prepare your 90-second demonstration</p>
            </Link>
            
            <Link href="/demonstrations" className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold">5. Demonstrations (5:00 - 8:00)</h3>
              <p className="text-gray-600">Present your work and record final reflections</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}