import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');
  const identity = searchParams.get('identity') || `user_${Math.random().toString(36).substring(2, 7)}`;
  const role = searchParams.get('role') || 'publisher'; // 'publisher' | 'subscriber'

  if (!room) {
    return NextResponse.json({ error: 'Missing room parameter' }, { status: 400 });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: 'LiveKit credentials are not configured in .env.local' },
      { status: 500 }
    );
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      ttl: '12h',
    });

    const canPublish = role === 'publisher';
    const canSubscribe = true;

    at.addGrant({
      room,
      roomJoin: true,
      canPublish,
      canPublishData: true,
      canSubscribe,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl, identity, room });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to generate token' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room, identity, role } = body;

    if (!room) {
      return NextResponse.json({ error: 'Missing room parameter' }, { status: 400 });
    }

    const userIdentity = identity || `user_${Math.random().toString(36).substring(2, 7)}`;
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { error: 'LiveKit credentials are not configured in .env.local' },
        { status: 500 }
      );
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: userIdentity,
      ttl: '12h',
    });

    const canPublish = role === 'publisher';
    const canSubscribe = true;

    at.addGrant({
      room,
      roomJoin: true,
      canPublish,
      canPublishData: true,
      canSubscribe,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl, identity: userIdentity, room });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to generate token' }, { status: 500 });
  }
}
