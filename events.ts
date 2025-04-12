import { CalendarEvent } from '@/lib/ical/parser';

// In-memory storage for calendar events (would be replaced with database in production)
let events: CalendarEvent[] = [];

/**
 * Gets all calendar events
 * @returns Array of all calendar events
 */
export function getEvents(): CalendarEvent[] {
  return [...events];
}

/**
 * Gets calendar events for a specific listing
 * @param listingId The ID of the listing to get events for
 * @returns Array of calendar events for the listing
 */
export function getEventsByListingId(listingId: string): CalendarEvent[] {
  return events.filter(event => event.listingId === listingId);
}

/**
 * Updates the events cache with new events
 * @param newEvents The new events to store
 * @param listingId Optional listing ID to replace events only for that listing
 */
export function updateEvents(newEvents: CalendarEvent[], listingId?: string): void {
  if (listingId) {
    // Remove existing events for the listing
    events = events.filter(event => event.listingId !== listingId);
    // Add new events for the listing
    events = [...events, ...newEvents];
  } else {
    // Replace all events
    events = [...newEvents];
  }
}

/**
 * Clears all events
 */
export function clearEvents(): void {
  events = [];
}

/**
 * Clears events for a specific listing
 * @param listingId The ID of the listing to clear events for
 */
export function clearEventsByListingId(listingId: string): void {
  events = events.filter(event => event.listingId !== listingId);
}
