
import React from 'react';
import type { Booking } from '../types';
import { IconCheckCircle, IconTrain, IconUser } from './Icons';

interface ConfirmationProps {
    booking: Booking;
    onNewBooking: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ booking, onNewBooking }) => {
    if (!booking) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Booking not found!</h2>
                <button onClick={onNewBooking} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start a New Booking
                </button>
            </div>
        );
    }
    
    const { pnr, train, passengers, dateOfJourney, totalFare } = booking;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <IconCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-extrabold text-slate-800">Booking Confirmed!</h2>
                <p className="text-slate-500 mt-2">Your ticket has been successfully generated. Happy Journey!</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-t-8 border-blue-600 overflow-hidden">
                <div className="p-6 bg-slate-50 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-slate-500">PNR Number</p>
                        <p className="text-2xl font-mono font-bold text-blue-700 tracking-wider">{pnr}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 text-right">Total Fare</p>
                        <p className="text-2xl font-bold text-slate-800">₹{totalFare.toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <IconTrain className="w-8 h-8 text-blue-600" />
                        <div>
                            <h3 className="text-xl font-bold">{train.trainName}</h3>
                            <p className="text-sm text-slate-500">#{train.trainNumber}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center my-6">
                        <div>
                            <p className="font-bold text-lg">{train.departureTime}</p>
                            <p className="text-slate-500">{train.departureStation}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-full border-b-2 border-dotted border-slate-300"></div>
                        </div>
                        <div>
                             <p className="font-bold text-lg">{train.arrivalTime}</p>
                            <p className="text-slate-500">{train.arrivalStation}</p>
                        </div>
                    </div>
                     <p className="text-center font-medium text-slate-600 mb-6">Date of Journey: {new Date(dateOfJourney).toDateString()}</p>
                    
                    <div className="border-t pt-4">
                        <h4 className="font-bold mb-3 flex items-center gap-2"><IconUser className="w-5 h-5 text-slate-500" /> Passenger Details</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 text-sm text-slate-600">
                                    <tr>
                                        <th className="p-2 rounded-l-md">#</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Age</th>
                                        <th className="p-2 rounded-r-md">Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passengers.map((p, i) => (
                                        <tr key={i} className="border-b last:border-b-0">
                                            <td className="p-2">{i + 1}</td>
                                            <td className="p-2 font-medium">{p.name}</td>
                                            <td className="p-2">{p.age}</td>
                                            <td className="p-2">{p.gender}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
             <div className="text-center mt-8">
                <button onClick={onNewBooking} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Book Another Ticket
                </button>
            </div>
        </div>
    );
};
