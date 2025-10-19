import React, { useState } from 'react';
import { STATIONS } from '../constants';
import type { SearchParams } from '../types';
import { IconCalendar, IconLocation, IconSearch } from './Icons';

interface SearchFormProps {
    onSearch: (params: SearchParams) => void;
}

const InputField: React.FC<{
    label: string;
    icon: React.ReactNode;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    listId: string;
}> = ({ label, icon, id, value, onChange, placeholder, listId }) => (
    <div>
        <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-700 mb-2">
            {icon}
            <span className="ml-2">{label}</span>
        </label>
        <input 
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            list={listId}
            className="w-full px-3 py-2.5 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            required
        />
    </div>
);


export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!from || !to) {
            setError("Please enter both departure and arrival stations.");
            return;
        }
        if (from === to) {
            setError("Departure and arrival stations cannot be the same.");
            return;
        }
        setError(null);
        onSearch({ from, to, date });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg relative">
            {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField 
                        label="From"
                        icon={<IconLocation className="h-5 w-5 text-gray-400" />}
                        id="from"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                        placeholder="Enter source station"
                        listId="stations-list"
                    />
                     <InputField 
                        label="To"
                        icon={<IconLocation className="h-5 w-5 text-gray-400" />}
                        id="to"
                        value={to}
                        onChange={e => setTo(e.target.value)}
                        placeholder="Enter destination station"
                        listId="stations-list"
                    />
                    <div>
                        <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                             <IconCalendar className="h-5 w-5 text-gray-400" />
                            <span className="ml-2">Journey Date</span>
                        </label>
                        <input id="date" type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2.5 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400" style={{colorScheme: 'dark'}} />
                    </div>
                </div>

                <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3.5 px-4 rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-base">
                    <IconSearch className="h-5 w-5" />
                    Search Trains
                </button>

                <datalist id="stations-list">
                    {STATIONS.map(s => <option key={s} value={s} />)}
                </datalist>
            </form>
        </div>
    );
};