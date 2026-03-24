// Configuration for Supabase
// This file loads environment variables safely

const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  }
};

// Validate configuration
function validateConfig() {
  if (!config.supabase.url || !config.supabase.anonKey) {
    console.warn('⚠️ Supabase configuration is missing. Forms will show alerts only.');
    return false;
  }
  return true;
}

// Check if Supabase is properly configured
const isSupabaseConfigured = validateConfig();

// Export configuration
window.HOLYFAITH_CONFIG = {
  ...config,
  isSupabaseConfigured
};

console.log('✓ Configuration loaded', isSupabaseConfigured ? '(Supabase enabled)' : '(Supabase disabled)');
