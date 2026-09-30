import { MongoClient } from 'mongodb';

// Connection caching across serverless invocations
let cachedClient = null;
let cachedDb = null;

/**
 * Connect to MongoDB Atlas with connection caching.
 */
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
  }

  const dbName = process.env.MONGODB_DB_NAME || 'casa_siete';

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Sanitize URI for safe logging
  const safeUri = uri.replace(/\/\/(.*):(.*)@/, '//***:***@');
  console.log(`[Backend Log] Connecting to MongoDB Atlas at ${safeUri}, DB: ${dbName}`);

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  console.log('[Backend Log] Successfully established connection to MongoDB Atlas');
  return { client, db };
}

export const handler = async (event, context) => {
  // Always allow CORS for preflight options or post requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS Preflight OK' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed. Please send a POST request.' }),
    };
  }

  const requestTime = new Date().toISOString();
  console.log(`[Backend Log] [${requestTime}] Registration request received from client IP: ${event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'}`);

  try {
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (parseErr) {
        console.error('[Backend Log] Failed to parse request body JSON:', parseErr.message);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid JSON payload.' }),
        };
      }
    }

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const countrySelect = typeof body.countrySelect === 'string' ? body.countrySelect.trim() : '';
    const customCountryCode = typeof body.customCountryCode === 'string' ? body.customCountryCode.trim() : '';

    // Determine final phone code and number
    let countryCode = countrySelect;
    if (countrySelect === 'other') {
      countryCode = customCountryCode;
    }

    let fullPhone = rawPhone;
    if (rawPhone && countryCode) {
      fullPhone = `${countryCode} ${rawPhone}`;
    }

    // Validation checks
    if (!email && !rawPhone) {
      console.warn('[Backend Log] Validation failed: Neither email nor phone was provided.');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Por favor, ingresa al menos un correo electrónico o un número de teléfono.' }),
      };
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn(`[Backend Log] Validation failed: Invalid email format provided (${email}).`);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Por favor, ingresa un correo electrónico válido.' }),
      };
    }

    // Prepare document
    const collectionName = process.env.MONGODB_COLLECTION || 'registrations';
    const document = {
      fullName: fullName || null,
      email: email || null,
      phone: rawPhone || null,
      countryCode: countryCode || null,
      fullPhone: fullPhone || null,
      createdAt: new Date(),
      source: 'web_form',
      userAgent: event.headers['user-agent'] || null,
      clientIp: event.headers['client-ip'] || event.headers['x-forwarded-for'] || null,
    };

    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    console.log(`[Backend Log] Storing response in database collection: "${collectionName}"...`);
    const result = await collection.insertOne(document);

    console.log(`[Backend Log] Successfully inserted document ID: ${result.insertedId}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: '¡Registro guardado exitosamente!',
        id: result.insertedId.toString(),
      }),
    };
  } catch (error) {
    console.error('[Backend Log] Error processing registration:', error.stack || error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error interno del servidor al procesar la solicitud. Por favor intenta más tarde.',
      }),
    };
  }
};
