import type { SearchParams } from '../types';

const RECENT_SEARCHES_KEY = 'railpass_recent_searches';
const MAX_RECENT_SEARCHES = 5;

/**
 * Retrieves the list of recent searches from localStorage.
 * @returns An array of SearchParams objects or an empty array.
 */
export const getRecentSearches = (): SearchParams[] => {
    try {
        const item = window.localStorage.getItem(RECENT_SEARCHES_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Error reading recent searches from localStorage", error);
        return [];
    }
};

/**
 * Adds a new search to the list of recent searches in localStorage.
 * It prevents duplicates and limits the list to a maximum size.
 * @param search The new search parameters to add.
 */
export const addRecentSearch = (search: SearchParams): void => {
    try {
        const searches = getRecentSearches();
        
        // Remove any existing identical search to avoid duplicates and move the new one to the top.
        const filteredSearches = searches.filter(
            s => !(s.from === search.from && s.to === search.to && s.date === search.date)
        );

        // Add the new search to the beginning of the array.
        const newSearches = [search, ...filteredSearches];

        // Limit the number of recent searches stored.
        const limitedSearches = newSearches.slice(0, MAX_RECENT_SEARCHES);

        window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limitedSearches));
    } catch (error) {
        console.error("Error saving recent search to localStorage", error);
    }
};