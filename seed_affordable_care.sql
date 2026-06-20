-- Seed Data for Affordable & Government Care

INSERT INTO providers (name, slug, type, city, lat, lng, languages_spoken, specialties, is_verified, phone, fee_range_min, fee_range_max, open_24_7)
VALUES 
-- NEW DELHI
('AIIMS New Delhi (Government)', 'aiims-new-delhi', 'hospital', 'New Delhi', 28.5672, 77.2100, '{English, Hindi}', '{Emergency, Oncology, Cardiology, General Medicine}', true, '+91 11 2658 8500', 0, 50, true),
('Safdarjung Hospital (Govt)', 'safdarjung-hospital-delhi', 'hospital', 'New Delhi', 28.5684, 77.2065, '{English, Hindi}', '{Trauma, Orthopedics, General Surgery}', true, '+91 11 2616 5060', 0, 50, true),

-- RANCHI
('RIMS Ranchi (Government)', 'rims-ranchi', 'hospital', 'Ranchi', 23.3852, 85.3371, '{English, Hindi}', '{Emergency, General Medicine, Pediatrics}', true, '+91 651 254 1533', 0, 50, true),
('Namkum Rural Health Clinic', 'namkum-rural-clinic-ranchi', 'clinic', 'Ranchi', 23.3444, 85.3725, '{Hindi, Sadri}', '{Primary Care, Vaccinations}', true, '+91 651 222 0000', 0, 20, false),

-- GOA
('Goa Medical College (GMC)', 'gmc-bambolim-goa', 'hospital', 'Goa', 15.4593, 73.8566, '{English, Konkani, Hindi}', '{Emergency, Surgery, General Medicine}', true, '+91 832 245 8728', 0, 50, true),
('Candolim Rural Dispensary', 'candolim-dispensary-goa', 'clinic', 'Goa', 15.5186, 73.7663, '{Konkani, English}', '{First Aid, General Practice}', true, '+91 832 111 0000', 0, 20, false),

-- MUMBAI
('KEM Hospital (Government)', 'kem-hospital-mumbai', 'hospital', 'Mumbai', 19.0029, 72.8420, '{English, Marathi, Hindi}', '{Emergency, Cardiology, Neurology}', true, '+91 22 2410 7000', 0, 50, true),
('Sion Hospital (Govt)', 'sion-hospital-mumbai', 'hospital', 'Mumbai', 19.0371, 72.8601, '{English, Marathi, Hindi}', '{Trauma, General Surgery}', true, '+91 22 2407 6381', 0, 50, true),

-- BANGALORE
('Victoria Hospital (Government)', 'victoria-hospital-bangalore', 'hospital', 'Bangalore', 12.9634, 77.5746, '{English, Kannada}', '{Emergency, Orthopedics, General Medicine}', true, '+91 80 2670 1150', 0, 50, true),
('Bowring & Lady Curzon Hospital', 'bowring-hospital-bangalore', 'hospital', 'Bangalore', 12.9818, 77.6033, '{English, Kannada}', '{Maternity, General Surgery}', true, '+91 80 2559 1362', 0, 50, true)

ON CONFLICT (slug) DO NOTHING;
