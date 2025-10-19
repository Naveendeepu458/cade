import React from 'react';
import type { Train, SearchParams } from '../types';
import { IconArrowRight, IconClock, IconCurrency, IconSeat, IconTrain } from './Icons';

interface TrainResultsProps {
    trains: Train[];
    searchParams: SearchParams;
    onSelectTrain: (train: Train) => void;
    onNewSearch: () => void;
}

const TrainCard: React.FC<{ train: Train; onSelect: () => void }> = ({ train, onSelect }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row justify-between items-stretch">
        <div className="p-5 flex-grow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">{train.trainName}</h3>
                    <p className="text-sm text-slate-500">#{train.trainNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600 flex items-center gap-1"><IconCurrency className="w-5 h-5" /> {train.fare.toFixed(2)}</p>
                    <p className="text-sm text-slate-500">per person</p>
                </div>
            </div>
            
            <div className="flex items-center justify-between text-slate-700">
                <div className="text-center">
                    <p className="font-semibold text-lg">{train.departureTime}</p>
                    <p className="text-sm text-slate-500">{train.departureStation}</p>
                </div>
                <div className="flex-grow flex items-center justify-center mx-4">
                    <div className="w-full border-b-2 border-dotted border-slate-300 relative">
                       <IconTrain className="w-5 h-5 text-slate-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1" />
                    </div>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-lg">{train.arrivalTime}</p>
                    <p className="text-sm text-slate-500">{train.arrivalStation}</p>
                </div>
            </div>
             <div className="flex justify-center items-center text-sm text-slate-500 mt-3 gap-1">
                <IconClock className="w-4 h-4" />
                <span>{train.duration}</span>
            </div>
        </div>
        <div className="bg-slate-50 p-5 flex flex-col justify-center items-center sm:w-48 border-t sm:border-t-0 sm:border-l">
            <div className="flex items-center gap-2 text-green-600 font-semibold mb-3">
                <IconSeat className="w-5 h-5" />
                <span>{train.seatsAvailable} Seats Available</span>
            </div>
            <button onClick={onSelect} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Book Now
            </button>
        </div>
    </div>
);

export const TrainResults: React.FC<TrainResultsProps> = ({ trains, onSelectTrain, searchParams, onNewSearch }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Available Trains</h2>
                    <p className="text-slate-500">{searchParams.from} to {searchParams.to} on {new Date(searchParams.date).toDateString()}</p>
                </div>
                <button onClick={onNewSearch} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    New Search
                </button>
            </div>

            {trains.length > 0 ? (
                <div className="space-y-4">
                    {trains.map(train => (
                        <TrainCard key={train.trainNumber} train={train} onSelect={() => onSelectTrain(train)} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-slate-600 text-lg">No trains found for the selected route and date.</p>
                </div>
            )}
        </div>
    );
};