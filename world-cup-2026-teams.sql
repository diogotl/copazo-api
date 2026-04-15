-- FIFA World Cup 2026 - Official 48 Teams
-- Copa do Mundo FIFA 2026 - 48 Equipas Oficiais
-- Based on official FIFA qualifications as of January 2024

-- Insert Teams (48 teams total - official FIFA list)
INSERT INTO "teams" ("id", "name", "country_code", "fifa_code", "confederation", "flag_url") VALUES

-- HOST COUNTRIES (3 teams)
('can', 'Canada', 'CA', 'CAN', 'CONCACAF', 'https://flagsapi.com/CA/flat/64.png'),
('usa', 'United States', 'US', 'USA', 'CONCACAF', 'https://flagsapi.com/US/flat/64.png'),
('mex', 'Mexico', 'MX', 'MEX', 'CONCACAF', 'https://flagsapi.com/MX/flat/64.png'),

-- QUALIFIED TEAMS (45 teams)

-- UEFA (European teams)
('ger', 'Germany', 'DE', 'GER', 'UEFA', 'https://flagsapi.com/DE/flat/64.png'),
('bel', 'Belgium', 'BE', 'BEL', 'UEFA', 'https://flagsapi.com/BE/flat/64.png'),
('cro', 'Croatia', 'HR', 'CRO', 'UEFA', 'https://flagsapi.com/HR/flat/64.png'),
('sco', 'Scotland', 'GB-SCT', 'SCO', 'UEFA', 'https://flagsapi.com/GB/flat/64.png'),
('ned', 'Netherlands', 'NL', 'NED', 'UEFA', 'https://flagsapi.com/NL/flat/64.png'),
('eng', 'England', 'GB-ENG', 'ENG', 'UEFA', 'https://flagsapi.com/GB/flat/64.png'),
('esp', 'Spain', 'ES', 'ESP', 'UEFA', 'https://flagsapi.com/ES/flat/64.png'),
('fra', 'France', 'FR', 'FRA', 'UEFA', 'https://flagsapi.com/FR/flat/64.png'),
('nor', 'Norway', 'NO', 'NOR', 'UEFA', 'https://flagsapi.com/NO/flat/64.png'),
('sui', 'Switzerland', 'CH', 'SUI', 'UEFA', 'https://flagsapi.com/CH/flat/64.png'),
('por', 'Portugal', 'PT', 'POR', 'UEFA', 'https://flagsapi.com/PT/flat/64.png'),
('aut', 'Austria', 'AT', 'AUT', 'UEFA', 'https://flagsapi.com/AT/flat/64.png'),
('swe', 'Sweden', 'SE', 'SWE', 'UEFA', 'https://flagsapi.com/SE/flat/64.png'),
('cze', 'Czech Republic', 'CZ', 'CZE', 'UEFA', 'https://flagsapi.com/CZ/flat/64.png'),
('tur', 'Turkey', 'TR', 'TUR', 'UEFA', 'https://flagsapi.com/TR/flat/64.png'),
('tun', 'Tunisia', 'TN', 'TUN', 'CAF', 'https://flagsapi.com/TN/flat/64.png'),
('bih', 'Bosnia and Herzegovina', 'BA', 'BIH', 'UEFA', 'https://flagsapi.com/BA/flat/64.png'),

-- CONMEBOL (South American teams)
('arg', 'Argentina', 'AR', 'ARG', 'CONMEBOL', 'https://flagsapi.com/AR/flat/64.png'),
('bra', 'Brazil', 'BR', 'BRA', 'CONMEBOL', 'https://flagsapi.com/BR/flat/64.png'),
('col', 'Colombia', 'CO', 'COL', 'CONMEBOL', 'https://flagsapi.com/CO/flat/64.png'),
('uru', 'Uruguay', 'UY', 'URU', 'CONMEBOL', 'https://flagsapi.com/UY/flat/64.png'),
('ecu', 'Ecuador', 'EC', 'ECU', 'CONMEBOL', 'https://flagsapi.com/EC/flat/64.png'),
('par', 'Paraguay', 'PY', 'PAR', 'CONMEBOL', 'https://flagsapi.com/PY/flat/64.png'),

-- AFC (Asian teams)
('jpn', 'Japan', 'JP', 'JPN', 'AFC', 'https://flagsapi.com/JP/flat/64.png'),
('aus', 'Australia', 'AU', 'AUS', 'AFC', 'https://flagsapi.com/AU/flat/64.png'),
('kor', 'South Korea', 'KR', 'KOR', 'AFC', 'https://flagsapi.com/KR/flat/64.png'),
('irn', 'Iran', 'IR', 'IRN', 'AFC', 'https://flagsapi.com/IR/flat/64.png'),
('sau', 'Saudi Arabia', 'SA', 'KSA', 'AFC', 'https://flagsapi.com/SA/flat/64.png'),
('irq', 'Iraq', 'IQ', 'IRQ', 'AFC', 'https://flagsapi.com/IQ/flat/64.png'),
('qat', 'Qatar', 'QA', 'QAT', 'AFC', 'https://flagsapi.com/QA/flat/64.png'),
('jor', 'Jordan', 'JO', 'JOR', 'AFC', 'https://flagsapi.com/JO/flat/64.png'),
('uzb', 'Uzbekistan', 'UZ', 'UZB', 'AFC', 'https://flagsapi.com/UZ/flat/64.png'),

-- CAF (African teams)
('mar', 'Morocco', 'MA', 'MAR', 'CAF', 'https://flagsapi.com/MA/flat/64.png'),
('sen', 'Senegal', 'SN', 'SEN', 'CAF', 'https://flagsapi.com/SN/flat/64.png'),
('egy', 'Egypt', 'EG', 'EGY', 'CAF', 'https://flagsapi.com/EG/flat/64.png'),
('alg', 'Algeria', 'DZ', 'ALG', 'CAF', 'https://flagsapi.com/DZ/flat/64.png'),
('civ', 'Ivory Coast', 'CI', 'CIV', 'CAF', 'https://flagsapi.com/CI/flat/64.png'),
('gha', 'Ghana', 'GH', 'GHA', 'CAF', 'https://flagsapi.com/GH/flat/64.png'),
('rsa', 'South Africa', 'ZA', 'RSA', 'CAF', 'https://flagsapi.com/ZA/flat/64.png'),
('cod', 'DR Congo', 'CD', 'COD', 'CAF', 'https://flagsapi.com/CD/flat/64.png'),
('cpv', 'Cape Verde', 'CV', 'CPV', 'CAF', 'https://flagsapi.com/CV/flat/64.png'),

-- CONCACAF (Additional qualified teams)
('pan', 'Panama', 'PA', 'PAN', 'CONCACAF', 'https://flagsapi.com/PA/flat/64.png'),
('hti', 'Haiti', 'HT', 'HAI', 'CONCACAF', 'https://flagsapi.com/HT/flat/64.png'),
('cuw', 'Curacao', 'CW', 'CUW', 'CONCACAF', 'https://flagsapi.com/CW/flat/64.png'),

-- OFC (Oceania)
('nzl', 'New Zealand', 'NZ', 'NZL', 'OFC', 'https://flagsapi.com/NZ/flat/64.png')

ON CONFLICT ("country_code") DO NOTHING;

-- Insert Translations (Portuguese, English, Spanish)
INSERT INTO "team_translations" ("id", "team_id", "language_code", "name") VALUES

-- Portuguese translations
('trans_can_pt', 'can', 'pt', 'Canadá'),
('trans_usa_pt', 'usa', 'pt', 'Estados Unidos'),
('trans_mex_pt', 'mex', 'pt', 'México'),
('trans_ger_pt', 'ger', 'pt', 'Alemanha'),
('trans_bel_pt', 'bel', 'pt', 'Bélgica'),
('trans_cro_pt', 'cro', 'pt', 'Croácia'),
('trans_sco_pt', 'sco', 'pt', 'Escócia'),
('trans_ned_pt', 'ned', 'pt', 'Países Baixos'),
('trans_eng_pt', 'eng', 'pt', 'Inglaterra'),
('trans_esp_pt', 'esp', 'pt', 'Espanha'),
('trans_fra_pt', 'fra', 'pt', 'França'),
('trans_nor_pt', 'nor', 'pt', 'Noruega'),
('trans_sui_pt', 'sui', 'pt', 'Suíça'),
('trans_por_pt', 'por', 'pt', 'Portugal'),
('trans_aut_pt', 'aut', 'pt', 'Áustria'),
('trans_swe_pt', 'swe', 'pt', 'Suécia'),
('trans_cze_pt', 'cze', 'pt', 'República Checa'),
('trans_tur_pt', 'tur', 'pt', 'Turquia'),
('trans_bih_pt', 'bih', 'pt', 'Bósnia e Herzegovina'),
('trans_arg_pt', 'arg', 'pt', 'Argentina'),
('trans_bra_pt', 'bra', 'pt', 'Brasil'),
('trans_col_pt', 'col', 'pt', 'Colômbia'),
('trans_uru_pt', 'uru', 'pt', 'Uruguai'),
('trans_ecu_pt', 'ecu', 'pt', 'Equador'),
('trans_par_pt', 'par', 'pt', 'Paraguai'),
('trans_jpn_pt', 'jpn', 'pt', 'Japão'),
('trans_aus_pt', 'aus', 'pt', 'Austrália'),
('trans_kor_pt', 'kor', 'pt', 'Coreia do Sul'),
('trans_irn_pt', 'irn', 'pt', 'Irão'),
('trans_sau_pt', 'sau', 'pt', 'Arábia Saudita'),
('trans_irq_pt', 'irq', 'pt', 'Iraque'),
('trans_qat_pt', 'qat', 'pt', 'Catar'),
('trans_jor_pt', 'jor', 'pt', 'Jordânia'),
('trans_uzb_pt', 'uzb', 'pt', 'Uzbequistão'),
('trans_mar_pt', 'mar', 'pt', 'Marrocos'),
('trans_sen_pt', 'sen', 'pt', 'Senegal'),
('trans_egy_pt', 'egy', 'pt', 'Egito'),
('trans_alg_pt', 'alg', 'pt', 'Argélia'),
('trans_civ_pt', 'civ', 'pt', 'Costa do Marfim'),
('trans_gha_pt', 'gha', 'pt', 'Gana'),
('trans_rsa_pt', 'rsa', 'pt', 'África do Sul'),
('trans_cod_pt', 'cod', 'pt', 'RD do Congo'),
('trans_cpv_pt', 'cpv', 'pt', 'Cabo Verde'),
('trans_pan_pt', 'pan', 'pt', 'Panamá'),
('trans_hti_pt', 'hti', 'pt', 'Haiti'),
('trans_cuw_pt', 'cuw', 'pt', 'Curaçau'),
('trans_nzl_pt', 'nzl', 'pt', 'Nova Zelândia'),
('trans_tun_pt', 'tun', 'pt', 'Tunísia'),

-- English translations
('trans_can_en', 'can', 'en', 'Canada'),
('trans_usa_en', 'usa', 'en', 'United States'),
('trans_mex_en', 'mex', 'en', 'Mexico'),
('trans_ger_en', 'ger', 'en', 'Germany'),
('trans_bel_en', 'bel', 'en', 'Belgium'),
('trans_cro_en', 'cro', 'en', 'Croatia'),
('trans_sco_en', 'sco', 'en', 'Scotland'),
('trans_ned_en', 'ned', 'en', 'Netherlands'),
('trans_eng_en', 'eng', 'en', 'England'),
('trans_esp_en', 'esp', 'en', 'Spain'),
('trans_fra_en', 'fra', 'en', 'France'),
('trans_nor_en', 'nor', 'en', 'Norway'),
('trans_sui_en', 'sui', 'en', 'Switzerland'),
('trans_por_en', 'por', 'en', 'Portugal'),
('trans_aut_en', 'aut', 'en', 'Austria'),
('trans_swe_en', 'swe', 'en', 'Sweden'),
('trans_cze_en', 'cze', 'en', 'Czech Republic'),
('trans_tur_en', 'tur', 'en', 'Turkey'),
('trans_bih_en', 'bih', 'en', 'Bosnia and Herzegovina'),
('trans_arg_en', 'arg', 'en', 'Argentina'),
('trans_bra_en', 'bra', 'en', 'Brazil'),
('trans_col_en', 'col', 'en', 'Colombia'),
('trans_uru_en', 'uru', 'en', 'Uruguay'),
('trans_ecu_en', 'ecu', 'en', 'Ecuador'),
('trans_par_en', 'par', 'en', 'Paraguay'),
('trans_jpn_en', 'jpn', 'en', 'Japan'),
('trans_aus_en', 'aus', 'en', 'Australia'),
('trans_kor_en', 'kor', 'en', 'South Korea'),
('trans_irn_en', 'irn', 'en', 'Iran'),
('trans_sau_en', 'sau', 'en', 'Saudi Arabia'),
('trans_irq_en', 'irq', 'en', 'Iraq'),
('trans_qat_en', 'qat', 'en', 'Qatar'),
('trans_jor_en', 'jor', 'en', 'Jordan'),
('trans_uzb_en', 'uzb', 'en', 'Uzbekistan'),
('trans_mar_en', 'mar', 'en', 'Morocco'),
('trans_sen_en', 'sen', 'en', 'Senegal'),
('trans_egy_en', 'egy', 'en', 'Egypt'),
('trans_alg_en', 'alg', 'en', 'Algeria'),
('trans_civ_en', 'civ', 'en', 'Ivory Coast'),
('trans_gha_en', 'gha', 'en', 'Ghana'),
('trans_rsa_en', 'rsa', 'en', 'South Africa'),
('trans_cod_en', 'cod', 'en', 'DR Congo'),
('trans_cpv_en', 'cpv', 'en', 'Cape Verde'),
('trans_pan_en', 'pan', 'en', 'Panama'),
('trans_hti_en', 'hti', 'en', 'Haiti'),
('trans_cuw_en', 'cuw', 'en', 'Curacao'),
('trans_nzl_en', 'nzl', 'en', 'New Zealand'),
('trans_tun_en', 'tun', 'en', 'Tunisia'),

-- Spanish translations
('trans_can_es', 'can', 'es', 'Canadá'),
('trans_usa_es', 'usa', 'es', 'Estados Unidos'),
('trans_mex_es', 'mex', 'es', 'México'),
('trans_ger_es', 'ger', 'es', 'Alemania'),
('trans_bel_es', 'bel', 'es', 'Bélgica'),
('trans_cro_es', 'cro', 'es', 'Croacia'),
('trans_sco_es', 'sco', 'es', 'Escocia'),
('trans_ned_es', 'ned', 'es', 'Países Bajos'),
('trans_eng_es', 'eng', 'es', 'Inglaterra'),
('trans_esp_es', 'esp', 'es', 'España'),
('trans_fra_es', 'fra', 'es', 'Francia'),
('trans_nor_es', 'nor', 'es', 'Noruega'),
('trans_sui_es', 'sui', 'es', 'Suiza'),
('trans_por_es', 'por', 'es', 'Portugal'),
('trans_aut_es', 'aut', 'es', 'Austria'),
('trans_swe_es', 'swe', 'es', 'Suecia'),
('trans_cze_es', 'cze', 'es', 'República Checa'),
('trans_tur_es', 'tur', 'es', 'Turquía'),
('trans_bih_es', 'bih', 'es', 'Bosnia y Herzegovina'),
('trans_arg_es', 'arg', 'es', 'Argentina'),
('trans_bra_es', 'bra', 'es', 'Brasil'),
('trans_col_es', 'col', 'es', 'Colombia'),
('trans_uru_es', 'uru', 'es', 'Uruguay'),
('trans_ecu_es', 'ecu', 'es', 'Ecuador'),
('trans_par_es', 'par', 'es', 'Paraguay'),
('trans_jpn_es', 'jpn', 'es', 'Japón'),
('trans_aus_es', 'aus', 'es', 'Australia'),
('trans_kor_es', 'kor', 'es', 'Corea del Sur'),
('trans_irn_es', 'irn', 'es', 'Irán'),
('trans_sau_es', 'sau', 'es', 'Arabia Saudí'),
('trans_irq_es', 'irq', 'es', 'Irak'),
('trans_qat_es', 'qat', 'es', 'Catar'),
('trans_jor_es', 'jor', 'es', 'Jordania'),
('trans_uzb_es', 'uzb', 'es', 'Uzbekistán'),
('trans_mar_es', 'mar', 'es', 'Marruecos'),
('trans_sen_es', 'sen', 'es', 'Senegal'),
('trans_egy_es', 'egy', 'es', 'Egipto'),
('trans_alg_es', 'alg', 'es', 'Argelia'),
('trans_civ_es', 'civ', 'es', 'Costa de Marfil'),
('trans_gha_es', 'gha', 'es', 'Ghana'),
('trans_rsa_es', 'rsa', 'es', 'Sudáfrica'),
('trans_cod_es', 'cod', 'es', 'RD del Congo'),
('trans_cpv_es', 'cpv', 'es', 'Cabo Verde'),
('trans_pan_es', 'pan', 'es', 'Panamá'),
('trans_hti_es', 'hti', 'es', 'Haití'),
('trans_cuw_es', 'cuw', 'es', 'Curazao'),
('trans_nzl_es', 'nzl', 'es', 'Nueva Zelanda'),
('trans_tun_es', 'tun', 'es', 'Túnez')

ON CONFLICT ("team_id", "language_code") DO NOTHING;

-- Sample World Cup 2026 Games
INSERT INTO "games" ("id", "date", "first_team_id", "second_team_id", "phase", "group") VALUES

-- Group A (Sample games based on FIFA ranking)
('wc2026_ga_1', '2026-06-11 17:00:00', 'mex', 'kor', 'group', 'A'),
('wc2026_ga_2', '2026-06-11 20:00:00', 'rsa', 'cze', 'group', 'A'),
('wc2026_ga_3', '2026-06-12 17:00:00', 'mex', 'rsa', 'group', 'A'),
('wc2026_ga_4', '2026-06-12 20:00:00', 'kor', 'cze', 'group', 'A'),

-- Group B
('wc2026_gb_1', '2026-06-13 17:00:00', 'can', 'bih', 'group', 'B'),
('wc2026_gb_2', '2026-06-13 20:00:00', 'qat', 'sui', 'group', 'B'),

-- Group C
('wc2026_gc_1', '2026-06-14 17:00:00', 'bra', 'sco', 'group', 'C'),
('wc2026_gc_2', '2026-06-14 20:00:00', 'mar', 'hti', 'group', 'C'),

-- Group D
('wc2026_gd_1', '2026-06-15 17:00:00', 'usa', 'aus', 'group', 'D'),
('wc2026_gd_2', '2026-06-15 20:00:00', 'par', 'tur', 'group', 'D'),

-- Group E
('wc2026_ge_1', '2026-06-16 17:00:00', 'ger', 'civ', 'group', 'E'),
('wc2026_ge_2', '2026-06-16 20:00:00', 'ecu', 'cuw', 'group', 'E'),

-- Group F
('wc2026_gf_1', '2026-06-17 17:00:00', 'ned', 'jpn', 'group', 'F'),
('wc2026_gf_2', '2026-06-17 20:00:00', 'swe', 'tun', 'group', 'F')

ON CONFLICT ("id") DO NOTHING;

-- Create test user for development
INSERT INTO "users" ("id", "name", "email", "created_at")
VALUES ('placeholder-user-id', 'Test User', 'test@copazo.com', NOW())
ON CONFLICT ("id") DO NOTHING;

-- Create test pool
INSERT INTO "pools" ("id", "title", "code", "owner_id")
VALUES ('pool-copa2026', 'Copa 2026 - Amigos', 'COPA26', 'placeholder-user-id')
ON CONFLICT ("id") DO NOTHING;

-- Add test user as participant
INSERT INTO "participants" ("id", "user_id", "pool_id")
VALUES ('part-copa2026', 'placeholder-user-id', 'pool-copa2026')
ON CONFLICT ("user_id", "pool_id") DO NOTHING;
