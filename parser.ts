import ICAL from 'ical.js';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: string;
  listingId: string;
}

export interface Listing {
  id: string;
  name: string;
  icalUrl: string;
  color: string;
  lastSynced?: Date;
}

/**
 * Fetches iCalendar data from a URL
 * @param url The iCalendar URL to fetch
 * @returns The raw iCalendar data as a string
 */
export async function fetchICalData(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch iCalendar data: ${response.status} ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching iCalendar data:', error);
    throw error;
  }
}

/**
 * Parses iCalendar data into calendar events
 * @param icalData The raw iCalendar data
 * @param listingId The ID of the listing the events belong to
 * @returns An array of calendar events
 */
export function parseICalData(icalData: string, listingId: string): CalendarEvent[] {
  try {
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents('vevent');
    
    return events.map((event) => {
      const icalEvent = new ICAL.Event(event);
      const id = icalEvent.uid || `${listingId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const title = icalEvent.summary || 'Unavailable';
      const start = icalEvent.startDate.toJSDate();
      const end = icalEvent.endDate.toJSDate();
      const status = icalEvent.status || 'CONFIRMED';
      
      return {
        id,
        title,
        start,
        end,
        allDay: true, // Airbnb events are typically all-day events
        status,
        listingId
      };
    });
  } catch (error) {
    console.error('Error parsing iCalendar data:', error);
    throw error;
  }
}

/**
 * Fetches and parses iCalendar data for a listing
 * @param listing The listing to fetch calendar data for
 * @returns An array of calendar events
 */
export async function getListingEvents(listing: Listing): Promise<CalendarEvent[]> {
  try {
    const icalData = await fetchICalData(listing.icalUrl);
    return parseICalData(icalData, listing.id);
  } catch (error) {
    console.error(`Error getting events for listing ${listing.id}:`, error);
    return [];
  }
}

/**
 * Fetches and parses iCalendar data for multiple listings
 * @param listings The listings to fetch calendar data for
 * @returns An array of calendar events from all listings
 */
export async function getAllListingsEvents(listings: Listing[]): Promise<CalendarEvent[]> {
  try {
    const eventsPromises = listings.map(listing => getListingEvents(listing));
    const eventsArrays = await Promise.all(eventsPromises);
    return eventsArrays.flat();
  } catch (error) {
    console.error('Error getting events for all listings:', error);
    return [];
  }
}
