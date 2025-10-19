import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { TrainResults } from './components/TrainResults';
import { BookingForm } from './components/BookingForm';
import { Confirmation } from './components/Confirmation';
import { BookingHistory } from './components/BookingHistory';
import { fetchTrains } from './services/geminiService';
import type { Train, Booking, SearchParams } from './types';
import { View } from './types';
import { Loader } from './components/Loader';
import { addRecentSearch } from './utils/localStorage';
import { getBookings, saveBookings } from './utils/bookingStorage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SEARCH);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [trains, setTrains] = useState<Train[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setSearchParams(params);
    addRecentSearch(params); // Save the search to localStorage
    try {
      const results = await fetchTrains(params.from, params.to, params.date);
      setTrains(results);
      setCurrentView(View.RESULTS);
    } catch (err) {
      setError('Failed to fetch train data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectTrain = useCallback((train: Train) => {
    setSelectedTrain(train);
    setCurrentView(View.BOOKING);
  }, []);

  const handleBooking = useCallback((booking: Booking) => {
    const updatedBookings = [...bookings, booking];
    saveBookings(updatedBookings); // Save bookings to localStorage
    setBookings(updatedBookings);
    setCurrentView(View.CONFIRMATION);
  }, [bookings]);

  const handleNavigate = (view: View) => {
    setError(null);
    setCurrentView(view);
  };
  
  const handleNewSearch = () => {
    setTrains([]);
    setSelectedTrain(null);
    setSearchParams(null);
    handleNavigate(View.SEARCH);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader message="Finding available trains for you..." />;
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                    onClick={() => handleNavigate(View.SEARCH)}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    switch (currentView) {
      case View.SEARCH:
        return <HomePage onSearch={handleSearch} />;
      case View.RESULTS:
        return <TrainResults trains={trains} onSelectTrain={handleSelectTrain} searchParams={searchParams!} onNewSearch={handleNewSearch} />;
      case View.BOOKING:
        if (selectedTrain && searchParams) {
          return <BookingForm train={selectedTrain} searchParams={searchParams} onBook={handleBooking} onBack={() => setCurrentView(View.RESULTS)} />;
        }
        return null;
      case View.CONFIRMATION:
        return <Confirmation booking={bookings[bookings.length - 1]} onNewBooking={handleNewSearch} />;
      case View.HISTORY:
        return <BookingHistory bookings={bookings} />;
      default:
        return <HomePage onSearch={handleSearch} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;