import type { Booking } from '../types';

const BOOKINGS_KEY = 'railpass_bookings';

/**
 * Retrieves the list of bookings from localStorage.
 * @returns An array of Booking objects or an empty array if none are found or an error occurs.
 */
export const getBookings = (): Booking[] => {
    try {
        const item = window.localStorage.getItem(BOOKINGS_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Error reading bookings from localStorage", error);
        return [];
    }
};

/**
 * Saves the list of bookings to localStorage.
 * @param bookings The array of Booking objects to save.
 */
export const saveBookings = (bookings: Booking[]): void => {
    try {
        const data = JSON.stringify(bookings);
        window.localStorage.setItem(BOOKINGS_KEY, data);
    } catch (error) {
        console.error("Error saving bookings to localStorage", error);
    }
};
