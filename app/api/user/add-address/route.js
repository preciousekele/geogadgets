import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Input validation helper
const validateAddressInput = (address) => {
  const errors = [];
  
  // Required fields validation
  const requiredFields = ['fullName', 'phoneNumber', 'pincode', 'area', 'city', 'state'];
  
  for (const field of requiredFields) {
    if (!address[field] || typeof address[field] !== 'string' || address[field].trim().length === 0) {
      errors.push(`${field} is required and must be a non-empty string`);
    }
  }
  
  // Specific validations
  if (address.fullName && (address.fullName.trim().length < 2 || address.fullName.trim().length > 100)) {
    errors.push('Full name must be between 2 and 100 characters');
  }
  
  if (address.phoneNumber && !/^\+?[\d\s\-\(\)]{7,15}$/.test(address.phoneNumber.trim())) {
    errors.push('Please enter a valid phone number');
  }
  
  if (address.pincode && !/^\d{4,10}$/.test(address.pincode.trim())) {
    errors.push('Please enter a valid pin code (4-10 digits)');
  }
  
  if (address.area && address.area.trim().length > 500) {
    errors.push('Address area cannot exceed 500 characters');
  }
  
  if (address.city && address.city.trim().length > 100) {
    errors.push('City name cannot exceed 100 characters');
  }
  
  if (address.state && address.state.trim().length > 100) {
    errors.push('State name cannot exceed 100 characters');
  }
  
  return errors;
};

// Sanitize input to prevent XSS
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export async function POST(request) {
  try {
    // Check authentication first
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Please sign up or log in to continue",
          requiresAuth: true 
        },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid request format" 
        },
        { status: 400 }
      );
    }
    
    const { address } = body;
    
    // Check if address object exists
    if (!address || typeof address !== 'object') {
      return NextResponse.json(
        { 
          success: false, 
          message: "Address information is required" 
        },
        { status: 400 }
      );
    }
    
    // Validate address input
    const validationErrors = validateAddressInput(address);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Please check your input: " + validationErrors.join(', '),
          errors: validationErrors 
        },
        { status: 400 }
      );
    }
    
    // Sanitize input data
    const sanitizedAddress = {
      fullName: sanitizeInput(address.fullName),
      phoneNumber: sanitizeInput(address.phoneNumber),
      pincode: sanitizeInput(address.pincode),
      area: sanitizeInput(address.area),
      city: sanitizeInput(address.city),
      state: sanitizeInput(address.state),
    };
    
    // Connect to database
    await connectDB();
    
    // Check if user already has too many addresses (rate limiting)
    const existingAddressCount = await Address.countDocuments({ userId });
    const MAX_ADDRESSES_PER_USER = 10; // Adjust as needed
    
    if (existingAddressCount >= MAX_ADDRESSES_PER_USER) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Maximum ${MAX_ADDRESSES_PER_USER} addresses allowed per user` 
        },
        { status: 429 }
      );
    }
    
    // Create new address with sanitized data
    const newAddress = await Address.create({
      ...sanitizedAddress,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Return success response (don't expose sensitive data)
    return NextResponse.json({ 
      success: true, 
      message: "Address added successfully",
      addressId: newAddress._id 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Add address error:', error);
    
    // Handle specific database errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false, 
          message: "Please check your input and try again" 
        },
        { status: 400 }
      );
    }
    
    if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: "This address already exists" 
        },
        { status: 409 }
      );
    }
    
    // Generic error response (don't expose internal errors)
    return NextResponse.json(
      { 
        success: false, 
        message: "Unable to add address. Please try again later." 
      },
      { status: 500 }
    );
  }
}