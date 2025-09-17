const mongoose = require('mongoose');

const connectDB = async () => {
  // Fail fast instead of buffering model operations when DB is down
  mongoose.set('bufferCommands', false);
  let mongoURI = process.env.MONGODB_URI; // Atlas only; no local fallback

  const options = {
    // Keep these minimal; modern mongoose handles defaults well
    serverSelectionTimeoutMS: 10000,
    family: 4, // prefer IPv4 which avoids some DNS issues on Windows
  };

  // Ensure a database name is present; many Atlas URIs omit it which can cause issues
  try {
    if (mongoURI) {
      const uri = new URL(mongoURI);
      // URL.pathname is like '/dbName' or '/' if missing
      if (!uri.pathname || uri.pathname === '/') {
        // Default DB name; change if you prefer a different default
        uri.pathname = '/rebirth-of-a-queen';
        mongoURI = uri.toString();
      }
    }
  } catch (_) {
    // If parsing fails, leave URI as-is
  }

  // Safe visibility into env presence without leaking secrets
  const uriHint = !mongoURI
    ? 'undefined'
    : mongoURI.startsWith('mongodb+srv://')
      ? 'mongodb+srv://<redacted>'
      : mongoURI.startsWith('mongodb://')
        ? 'mongodb://<redacted>'
        : '<unknown-scheme>';
  console.log('🔐 MONGODB_URI detected:', uriHint);

  // Retry connect a few times to ride out transient DNS/IP whitelist propagation
  const maxAttempts = 5;
  const baseDelayMs = 1500;
  const tryConnect = async (label, uri) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        console.log(`🧩 [${label}] MongoDB connect attempt ${attempt}/${maxAttempts} ...`);
        const conn = await mongoose.connect(uri, options);
        console.log(`📦 [${label}] MongoDB Connected: ${conn.connection.host}`);
        return true;
      } catch (error) {
        console.error(`❌ [${label}] DB connect attempt ${attempt} failed:`, error.message);
        if (attempt < maxAttempts) {
          const wait = baseDelayMs * attempt; // simple linear backoff
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }
        return false;
      }
    }
  };

  // Try primary URI, then optional fallback (e.g., Standard Non-SRV) if provided
  const primaryOk = await tryConnect('primary', mongoURI);
  if (!primaryOk) {
    const fallbackURI = process.env.MONGODB_URI_FALLBACK;
    if (fallbackURI) {
      const ok = await tryConnect('fallback', fallbackURI);
      if (ok) return;
    }

    console.log('🔗 Attempted URI:', mongoURI);
    if (process.env.MONGODB_URI_FALLBACK) {
      console.log('🔗 Attempted Fallback URI: <provided>');
    }
    console.log('💡 Tips:');
    console.log(' - If using MongoDB Atlas, whitelist your IP and verify the SRV or use Standard connection string.');
    console.log(' - Ensure credentials are correct and URL-encoded.');

    if (process.env.ALLOW_START_WITHOUT_DB === 'true') {
      console.warn('⚠️  Continuing to start server without a DB connection (ALLOW_START_WITHOUT_DB=true).');
      return; // Do not exit; routes may still serve limited functionality
    }
    process.exit(1);
  }
};

module.exports = connectDB; 