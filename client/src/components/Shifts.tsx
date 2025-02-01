import { useState } from 'react'
import { format, parseISO, differenceInMinutes } from 'date-fns'
import DatePicker from './DatePicker'

interface Shift {
  id: string
  teamMemberId: string
  startAt: string
  endAt: string
  breaks?: Array<{
    startAt: string
    endAt: string
  }>
}

interface ProcessedShift {
  id: string
  name: string
  date: string
  totalMinutes: number
  breaks: number
  netMinutes: number
}

export default function Shifts() {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [shifts, setShifts] = useState<ProcessedShift[]>([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState<string | null>(null)

  const fetchShifts = async (startDate: string, endDate: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3001/api/shifts/${startDate}/${endDate}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch shifts')
      
      const data: Shift[] = await response.json()
      setShifts(processShifts(data))
    } catch (error) {
      console.error('Error fetching shifts:', error)
      setError('Failed to load shifts. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const processShifts = (shifts: Shift[]): ProcessedShift[] => {
    return shifts.map(shift => {
      const start = parseISO(shift.startAt)
      const end = parseISO(shift.endAt)
      const totalMinutes = differenceInMinutes(end, start)
      
      const breakMinutes = (shift.breaks || []).reduce((acc, breakItem) => {
        const breakStart = parseISO(breakItem.startAt)
        const breakEnd = parseISO(breakItem.endAt)
        return acc + differenceInMinutes(breakEnd, breakStart)
      }, 0)

      return {
        id: shift.id,
        name: `Team Member ${shift.teamMemberId.slice(0, 6)}`,
        date: format(start, 'MMM dd, yyyy'),
        totalMinutes,
        breaks: breakMinutes,
        netMinutes: totalMinutes - breakMinutes
      }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Shift Overview</h2>
        <div className="flex gap-4">
          <DatePicker 
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
          />
          <button
            onClick={() => fetchShifts(startDate, endDate)}
            disabled={loading}
            className="self-end bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      
      {shifts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Team Member</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Total Hours</th>
                <th className="text-left py-3 px-4">Breaks</th>
                <th className="text-left py-3 px-4">Net Hours</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map(shift => (
                <tr key={shift.id} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="py-3 px-4">{shift.name}</td>
                  <td className="py-3 px-4">{shift.date}</td>
                  <td className="py-3 px-4">{(shift.totalMinutes / 60).toFixed(1)}h</td>
                  <td className="py-3 px-4">{(shift.breaks / 60).toFixed(1)}h</td>
                  <td className="py-3 px-4 font-medium text-primary">
                    {(shift.netMinutes / 60).toFixed(1)}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {loading ? 'Loading shifts...' : 'No shifts found for selected dates'}
        </div>
      )}
    </div>
  )
}