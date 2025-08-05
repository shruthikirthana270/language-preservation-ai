#!/bin/bash

# Setup script for Swecha AI Database on Render PostgreSQL
# This script will create the database schema and seed initial data

echo "🚀 Setting up Swecha AI Database..."

# Database connection details
DB_HOST="dpg-d2919rali9vc739d9ab0-a.oregon-postgres.render.com"
DB_PORT="5432"
DB_NAME="swecha_ai_db"
DB_USER="shruthi"
DB_PASSWORD="4AudBTtgmoe2c2MHEgnQV7mFhukt1AlV"

# Full connection string
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "📊 Creating database schema..."

# Create tables
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << 'EOF'

-- Create database schema for Swecha AI platform
-- Languages table
CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100) NOT NULL,
    speakers_count BIGINT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    preferred_language VARCHAR(10) REFERENCES languages(code),
    contributions_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cultural content table
CREATE TABLE IF NOT EXISTS cultural_content (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    language_code VARCHAR(10) REFERENCES languages(code),
    region VARCHAR(100),
    tags TEXT[],
    contributor_id INTEGER REFERENCES users(id),
    likes_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Language data samples table
CREATE TABLE IF NOT EXISTS language_data (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    data_type VARCHAR(20) NOT NULL,
    language_code VARCHAR(10) REFERENCES languages(code),
    category VARCHAR(50),
    contributor_id INTEGER REFERENCES users(id),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    language_code VARCHAR(10) REFERENCES languages(code),
    message_count INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    language_code VARCHAR(10) REFERENCES languages(code),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE IF NOT EXISTS usage_analytics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    language_code VARCHAR(10) REFERENCES languages(code),
    conversations_count INTEGER DEFAULT 0,
    new_users_count INTEGER DEFAULT 0,
    data_contributions_count INTEGER DEFAULT 0,
    cultural_content_count INTEGER DEFAULT 0
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cultural_content_language ON cultural_content(language_code);
CREATE INDEX IF NOT EXISTS idx_cultural_content_type ON cultural_content(content_type);
CREATE INDEX IF NOT EXISTS idx_language_data_language ON language_data(language_code);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id);

EOF

echo "✅ Database schema created successfully!"

echo "🌱 Seeding initial data..."

# Seed data
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << 'EOF'

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
('mai', 'Maithili', 'मैथिली', 13000000, 'endangered')
ON CONFLICT (code) DO NOTHING;

-- Insert sample users
INSERT INTO users (username, email, preferred_language, contributions_count) VALUES
('swecha_admin', 'admin@swecha.org', 'hi', 0),
('cultural_enthusiast', 'user1@swecha.org', 'hi', 47),
('heritage_keeper', 'user2@swecha.org', 'bn', 32),
('tradition_lover', 'user3@swecha.org', 'ta', 28),
('story_teller', 'user4@swecha.org', 'mr', 19),
('language_advocate', 'user5@swecha.org', 'te', 15)
ON CONFLICT (username) DO NOTHING;

-- Insert sample cultural content
INSERT INTO cultural_content (title, content, content_type, language_code, region, tags, contributor_id, likes_count) VALUES
('The Clever Birbal', 'Once upon a time, in the court of Emperor Akbar, there lived a wise minister named Birbal. Known for his wit and intelligence, Birbal could solve any problem with his clever thinking...', 'story', 'hi', 'North India', ARRAY['wisdom', 'humor', 'historical'], 2, 234),
('Unity in Diversity', 'যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই, পাইলেও পাইতে পার অমূল্য রতন - This Bengali proverb teaches us that we should not judge things by their appearance.', 'proverb', 'bn', 'West Bengal', ARRAY['wisdom', 'unity'], 3, 156),
('Traditional Sambar Recipe', 'Sambar is a traditional South Indian lentil curry that forms the backbone of Tamil cuisine. Made with toor dal, tamarind, and a special blend of spices...', 'recipe', 'ta', 'Tamil Nadu', ARRAY['food', 'traditional', 'vegetarian'], 4, 189),
('Gudi Padwa Celebration', 'Gudi Padwa marks the traditional new year for Marathi people, celebrated with great enthusiasm across Maharashtra...', 'festival', 'mr', 'Maharashtra', ARRAY['festival', 'new year', 'tradition'], 5, 267),
('Rabindra Sangeet', 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি - This immortal song by Rabindranath Tagore expresses deep love for Bengal...', 'song', 'bn', 'West Bengal', ARRAY['music', 'poetry', 'rabindranath'], 3, 312)
ON CONFLICT DO NOTHING;

-- Insert sample analytics data
INSERT INTO usage_analytics (date, language_code, conversations_count, new_users_count, data_contributions_count, cultural_content_count) VALUES
(CURRENT_DATE - INTERVAL '30 days', 'hi', 2500, 120, 450, 25),
(CURRENT_DATE - INTERVAL '30 days', 'bn', 1800, 85, 320, 18),
(CURRENT_DATE - INTERVAL '30 days', 'ta', 1200, 65, 280, 15),
(CURRENT_DATE - INTERVAL '15 days', 'hi', 2800, 140, 520, 28),
(CURRENT_DATE - INTERVAL '15 days', 'bn', 2100, 95, 380, 22),
(CURRENT_DATE, 'hi', 3200, 160, 600, 32),
(CURRENT_DATE, 'bn', 2400, 110, 420, 25)
ON CONFLICT DO NOTHING;

EOF

echo "✅ Initial data seeded successfully!"
echo "🎉 Swecha AI Database setup complete!"
echo ""
echo "📋 Connection Details:"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   Database: $DB_NAME"
echo "   Username: $DB_USER"
echo ""
echo "🔗 You can now connect your application using:"
echo "   DATABASE_URL=$DATABASE_URL"
