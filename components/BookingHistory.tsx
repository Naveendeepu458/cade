
import React from 'react';
import type { Booking } from '../types';
import { IconTicket } from './Icons';

interface BookingHistoryProps {
    bookings: Booking[];
}

export const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">My Bookings</h2>
            {bookings.length > 0 ? (
                <div className="space-y-4">
                    {bookings.slice().reverse().map(booking => (
                        <div key={booking.pnr} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-slate-500">PNR</p>
                                    <p className="font-mono font-bold text-lg text-blue-600">{booking.pnr}</p>
                                </div>
                                <div className="text-right">
                                     <p className="text-sm text-slate-500">Date</p>
                                     <p className="font-semibold">{new Date(booking.dateOfJourney).toDateString()}</p>
                                </div>
                            </div>
                            <div className="border-t my-4"></div>
                            <div>
                                <p className="font-bold">{booking.train.trainName} (#{booking.train.trainNumber})</p>
                                <p className="text-sm text-slate-600">
                                    {booking.train.departureStation} ({booking.train.departureTime}) to {booking.train.arrivalStation} ({booking.train.arrivalTime})
                                </p>
                                <p className="text-sm text-slate-500 mt-2">
                                    {booking.passengers.length} Passenger(s) - Total Fare: ₹{booking.totalFare.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-white rounded-lg shadow-md">
                    <IconTicket className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700">No bookings yet.</h3>
                    <p className="text-slate-500 mt-2">Your booked tickets will appear here.</p>
                </div>
            )}
        </div>
    );
};
