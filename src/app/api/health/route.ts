import { NextResponse } from 'next/server';

interface HealthResponse {
  status: string; 
  timestamp: string;
  service: string;
  uptime: number;
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const healthData: HealthResponse = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'meedl-app',
    uptime: process.uptime()
  };
  
  const response = NextResponse.json(healthData);
  
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('X-Health-Check', 'true');
  
  return response;
}

export const dynamic = 'force-dynamic';