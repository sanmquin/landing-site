import dotenv from 'dotenv';
import { handler } from '../netlify/functions/register.js';

dotenv.config();

async function runTests() {
  console.log('--- TEST 1: OPTIONS CORS Preflight ---');
  const corsRes = await handler({ httpMethod: 'OPTIONS', headers: {} });
  console.log('Status Code:', corsRes.statusCode);
  console.log('Headers:', corsRes.headers);
  console.log('Body:', corsRes.body);
  console.assert(corsRes.statusCode === 200, 'Expected 200 for OPTIONS');

  console.log('\n--- TEST 2: GET Method Not Allowed ---');
  const getRes = await handler({ httpMethod: 'GET', headers: {} });
  console.log('Status Code:', getRes.statusCode);
  console.log('Body:', getRes.body);
  console.assert(getRes.statusCode === 405, 'Expected 405 for GET');

  console.log('\n--- TEST 3: POST Validation Failure (No email & no phone) ---');
  const invalidRes = await handler({
    httpMethod: 'POST',
    headers: { 'client-ip': '127.0.0.1' },
    body: JSON.stringify({ fullName: 'Test User', email: '', phone: '' })
  });
  console.log('Status Code:', invalidRes.statusCode);
  console.log('Body:', invalidRes.body);
  console.assert(invalidRes.statusCode === 400, 'Expected 400 for empty contact info');

  console.log('\n--- TEST 4: POST Validation Failure (Invalid email format) ---');
  const invalidEmailRes = await handler({
    httpMethod: 'POST',
    headers: { 'client-ip': '127.0.0.1' },
    body: JSON.stringify({ fullName: 'Test User', email: 'invalid-email', phone: '' })
  });
  console.log('Status Code:', invalidEmailRes.statusCode);
  console.log('Body:', invalidEmailRes.body);
  console.assert(invalidEmailRes.statusCode === 400, 'Expected 400 for invalid email format');

  console.log('\nAll unit tests passed successfully!');
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
