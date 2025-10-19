
import React, { useState } from 'react';
import type { Train, Passenger, Booking, SearchParams } from '../types';
import { IconArrowRight, IconClock, IconCurrency, IconPlus, IconTrash, IconUser } from './Icons';

interface BookingFormProps {
    train: Train;
    searchParams: SearchParams;
    onBook: (booking: Booking) => void;
    onBack: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ train, searchParams, onBook, onBack }) => {
    const [passengers, setPassengers] = useState<Passenger[]>([{ name: '', age: 18, gender: 'Male' }]);
    const [error, setError] = useState<string | null>(null);

    const handlePassengerChange = <K extends keyof Passenger>(index: number, field: K, value: Passenger[K]) => {
        const newPassengers = [...passengers];
        newPassengers[index][field] = value;
        setPassengers(newPassengers);
    };

    const addPassenger = () => {
        if (passengers.length < train.seatsAvailable && passengers.length < 6) {
             setPassengers([...passengers, { name: '', age: 18, gender: 'Male' }]);
        } else if (passengers.length >= train.seatsAvailable) {
            setError('Cannot add more passengers than available seats.');
        } else {
             setError('A maximum of 6 passengers can be booked at a time.');
        }
    };

    const removePassenger = (index: number) => {
        if (passengers.length > 1) {
            const newPassengers = passengers.filter((_, i) => i !== index);
            setPassengers(newPassengers);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (passengers.some(p => !p.name.trim() || p.age <= 0)) {
            setError('Please fill in all passenger details correctly.');
            return;
        }

        const booking: Booking = {
            pnr: `RP${Date.now()}`.slice(0, 10),
            train,
            passengers,
            dateOfJourney: searchParams.date,
            totalFare: train.fare * passengers.length,
        };
        onBook(booking);
    };
    
    const totalFare = train.fare * passengers.length;

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Passenger Details</h2>
                    <form onSubmit={handleSubmit}>
                        {passengers.map((p, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 border p-4 rounded-md mb-4 relative">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" value={p.name} onChange={e => handlePassengerChange(index, 'name', e.target.value)} placeholder="Full Name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Age</label>
                                    <input type="number" value={p.age} onChange={e => handlePassengerChange(index, 'age', parseInt(e.target.value) || 0)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" min="1" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select value={p.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value as Passenger['gender'])} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                {passengers.length > 1 && (
                                    <button type="button" onClick={() => removePassenger(index)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                                        <IconTrash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        
                        <div className="flex justify-between items-center mt-4">
                            <button type="button" onClick={addPassenger} className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 font-semibold bg-blue-100 rounded-md hover:bg-blue-200">
                                <IconPlus className="w-4 h-4" /> Add Passenger
                            </button>
                             <button type="button" onClick={onBack} className="px-4 py-2 text-sm text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300">
                                Back to Results
                            </button>
                        </div>

                         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        
                        <div className="border-t mt-6 pt-6">
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg text-slate-500">Total Fare</p>
                                    <p className="text-3xl font-bold text-blue-600 flex items-center gap-2"><IconCurrency className="w-7 h-7" /> {totalFare.toFixed(2)}</p>
                                </div>
                                <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center gap-2">
                                    Confirm Booking <IconArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                     <h3 className="text-xl font-bold border-b pb-2 mb-4">Journey Summary</h3>
                     <h4 className="font-bold text-lg">{train.trainName}</h4>
                     <p className="text-sm text-slate-500 mb-4">#{train.trainNumber}</p>
                     
                     <div className="flex justify-between items-center text-sm mb-2">
                        <span>{train.departureStation}</span>
                        <IconArrowRight className="w-4 h-4 text-slate-400" />
                        <span>{train.arrivalStation}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                        <span className="font-semibold">{train.departureTime}</span>
                        <span className="font-semibold">{train.arrivalTime}</span>
                     </div>
                     
                     <div className="text-sm space-y-2">
                        <p className="flex justify-between"><span>Date:</span> <span className="font-medium">{new Date(searchParams.date).toDateString()}</span></p>
                        <p className="flex justify-between"><span>Passengers:</span> <span className="font-medium flex items-center gap-1"><IconUser className="w-4 h-4" /> {passengers.length}</span></p>
                        <p className="flex justify-between"><span>Duration:</span> <span className="font-medium flex items-center gap-1"><IconClock className="w-4 h-4" />{train.duration}</span></p>
                     </div>
                </div>
            </div>
        </div>
    );
};
