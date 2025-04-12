import { Listing } from '@/lib/ical/parser';

// In-memory storage for listings (would be replaced with database in production)
let listings: Listing[] = [];

/**
 * Generates a unique ID for a new listing
 * @returns A unique ID string
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Gets all listings
 * @returns Array of all listings
 */
export function getListings(): Listing[] {
  return [...listings];
}

/**
 * Gets a listing by ID
 * @param id The ID of the listing to get
 * @returns The listing or undefined if not found
 */
export function getListingById(id: string): Listing | undefined {
  return listings.find(listing => listing.id === id);
}

/**
 * Adds a new listing
 * @param listing The listing to add (without ID)
 * @returns The added listing with generated ID
 */
export function addListing(listing: Omit<Listing, 'id'>): Listing {
  const newListing: Listing = {
    ...listing,
    id: generateId(),
    lastSynced: new Date()
  };
  
  listings.push(newListing);
  return newListing;
}

/**
 * Updates an existing listing
 * @param id The ID of the listing to update
 * @param listing The updated listing data
 * @returns The updated listing or null if not found
 */
export function updateListing(id: string, listing: Partial<Listing>): Listing | null {
  const index = listings.findIndex(l => l.id === id);
  
  if (index === -1) {
    return null;
  }
  
  listings[index] = {
    ...listings[index],
    ...listing,
    id, // Ensure ID doesn't change
    lastSynced: new Date()
  };
  
  return listings[index];
}

/**
 * Deletes a listing
 * @param id The ID of the listing to delete
 * @returns True if deleted, false if not found
 */
export function deleteListing(id: string): boolean {
  const initialLength = listings.length;
  listings = listings.filter(listing => listing.id !== id);
  return listings.length < initialLength;
}

/**
 * Updates the last synced timestamp for a listing
 * @param id The ID of the listing to update
 * @returns The updated listing or null if not found
 */
export function updateListingSyncTime(id: string): Listing | null {
  return updateListing(id, { lastSynced: new Date() });
}
