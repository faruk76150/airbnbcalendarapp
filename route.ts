import { NextRequest, NextResponse } from 'next/server';
import { getListings, addListing, getListingById, updateListing, deleteListing } from '@/lib/listings';

export async function GET() {
  try {
    const listings = getListings();
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error getting listings:', error);
    return NextResponse.json({ error: 'Failed to get listings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.icalUrl || !body.color) {
      return NextResponse.json(
        { error: 'Missing required fields: name, icalUrl, and color are required' },
        { status: 400 }
      );
    }
    
    const newListing = addListing({
      name: body.name,
      icalUrl: body.icalUrl,
      color: body.color
    });
    
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error('Error adding listing:', error);
    return NextResponse.json({ error: 'Failed to add listing' }, { status: 500 });
  }
}
