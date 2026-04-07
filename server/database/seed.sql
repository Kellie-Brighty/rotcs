-- ROTCS Seed Data (MySQL)
-- Unified Multi-tenant Regulatory Oversight & Tax Calculation System

USE rotcs_db;

-- 1. States Seed
INSERT INTO states (name, code, slug, logo_url) VALUES 
('Lagos State', 'LA', 'lagos', 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Coat_of_arms_of_Lagos_State.png'),
('Ondo State', 'ON', 'ondo', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Ondo_State.png'),
('Taraba State', 'TR', 'taraba', 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Flag_of_Taraba_State.png');

-- 2. Operators Seed
INSERT INTO operators (state_id, name, license_number, api_endpoint) VALUES
(1, 'Bet9ja Lagos', 'LGS-OP-001', 'https://api.bet9ja.com/v1/regulatory'),
(1, 'SportyBet Lagos', 'LGS-OP-002', 'https://api.sportybet.com/v1/lagos'),
(2, 'BetKing Ondo', 'ON-OP-001', 'https://api.betking.com/v1/ondo'),
(3, '1xBet Taraba', 'TR-OP-001', 'https://api.1xbet.com/v1/taraba');

-- 3. Users Seed
-- Using roles: 'global_admin', 'state_admin', 'auditor', 'operator_admin'
INSERT INTO users (state_id, operator_id, username, email, password_hash, role) VALUES
(NULL, NULL, 'global_consultant', 'admin@rotcs.consultant.com', 'admin123', 'global_admin'),
(1, NULL, 'lagos_admin', 'admin@lagos.gov.ng', 'admin123', 'state_admin'),
(2, NULL, 'ondo_admin', 'admin@ondo.gov.ng', 'admin123', 'state_admin'),
(3, NULL, 'taraba_admin', 'admin@taraba.gov.ng', 'admin123', 'state_admin'),
(1, 1, 'bet9ja_admin', 'admin@bet9ja.com', 'admin123', 'operator_admin');

-- 4. LGAs Seed (Sampling for Taraba & Ondo)
INSERT INTO lgas (state_id, name, code) VALUES
(3, 'Jalingo', 'TR-JAL'),
(3, 'Wukari', 'TR-WUK'),
(3, 'Sardauna', 'TR-SAR'),
(3, 'Bali', 'TR-BAL'),
(2, 'Akure South', 'ON-AKS'),
(2, 'Owo', 'ON-OWO'),
(2, 'Ondo West', 'ON-ONW'),
(1, 'Ikeja', 'LA-IKJ'),
(1, 'Lagos Island', 'LA-LGI');

-- 5. Tax Rules Seed
INSERT INTO tax_rules (state_id, tax_rate, withholding_tax_rate, effective_from) VALUES
(1, 15.00, 0.00, '2026-01-01'),
(2, 10.00, 0.00, '2026-01-01'),
(3, 12.50, 5.00, '2026-03-01'); -- Taraba has 5% withholding tax

-- 6. Initial Daily Metrics Seed (Simulation for 2026-03-26)
INSERT INTO daily_metrics (state_id, operator_id, total_wager, total_payout, tax_due, active_users, report_date) VALUES
(1, 1, 5000000.00, 4200000.00, 120000.00, 1500, '2026-03-26'),
(1, 2, 3000000.00, 2500000.00, 75000.00, 900, '2026-03-26'),
(2, 3, 2000000.00, 1700000.00, 30000.00, 450, '2026-03-26'),
(3, 4, 1500000.00, 1200000.00, 37500.00, 300, '2026-03-26');

-- 7. LGA Metrics Seed
INSERT INTO lga_daily_metrics (lga_id, total_wager, total_payout, active_users, report_date) VALUES
(1, 800000.00, 650000.00, 200, '2026-03-26'), -- Jalingo
(5, 700000.00, 580000.00, 180, '2026-03-26'); -- Akure South
