-- Create database schema for cultural AI platform

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
    content_type VARCHAR(50) NOT NULL, -- story, proverb, recipe, festival, song
    language_code VARCHAR(10) REFERENCES languages(code),
    region VARCHAR(100),
    tags TEXT[], -- Array of tags
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
    data_type VARCHAR(20) NOT NULL, -- text, audio, image
    language_code VARCHAR(10) REFERENCES languages(code),
    category VARCHAR(50), -- news, literature, conversation, technical, cultural
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
    role VARCHAR(20) NOT NULL, -- user, assistant
    content TEXT NOT NULL,
    language_code VARCHAR(10) REFERENCES languages(code),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table for tracking usage
CREATE TABLE IF NOT EXISTS usage_analytics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    language_code VARCHAR(10) REFERENCES languages(code),
    conversations_count INTEGER DEFAULT 0,
    new_users_count INTEGER DEFAULT 0,
    data_contributions_count INTEGER DEFAULT 0,
    cultural_content_count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cultural_content_language ON cultural_content(language_code);
CREATE INDEX IF NOT EXISTS idx_cultural_content_type ON cultural_content(content_type);
CREATE INDEX IF NOT EXISTS idx_cultural_content_region ON cultural_content(region);
CREATE INDEX IF NOT EXISTS idx_language_data_language ON language_data(language_code);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_date ON usage_analytics(date);
