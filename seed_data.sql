-- Seed Data for Medical Assist MVP
-- Run this script in the Supabase SQL Editor to populate the database with realistic providers.

-- ==========================================
-- 1. RANCHI (Pilot City - More Clinics)
-- ==========================================
INSERT INTO providers (name, slug, type, city, lat, lng, languages_spoken, specialties, is_verified, phone, fee_range_min, fee_range_max, open_24_7)
VALUES 
('Ranchi Trust Clinic', 'ranchi-trust-clinic', 'clinic', 'Ranchi', 23.3600, 85.3250, '{English, Hindi}', '{General Practice, Family Medicine}', true, '+91 651 333 4444', 300, 600, false),
('City Care Pharmacy', 'city-care-pharmacy-ranchi', 'pharmacy', 'Ranchi', 23.3550, 85.3100, '{English, Hindi}', '{General}', true, '+91 651 555 6666', 0, 0, true)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 2. GOA (Major Tourist Hotspot)
-- ==========================================
INSERT INTO providers (name, slug, type, city, lat, lng, languages_spoken, specialties, is_verified, phone, fee_range_min, fee_range_max, open_24_7)
VALUES 
('Manipal Hospital Goa', 'manipal-hospital-goa', 'hospital', 'Goa', 15.4541, 73.8358, '{English, Hindi, Konkani, Russian}', '{Emergency, Orthopedics, Cardiology}', true, '+91 832 666 6666', 1000, 2000, true),
('Calangute Tourist Clinic', 'calangute-tourist-clinic', 'clinic', 'Goa', 15.5413, 73.7625, '{English, Russian}', '{General Practice, First Aid, Tropical Medicine}', true, '+91 832 222 3333', 500, 1000, false),
('Anjuna 24/7 Medicos', 'anjuna-medicos-goa', 'pharmacy', 'Goa', 15.5833, 73.7410, '{English}', '{Pharmacy}', true, '+91 832 444 5555', 0, 0, true)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 3. MUMBAI
-- ==========================================
INSERT INTO providers (name, slug, type, city, lat, lng, languages_spoken, specialties, is_verified, phone, fee_range_min, fee_range_max, open_24_7)
VALUES 
('Lilavati Hospital', 'lilavati-hospital-mumbai', 'hospital', 'Mumbai', 19.0504, 72.8252, '{English, Hindi, Marathi, Gujarati}', '{Emergency, Neurology, Cardiology}', true, '+91 22 2666 6666', 1500, 3000, true),
('Bandra Family Clinic', 'bandra-family-clinic', 'clinic', 'Mumbai', 19.0596, 72.8295, '{English, Hindi}', '{General Practice, Pediatrics}', true, '+91 22 3333 4444', 800, 1500, false),
('Apollo Pharmacy Juhu', 'apollo-pharmacy-juhu', 'pharmacy', 'Mumbai', 19.1075, 72.8263, '{English, Hindi}', '{Pharmacy}', true, '+91 22 5555 6666', 0, 0, true)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 4. DELHI (Expanding)
-- ==========================================
INSERT INTO providers (name, slug, type, city, lat, lng, languages_spoken, specialties, is_verified, phone, fee_range_min, fee_range_max, open_24_7)
VALUES 
('Connaught Place Medical Center', 'cp-medical-center-delhi', 'clinic', 'New Delhi', 28.6304, 77.2177, '{English, Hindi}', '{General Practice, Travel Medicine}', true, '+91 11 2333 4444', 700, 1200, false),
('Fortis Escorts', 'fortis-escorts-delhi', 'hospital', 'New Delhi', 28.5583, 77.2764, '{English, Hindi}', '{Cardiology, Emergency, Surgery}', true, '+91 11 4713 5000', 1200, 2500, true),
('South Delhi 24/7 Pharmacy', 'south-delhi-pharmacy', 'pharmacy', 'New Delhi', 28.5355, 77.2410, '{English, Hindi}', '{Pharmacy}', true, '+91 11 5555 6666', 0, 0, true)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 5. BANGALORE
-- ==========================================
INSERT INTO providers (name, slug, type, city, lat, lng, languages_spoken, specialties, is_verified, phone, fee_range_min, fee_range_max, open_24_7)
VALUES 
('Manipal Hospital HAL', 'manipal-hospital-hal', 'hospital', 'Bangalore', 12.9592, 77.6485, '{English, Kannada, Hindi}', '{Emergency, Oncology, Orthopedics}', true, '+91 80 2502 4444', 1000, 2000, true),
('Indiranagar Poly Clinic', 'indiranagar-poly-clinic', 'clinic', 'Bangalore', 12.9784, 77.6408, '{English, Kannada}', '{General Practice, Dermatology}', true, '+91 80 3333 4444', 600, 1000, false),
('Koramangala Day/Night Pharmacy', 'koramangala-pharmacy', 'pharmacy', 'Bangalore', 12.9279, 77.6271, '{English, Hindi}', '{Pharmacy}', true, '+91 80 5555 6666', 0, 0, true)
ON CONFLICT (slug) DO NOTHING;



