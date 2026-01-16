import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xjifxxasxctccpslstgt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqaWZ4eGFzeGN0Y2Nwc2xzdGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NzA1NjUsImV4cCI6MjA4NDE0NjU2NX0.OX053zEx2SesTn-tipJ8p6aUA11n4bmno3oylyK1Jpw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);