import React from 'react';
import { View } from '../types';
import { IconLogo, IconTicket } from './Icons';

interface HeaderProps {
    onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/60">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div 
                    className="flex items-center gap-2 cursor-pointer" 
                    onClick={() => onNavigate(View.SEARCH)}
                    aria-label="Go to homepage"
                >
                    <IconLogo className="h-8 w-8" />
                    <span className="text-2xl font-bold text-gray-800">RailPass</span>
                </div>
                <div className="flex items-center gap-4">
                     <button 
                        onClick={() => onNavigate(View.HISTORY)}
                        className="text-sm font-medium flex items-center gap-1.5 text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="View my bookings"
                    >
                        <IconTicket className="w-5 h-5" />
                        My Bookings
                    </button>
                    <button 
                        onClick={() => console.log('Login')} // Placeholder for login logic
                        className="text-sm font-medium border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition-colors text-gray-600"
                        aria-label="Login"
                    >
                        Login
                    </button>
                </div>
            </nav>
        </header>
    );
};
