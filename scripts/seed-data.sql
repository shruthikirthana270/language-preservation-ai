-- Seed initial data for the cultural AI platform

-- Insert supported languages
INSERT INTO languages (code, name, native_name, speakers_count, status) VALUES
('hi', 'Hindi', 'हिन्दी', 600000000, 'active'),
('bn', 'Bengali', 'বাংলা', 300000000, 'active'),
('te', 'Telugu', 'తెలుగు', 95000000, 'active'),
('mr', 'Marathi', 'मराठी', 83000000, 'active'),
('ta', 'Tamil', 'தமிழ்', 78000000, 'active'),
('gu', 'Gujarati', 'ગુજરાતી', 56000000, 'active'),
('kn', 'Kannada', 'ಕನ್ನಡ', 44000000, 'active'),
('ml', 'Malayalam', 'മലയാളം', 35000000, 'active'),
('pa', 'Punjabi', 'ਪੰਜਾਬੀ', 33000000, 'active'),
('or', 'Odia', 'ଓଡ଼ିଆ', 38000000, 'developing'),
('as', 'Assamese', 'অসমীয়া', 15000000, 'developing'),
('mai', 'Maithili', 'मैथिली', 13000000, 'endangered');

-- Insert sample users
INSERT INTO users (username, email, preferred_language, contributions_count) VALUES
('cultural_enthusiast', 'user1@example.com', 'hi', 47),
('heritage_keeper', 'user2@example.com', 'bn', 32),
('tradition_lover', 'user3@example.com', 'ta', 28),
('story_teller', 'user4@example.com', 'mr', 19),
('language_advocate', 'user5@example.com', 'te', 15);

-- Insert sample cultural content
INSERT INTO cultural_content (title, content, content_type, language_code, region, tags, contributor_id, likes_count) VALUES
('The Clever Birbal', 'Once upon a time, in the court of Emperor Akbar, there lived a wise minister named Birbal. Known for his wit and intelligence, Birbal could solve any problem with his clever thinking...', 'story', 'hi', 'North India', ARRAY['wisdom', 'humor', 'historical'], 1, 234),

('Unity in Diversity', 'যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই, পাইলেও পাইতে পার অমূল্য রতন - This Bengali proverb teaches us that we should not judge things by their appearance, as valuable treasures might be hidden beneath ordinary exteriors.', 'proverb', 'bn', 'West Bengal', ARRAY['wisdom', 'unity'], 2, 156),

('Traditional Sambar Recipe', 'Sambar is a traditional South Indian lentil curry that forms the backbone of Tamil cuisine. Made with toor dal, tamarind, and a special blend of spices, this nutritious dish is served with rice, idli, or dosa...', 'recipe', 'ta', 'Tamil Nadu', ARRAY['food', 'traditional', 'vegetarian'], 3, 189),

('Gudi Padwa Celebration', 'Gudi Padwa marks the traditional new year for Marathi people, celebrated with great enthusiasm across Maharashtra. The festival symbolizes the victory of good over evil and the arrival of spring...', 'festival', 'mr', 'Maharashtra', ARRAY['festival', 'new year', 'tradition'], 4, 267),

('Rabindra Sangeet', 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি - This immortal song by Rabindranath Tagore expresses deep love for Bengal and later became the national anthem of Bangladesh...', 'song', 'bn', 'West Bengal', ARRAY['music', 'poetry', 'rabindranath'], 2, 312);

-- Insert sample language data
INSERT INTO language_data (content, data_type, language_code, category, contributor_id, verified) VALUES
('नमस्ते, आप कैसे हैं? आज का दिन कैसा है?', 'text', 'hi', 'conversation', 1, true),
('আজকের আবহাওয়া খুবই সুন্দর। বৃষ্টি হওয়ার সম্ভাবনা আছে।', 'text', 'bn', 'news', 2, true),
('இன்றைய தமிழ் இலக்கியத்தில் புதிய கண்ணோட்டங்கள் வளர்ந்து வருகின்றன।', 'text', 'ta', 'literature', 3, true),
('आजच्या तंत्रज्ञानाच्या युगात मराठी भाषेचे महत्व वाढत आहे।', 'text', 'mr', 'technical', 4, true),
('తెలుగు సాహిత్యంలో ఆధునిక కవిత్వం కొత్త దిశలు చూపిస్తోంది।', 'text', 'te', 'literature', 5, true);

-- Insert sample analytics data
INSERT INTO usage_analytics (date, language_code, conversations_count, new_users_count, data_contributions_count, cultural_content_count) VALUES
('2024-01-01', 'hi', 2500, 120, 450, 25),
('2024-01-01', 'bn', 1800, 85, 320, 18),
('2024-01-01', 'ta', 1200, 65, 280, 15),
('2024-01-01', 'mr', 900, 45, 200, 12),
('2024-01-01', 'te', 1100, 55, 250, 14),
('2024-02-01', 'hi', 2800, 140, 520, 28),
('2024-02-01', 'bn', 2100, 95, 380, 22),
('2024-02-01', 'ta', 1400, 75, 320, 18),
('2024-02-01', 'mr', 1050, 52, 230, 15),
('2024-02-01', 'te', 1300, 68, 290, 17);
