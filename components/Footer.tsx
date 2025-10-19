import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 mt-auto border-t">
            <div className="container mx-auto px-4 py-6 text-center">
                <p className="text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} RailPass. All rights reserved. A modern railway reservation system.
                </p>
            </div>
        </footer>
    );
};