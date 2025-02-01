import { useState } from 'react'

export default function DatePicker({
    label,
    value,
    onChange
}: {
    label: string,
    value: string,
    onChange: (date: string) => void
}) {
    return (
        <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/50"
        />
        </div>  
    )
}