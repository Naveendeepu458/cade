import React, { useState, useEffect } from 'react';
import { SearchForm } from './SearchForm';
import type { SearchParams } from '../types';
import { IconClock, IconEasyBooking, IconLocation, IconHistory } from './Icons';
import { getRecentSearches } from '../utils/localStorage';

interface HomePageProps {
  onSearch: (params: SearchParams) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200/80 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{children}</p>
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const [recentSearches, setRecentSearches] = useState<SearchParams[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSearchAndRefresh = (params: SearchParams) => {
    onSearch(params);
    // Refresh the list in case this search becomes the new most recent one
    setRecentSearches(getRecentSearches());
  };


  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
        Book Your Railway Journey
      </h1>
      <p className="text-gray-500 mb-10 text-lg">
        Fast, reliable, and hassle-free train ticket booking
      </p>

      <SearchForm onSearch={handleSearchAndRefresh} />
      
      {recentSearches.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                  <IconHistory className="w-6 h-6 text-gray-500" />
                  Recent Searches
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                  {recentSearches.map((search, index) => (
                      <button
                          key={index}
                          onClick={() => onSearch(search)}
                          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-200"
                          title={`Search for trains from ${search.from} to ${search.to} on ${search.date}`}
                      >
                          {search.from} &rarr; {search.to}
                      </button>
                  ))}
              </div>
          </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <FeatureCard
          icon={<div className="bg-indigo-100 text-indigo-500 rounded-lg p-3 inline-block"><IconEasyBooking className="w-8 h-8" /></div>}
          title="Easy Booking"
        >
          Book your train tickets in just a few simple steps
        </FeatureCard>
        <FeatureCard
          icon={<div className="bg-green-100 text-green-500 rounded-lg p-3 inline-block"><IconClock className="w-8 h-8" /></div>}
          title="Real-time Updates"
        >
          Check live seat availability and book instantly
        </FeatureCard>
        <FeatureCard
          icon={<div className="bg-purple-100 text-purple-500 rounded-lg p-3 inline-block"><IconLocation className="w-8 h-8" /></div>}
          title="Wide Network"
        >
          Access trains across multiple routes and destinations
        </FeatureCard>
      </div>
    </div>
  );
};