-- FIFA World Cup 2026 - Official Complete Calendar
-- Copa do Mundo FIFA 2026 - Calendário Oficial Completo
-- All 104 games with official schedule, stadiums, and teams
-- Times in UTC format for international compatibility

-- =============================================================================
-- TEAMS (48 Official Teams)
-- =============================================================================

INSERT INTO "teams" ("id", "name", "country_code", "fifa_code", "confederation", "flag_url") VALUES

-- HOST COUNTRIES (3)
('mex', 'Mexico', 'MX', 'MEX', 'CONCACAF', 'https://flagsapi.com/MX/flat/64.png'),
('usa', 'United States', 'US', 'USA', 'CONCACAF', 'https://flagsapi.com/US/flat/64.png'),
('can', 'Canada', 'CA', 'CAN', 'CONCACAF', 'https://flagsapi.com/CA/flat/64.png'),

-- QUALIFIED TEAMS BY GROUP (45)
-- Group A
('rsa', 'South Africa', 'ZA', 'RSA', 'CAF', 'https://flagsapi.com/ZA/flat/64.png'),
('kor', 'South Korea', 'KR', 'KOR', 'AFC', 'https://flagsapi.com/KR/flat/64.png'),
('cze', 'Czech Republic', 'CZ', 'CZE', 'UEFA', 'https://flagsapi.com/CZ/flat/64.png'),

-- Group B
('bih', 'Bosnia and Herzegovina', 'BA', 'BIH', 'UEFA', 'https://flagsapi.com/BA/flat/64.png'),
('qat', 'Qatar', 'QA', 'QAT', 'AFC', 'https://flagsapi.com/QA/flat/64.png'),
('sui', 'Switzerland', 'CH', 'SUI', 'UEFA', 'https://flagsapi.com/CH/flat/64.png'),

-- Group C
('bra', 'Brazil', 'BR', 'BRA', 'CONMEBOL', 'https://flagsapi.com/BR/flat/64.png'),
('mar', 'Morocco', 'MA', 'MAR', 'CAF', 'https://flagsapi.com/MA/flat/64.png'),
('hti', 'Haiti', 'HT', 'HAI', 'CONCACAF', 'https://flagsapi.com/HT/flat/64.png'),
('sco', 'Scotland', 'GB-SCT', 'SCO', 'UEFA', 'https://flagsapi.com/GB/flat/64.png'),

-- Group D
('par', 'Paraguay', 'PY', 'PAR', 'CONMEBOL', 'https://flagsapi.com/PY/flat/64.png'),
('aus', 'Australia', 'AU', 'AUS', 'AFC', 'https://flagsapi.com/AU/flat/64.png'),
('tur', 'Turkey', 'TR', 'TUR', 'UEFA', 'https://flagsapi.com/TR/flat/64.png'),

-- Group E
('ger', 'Germany', 'DE', 'GER', 'UEFA', 'https://flagsapi.com/DE/flat/64.png'),
('cuw', 'Curacao', 'CW', 'CUW', 'CONCACAF', 'https://flagsapi.com/CW/flat/64.png'),
('civ', 'Ivory Coast', 'CI', 'CIV', 'CAF', 'https://flagsapi.com/CI/flat/64.png'),
('ecu', 'Ecuador', 'EC', 'ECU', 'CONMEBOL', 'https://flagsapi.com/EC/flat/64.png'),

-- Group F
('ned', 'Netherlands', 'NL', 'NED', 'UEFA', 'https://flagsapi.com/NL/flat/64.png'),
('jpn', 'Japan', 'JP', 'JPN', 'AFC', 'https://flagsapi.com/JP/flat/64.png'),
('swe', 'Sweden', 'SE', 'SWE', 'UEFA', 'https://flagsapi.com/SE/flat/64.png'),
('tun', 'Tunisia', 'TN', 'TUN', 'CAF', 'https://flagsapi.com/TN/flat/64.png'),

-- Group G
('bel', 'Belgium', 'BE', 'BEL', 'UEFA', 'https://flagsapi.com/BE/flat/64.png'),
('egy', 'Egypt', 'EG', 'EGY', 'CAF', 'https://flagsapi.com/EG/flat/64.png'),
('irn', 'Iran', 'IR', 'IRN', 'AFC', 'https://flagsapi.com/IR/flat/64.png'),
('nzl', 'New Zealand', 'NZ', 'NZL', 'OFC', 'https://flagsapi.com/NZ/flat/64.png'),

-- Group H
('esp', 'Spain', 'ES', 'ESP', 'UEFA', 'https://flagsapi.com/ES/flat/64.png'),
('cpv', 'Cape Verde', 'CV', 'CPV', 'CAF', 'https://flagsapi.com/CV/flat/64.png'),
('sau', 'Saudi Arabia', 'SA', 'KSA', 'AFC', 'https://flagsapi.com/SA/flat/64.png'),
('uru', 'Uruguay', 'UY', 'URU', 'CONMEBOL', 'https://flagsapi.com/UY/flat/64.png'),

-- Group I
('fra', 'France', 'FR', 'FRA', 'UEFA', 'https://flagsapi.com/FR/flat/64.png'),
('sen', 'Senegal', 'SN', 'SEN', 'CAF', 'https://flagsapi.com/SN/flat/64.png'),
('irq', 'Iraq', 'IQ', 'IRQ', 'AFC', 'https://flagsapi.com/IQ/flat/64.png'),
('nor', 'Norway', 'NO', 'NOR', 'UEFA', 'https://flagsapi.com/NO/flat/64.png'),

-- Group J
('arg', 'Argentina', 'AR', 'ARG', 'CONMEBOL', 'https://flagsapi.com/AR/flat/64.png'),
('alg', 'Algeria', 'DZ', 'ALG', 'CAF', 'https://flagsapi.com/DZ/flat/64.png'),
('aut', 'Austria', 'AT', 'AUT', 'UEFA', 'https://flagsapi.com/AT/flat/64.png'),
('jor', 'Jordan', 'JO', 'JOR', 'AFC', 'https://flagsapi.com/JO/flat/64.png'),

-- Group K
('por', 'Portugal', 'PT', 'POR', 'UEFA', 'https://flagsapi.com/PT/flat/64.png'),
('cod', 'DR Congo', 'CD', 'COD', 'CAF', 'https://flagsapi.com/CD/flat/64.png'),
('uzb', 'Uzbekistan', 'UZ', 'UZB', 'AFC', 'https://flagsapi.com/UZ/flat/64.png'),
('col', 'Colombia', 'CO', 'COL', 'CONMEBOL', 'https://flagsapi.com/CO/flat/64.png'),

-- Group L
('eng', 'England', 'GB-ENG', 'ENG', 'UEFA', 'https://flagsapi.com/GB/flat/64.png'),
('cro', 'Croatia', 'HR', 'CRO', 'UEFA', 'https://flagsapi.com/HR/flat/64.png'),
('gha', 'Ghana', 'GH', 'GHA', 'CAF', 'https://flagsapi.com/GH/flat/64.png'),
('pan', 'Panama', 'PA', 'PAN', 'CONCACAF', 'https://flagsapi.com/PA/flat/64.png')

ON CONFLICT ("country_code") DO NOTHING;

-- =============================================================================
-- TEAM TRANSLATIONS (PT, EN, ES)
-- =============================================================================

INSERT INTO "team_translations" ("id", "team_id", "language_code", "name") VALUES

-- Portuguese translations
('trans_mex_pt', 'mex', 'pt', 'México'),
('trans_usa_pt', 'usa', 'pt', 'Estados Unidos'),
('trans_can_pt', 'can', 'pt', 'Canadá'),
('trans_rsa_pt', 'rsa', 'pt', 'África do Sul'),
('trans_kor_pt', 'kor', 'pt', 'Coreia do Sul'),
('trans_cze_pt', 'cze', 'pt', 'República Checa'),
('trans_bih_pt', 'bih', 'pt', 'Bósnia e Herzegovina'),
('trans_qat_pt', 'qat', 'pt', 'Catar'),
('trans_sui_pt', 'sui', 'pt', 'Suíça'),
('trans_bra_pt', 'bra', 'pt', 'Brasil'),
('trans_mar_pt', 'mar', 'pt', 'Marrocos'),
('trans_hti_pt', 'hti', 'pt', 'Haiti'),
('trans_sco_pt', 'sco', 'pt', 'Escócia'),
('trans_par_pt', 'par', 'pt', 'Paraguai'),
('trans_aus_pt', 'aus', 'pt', 'Austrália'),
('trans_tur_pt', 'tur', 'pt', 'Turquia'),
('trans_ger_pt', 'ger', 'pt', 'Alemanha'),
('trans_cuw_pt', 'cuw', 'pt', 'Curaçau'),
('trans_civ_pt', 'civ', 'pt', 'Costa do Marfim'),
('trans_ecu_pt', 'ecu', 'pt', 'Equador'),
('trans_ned_pt', 'ned', 'pt', 'Países Baixos'),
('trans_jpn_pt', 'jpn', 'pt', 'Japão'),
('trans_swe_pt', 'swe', 'pt', 'Suécia'),
('trans_tun_pt', 'tun', 'pt', 'Tunísia'),
('trans_bel_pt', 'bel', 'pt', 'Bélgica'),
('trans_egy_pt', 'egy', 'pt', 'Egito'),
('trans_irn_pt', 'irn', 'pt', 'Irão'),
('trans_nzl_pt', 'nzl', 'pt', 'Nova Zelândia'),
('trans_esp_pt', 'esp', 'pt', 'Espanha'),
('trans_cpv_pt', 'cpv', 'pt', 'Cabo Verde'),
('trans_sau_pt', 'sau', 'pt', 'Arábia Saudita'),
('trans_uru_pt', 'uru', 'pt', 'Uruguai'),
('trans_fra_pt', 'fra', 'pt', 'França'),
('trans_sen_pt', 'sen', 'pt', 'Senegal'),
('trans_irq_pt', 'irq', 'pt', 'Iraque'),
('trans_nor_pt', 'nor', 'pt', 'Noruega'),
('trans_arg_pt', 'arg', 'pt', 'Argentina'),
('trans_alg_pt', 'alg', 'pt', 'Argélia'),
('trans_aut_pt', 'aut', 'pt', 'Áustria'),
('trans_jor_pt', 'jor', 'pt', 'Jordânia'),
('trans_por_pt', 'por', 'pt', 'Portugal'),
('trans_cod_pt', 'cod', 'pt', 'RD do Congo'),
('trans_uzb_pt', 'uzb', 'pt', 'Uzbequistão'),
('trans_col_pt', 'col', 'pt', 'Colômbia'),
('trans_eng_pt', 'eng', 'pt', 'Inglaterra'),
('trans_cro_pt', 'cro', 'pt', 'Croácia'),
('trans_gha_pt', 'gha', 'pt', 'Gana'),
('trans_pan_pt', 'pan', 'pt', 'Panamá'),

-- English translations
('trans_mex_en', 'mex', 'en', 'Mexico'),
('trans_usa_en', 'usa', 'en', 'United States'),
('trans_can_en', 'can', 'en', 'Canada'),
('trans_rsa_en', 'rsa', 'en', 'South Africa'),
('trans_kor_en', 'kor', 'en', 'South Korea'),
('trans_cze_en', 'cze', 'en', 'Czech Republic'),
('trans_bih_en', 'bih', 'en', 'Bosnia and Herzegovina'),
('trans_qat_en', 'qat', 'en', 'Qatar'),
('trans_sui_en', 'sui', 'en', 'Switzerland'),
('trans_bra_en', 'bra', 'en', 'Brazil'),
('trans_mar_en', 'mar', 'en', 'Morocco'),
('trans_hti_en', 'hti', 'en', 'Haiti'),
('trans_sco_en', 'sco', 'en', 'Scotland'),
('trans_par_en', 'par', 'en', 'Paraguay'),
('trans_aus_en', 'aus', 'en', 'Australia'),
('trans_tur_en', 'tur', 'en', 'Turkey'),
('trans_ger_en', 'ger', 'en', 'Germany'),
('trans_cuw_en', 'cuw', 'en', 'Curacao'),
('trans_civ_en', 'civ', 'en', 'Ivory Coast'),
('trans_ecu_en', 'ecu', 'en', 'Ecuador'),
('trans_ned_en', 'ned', 'en', 'Netherlands'),
('trans_jpn_en', 'jpn', 'en', 'Japan'),
('trans_swe_en', 'swe', 'en', 'Sweden'),
('trans_tun_en', 'tun', 'en', 'Tunisia'),
('trans_bel_en', 'bel', 'en', 'Belgium'),
('trans_egy_en', 'egy', 'en', 'Egypt'),
('trans_irn_en', 'irn', 'en', 'Iran'),
('trans_nzl_en', 'nzl', 'en', 'New Zealand'),
('trans_esp_en', 'esp', 'en', 'Spain'),
('trans_cpv_en', 'cpv', 'en', 'Cape Verde'),
('trans_sau_en', 'sau', 'en', 'Saudi Arabia'),
('trans_uru_en', 'uru', 'en', 'Uruguay'),
('trans_fra_en', 'fra', 'en', 'France'),
('trans_sen_en', 'sen', 'en', 'Senegal'),
('trans_irq_en', 'irq', 'en', 'Iraq'),
('trans_nor_en', 'nor', 'en', 'Norway'),
('trans_arg_en', 'arg', 'en', 'Argentina'),
('trans_alg_en', 'alg', 'en', 'Algeria'),
('trans_aut_en', 'aut', 'en', 'Austria'),
('trans_jor_en', 'jor', 'en', 'Jordan'),
('trans_por_en', 'por', 'en', 'Portugal'),
('trans_cod_en', 'cod', 'en', 'DR Congo'),
('trans_uzb_en', 'uzb', 'en', 'Uzbekistan'),
('trans_col_en', 'col', 'en', 'Colombia'),
('trans_eng_en', 'eng', 'en', 'England'),
('trans_cro_en', 'cro', 'en', 'Croatia'),
('trans_gha_en', 'gha', 'en', 'Ghana'),
('trans_pan_en', 'pan', 'en', 'Panama'),

-- Spanish translations
('trans_mex_es', 'mex', 'es', 'México'),
('trans_usa_es', 'usa', 'es', 'Estados Unidos'),
('trans_can_es', 'can', 'es', 'Canadá'),
('trans_rsa_es', 'rsa', 'es', 'Sudáfrica'),
('trans_kor_es', 'kor', 'es', 'Corea del Sur'),
('trans_cze_es', 'cze', 'es', 'República Checa'),
('trans_bih_es', 'bih', 'es', 'Bosnia y Herzegovina'),
('trans_qat_es', 'qat', 'es', 'Catar'),
('trans_sui_es', 'sui', 'es', 'Suiza'),
('trans_bra_es', 'bra', 'es', 'Brasil'),
('trans_mar_es', 'mar', 'es', 'Marruecos'),
('trans_hti_es', 'hti', 'es', 'Haití'),
('trans_sco_es', 'sco', 'es', 'Escocia'),
('trans_par_es', 'par', 'es', 'Paraguay'),
('trans_aus_es', 'aus', 'es', 'Australia'),
('trans_tur_es', 'tur', 'es', 'Turquía'),
('trans_ger_es', 'ger', 'es', 'Alemania'),
('trans_cuw_es', 'cuw', 'es', 'Curazao'),
('trans_civ_es', 'civ', 'es', 'Costa de Marfil'),
('trans_ecu_es', 'ecu', 'es', 'Ecuador'),
('trans_ned_es', 'ned', 'es', 'Países Bajos'),
('trans_jpn_es', 'jpn', 'es', 'Japón'),
('trans_swe_es', 'swe', 'es', 'Suecia'),
('trans_tun_es', 'tun', 'es', 'Túnez'),
('trans_bel_es', 'bel', 'es', 'Bélgica'),
('trans_egy_es', 'egy', 'es', 'Egipto'),
('trans_irn_es', 'irn', 'es', 'Irán'),
('trans_nzl_es', 'nzl', 'es', 'Nueva Zelanda'),
('trans_esp_es', 'esp', 'es', 'España'),
('trans_cpv_es', 'cpv', 'es', 'Cabo Verde'),
('trans_sau_es', 'sau', 'es', 'Arabia Saudí'),
('trans_uru_es', 'uru', 'es', 'Uruguay'),
('trans_fra_es', 'fra', 'es', 'Francia'),
('trans_sen_es', 'sen', 'es', 'Senegal'),
('trans_irq_es', 'irq', 'es', 'Irak'),
('trans_nor_es', 'nor', 'es', 'Noruega'),
('trans_arg_es', 'arg', 'es', 'Argentina'),
('trans_alg_es', 'alg', 'es', 'Argelia'),
('trans_aut_es', 'aut', 'es', 'Austria'),
('trans_jor_es', 'jor', 'es', 'Jordania'),
('trans_por_es', 'por', 'es', 'Portugal'),
('trans_cod_es', 'cod', 'es', 'RD del Congo'),
('trans_uzb_es', 'uzb', 'es', 'Uzbekistán'),
('trans_col_es', 'col', 'es', 'Colombia'),
('trans_eng_es', 'eng', 'es', 'Inglaterra'),
('trans_cro_es', 'cro', 'es', 'Croacia'),
('trans_gha_es', 'gha', 'es', 'Ghana'),
('trans_pan_es', 'pan', 'es', 'Panamá')

ON CONFLICT ("team_id", "language_code") DO NOTHING;

-- =============================================================================
-- STADIUMS (16 Official Stadiums)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "stadiums" (
    "id" text PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "city" text NOT NULL,
    "country_code" text NOT NULL,
    "capacity" integer NOT NULL,
    "created_at" timestamp DEFAULT now()
);

INSERT INTO "stadiums" ("id", "name", "city", "country_code", "capacity") VALUES

-- Canada (2 stadiums)
('tor_bmo', 'BMO Field', 'Toronto', 'CA', 45736),
('van_bc', 'BC Place', 'Vancouver', 'CA', 54500),

-- United States (11 stadiums)
('atl_mb', 'Mercedes-Benz Stadium', 'Atlanta', 'US', 75000),
('bos_gil', 'Gillette Stadium', 'Boston', 'US', 70000),
('phi_lin', 'Lincoln Financial Field', 'Philadelphia', 'US', 69328),
('hou_nrg', 'NRG Stadium', 'Houston', 'US', 72220),
('kc_arr', 'Arrowhead Stadium', 'Kansas City', 'US', 76640),
('la_sofi', 'SoFi Stadium', 'Los Angeles', 'US', 70240),
('mia_hr', 'Hard Rock Stadium', 'Miami', 'US', 67518),
('ny_met', 'MetLife Stadium', 'New York', 'US', 87157),
('sf_levi', 'Levi''s Stadium', 'San Francisco', 'US', 70909),
('sea_lum', 'Lumen Field', 'Seattle', 'US', 72000),
('dal_att', 'AT&T Stadium', 'Dallas', 'US', 80000),

-- Mexico (3 stadiums)
('mex_azt', 'Estadio Azteca', 'Mexico City', 'MX', 87523),
('gua_akr', 'Estadio Akron', 'Guadalajara', 'MX', 48071),
('mon_bbv', 'Estadio BBVA', 'Monterrey', 'MX', 53460)

ON CONFLICT ("id") DO NOTHING;

-- =============================================================================
-- GAMES - COMPLETE OFFICIAL FIFA SCHEDULE (All 104 Games)
-- =============================================================================

INSERT INTO "games" ("id", "date", "first_team_id", "second_team_id", "phase", "group", "stadium_id") VALUES

-- =============================================================================
-- GROUP STAGE - First Round (June 11-17, 2026)
-- =============================================================================

-- June 11, 2026
('wc2026_001', '2026-06-11 19:00:00Z', 'mex', 'rsa', 'group', 'A', 'mex_azt'), -- Game 1 - 16h BRT
('wc2026_002', '2026-06-12 02:00:00Z', 'kor', 'cze', 'group', 'A', 'gua_akr'), -- Game 2 - 23h BRT

-- June 12, 2026
('wc2026_003', '2026-06-12 19:00:00Z', 'can', 'bih', 'group', 'B', 'tor_bmo'), -- Game 3 - 16h BRT
('wc2026_004', '2026-06-13 01:00:00Z', 'usa', 'par', 'group', 'D', 'la_sofi'), -- Game 4 - 22h BRT

-- June 13, 2026
('wc2026_005', '2026-06-13 01:00:00Z', 'pan', 'cro', 'group', 'L', 'bos_gil'), -- Game 5 - 22h BRT
('wc2026_006', '2026-06-13 04:00:00Z', 'aus', 'tur', 'group', 'D', 'van_bc'), -- Game 6 - 1h BRT
('wc2026_007', '2026-06-13 22:00:00Z', 'bra', 'mar', 'group', 'C', 'ny_met'), -- Game 7 - 19h BRT
('wc2026_008', '2026-06-13 19:00:00Z', 'qat', 'sui', 'group', 'B', 'sf_levi'), -- Game 8 - 16h BRT

-- June 14, 2026
('wc2026_009', '2026-06-14 23:00:00Z', 'civ', 'ecu', 'group', 'E', 'phi_lin'), -- Game 9 - 20h BRT
('wc2026_010', '2026-06-14 17:00:00Z', 'ger', 'cuw', 'group', 'E', 'hou_nrg'), -- Game 10 - 14h BRT
('wc2026_011', '2026-06-14 20:00:00Z', 'ned', 'jpn', 'group', 'F', 'dal_att'), -- Game 11 - 17h BRT
('wc2026_012', '2026-06-15 02:00:00Z', 'swe', 'tun', 'group', 'F', 'mon_bbv'), -- Game 12 - 23h BRT

-- June 15, 2026
('wc2026_013', '2026-06-15 16:00:00Z', 'esp', 'cpv', 'group', 'H', 'atl_mb'), -- Game 13 - 13h BRT
('wc2026_014', '2026-06-15 19:00:00Z', 'bel', 'egy', 'group', 'G', 'sea_lum'), -- Game 14 - 16h BRT
('wc2026_015', '2026-06-15 22:00:00Z', 'sau', 'uru', 'group', 'H', 'mia_hr'), -- Game 15 - 19h BRT
('wc2026_016', '2026-06-16 01:00:00Z', 'irn', 'nzl', 'group', 'G', 'la_sofi'), -- Game 16 - 22h BRT

-- June 16, 2026
('wc2026_017', '2026-06-16 19:00:00Z', 'fra', 'sen', 'group', 'I', 'ny_met'), -- Game 17 - 16h BRT
('wc2026_018', '2026-06-16 22:00:00Z', 'irq', 'nor', 'group', 'I', 'bos_gil'), -- Game 18 - 19h BRT
('wc2026_019', '2026-06-17 01:00:00Z', 'arg', 'alg', 'group', 'J', 'kc_arr'), -- Game 19 - 22h BRT
('wc2026_020', '2026-06-17 04:00:00Z', 'aut', 'jor', 'group', 'J', 'sf_levi'), -- Game 20 - 1h BRT

-- June 17, 2026
('wc2026_021', '2026-06-17 20:00:00Z', 'gha', 'pan', 'group', 'L', 'tor_bmo'), -- Game 21 - 17h BRT
('wc2026_022', '2026-06-17 17:00:00Z', 'por', 'cod', 'group', 'K', 'hou_nrg'), -- Game 22 - 14h BRT
('wc2026_023', '2026-06-18 01:00:00Z', 'eng', 'cro', 'group', 'L', 'dal_att'), -- Game 23 - 22h BRT
('wc2026_024', '2026-06-18 02:00:00Z', 'uzb', 'col', 'group', 'K', 'mex_azt'), -- Game 24 - 23h BRT

-- =============================================================================
-- GROUP STAGE - Second Round (June 18-23, 2026)
-- =============================================================================

-- June 18, 2026
('wc2026_025', '2026-06-18 16:00:00Z', 'cze', 'rsa', 'group', 'A', 'atl_mb'), -- Game 25 - 13h BRT
('wc2026_026', '2026-06-18 19:00:00Z', 'sui', 'bih', 'group', 'B', 'la_sofi'), -- Game 26 - 16h BRT
('wc2026_027', '2026-06-18 22:00:00Z', 'can', 'qat', 'group', 'B', 'van_bc'), -- Game 27 - 19h BRT
('wc2026_028', '2026-06-19 01:00:00Z', 'mex', 'kor', 'group', 'A', 'gua_akr'), -- Game 28 - 22h BRT

-- June 19, 2026
('wc2026_029', '2026-06-19 01:00:00Z', 'bra', 'hti', 'group', 'C', 'phi_lin'), -- Game 29 - 22h BRT
('wc2026_030', '2026-06-19 04:00:00Z', 'tur', 'par', 'group', 'D', 'sf_levi'), -- Game 30 - 1h BRT
('wc2026_031', '2026-06-19 22:00:00Z', 'sco', 'mar', 'group', 'C', 'bos_gil'), -- Game 31 - 19h BRT
('wc2026_032', '2026-06-19 19:00:00Z', 'usa', 'aus', 'group', 'D', 'sea_lum'), -- Game 32 - 16h BRT

-- June 20, 2026
('wc2026_033', '2026-06-20 20:00:00Z', 'ger', 'civ', 'group', 'E', 'tor_bmo'), -- Game 33 - 17h BRT
('wc2026_034', '2026-06-21 00:00:00Z', 'ecu', 'cuw', 'group', 'E', 'kc_arr'), -- Game 34 - 21h BRT
('wc2026_035', '2026-06-20 17:00:00Z', 'ned', 'swe', 'group', 'F', 'hou_nrg'), -- Game 35 - 14h BRT
('wc2026_036', '2026-06-21 04:00:00Z', 'tun', 'jpn', 'group', 'F', 'mon_bbv'), -- Game 36 - 1h BRT

-- June 21, 2026
('wc2026_037', '2026-06-21 22:00:00Z', 'uru', 'cpv', 'group', 'H', 'mia_hr'), -- Game 37 - 19h BRT
('wc2026_038', '2026-06-21 16:00:00Z', 'esp', 'sau', 'group', 'H', 'atl_mb'), -- Game 38 - 13h BRT
('wc2026_039', '2026-06-21 19:00:00Z', 'bel', 'irn', 'group', 'G', 'la_sofi'), -- Game 39 - 16h BRT
('wc2026_040', '2026-06-22 01:00:00Z', 'nzl', 'egy', 'group', 'G', 'van_bc'), -- Game 40 - 22h BRT

-- June 22, 2026
('wc2026_041', '2026-06-22 00:00:00Z', 'nor', 'sen', 'group', 'I', 'ny_met'), -- Game 41 - 21h BRT
('wc2026_042', '2026-06-21 21:00:00Z', 'fra', 'irq', 'group', 'I', 'phi_lin'), -- Game 42 - 18h BRT
('wc2026_043', '2026-06-22 17:00:00Z', 'arg', 'aut', 'group', 'J', 'dal_att'), -- Game 43 - 14h BRT
('wc2026_044', '2026-06-22 03:00:00Z', 'jor', 'alg', 'group', 'J', 'sf_levi'), -- Game 44 - 0h BRT

-- June 23, 2026
('wc2026_045', '2026-06-23 20:00:00Z', 'eng', 'gha', 'group', 'L', 'bos_gil'), -- Game 45 - 17h BRT
('wc2026_046', '2026-06-23 23:00:00Z', 'pan', 'cro', 'group', 'L', 'tor_bmo'), -- Game 46 - 20h BRT
('wc2026_047', '2026-06-23 17:00:00Z', 'por', 'uzb', 'group', 'K', 'hou_nrg'), -- Game 47 - 14h BRT
('wc2026_048', '2026-06-24 02:00:00Z', 'col', 'cod', 'group', 'K', 'gua_akr'), -- Game 48 - 23h BRT

-- =============================================================================
-- GROUP STAGE - Third Round (June 24-27, 2026)
-- =============================================================================

-- June 24, 2026 (Simultaneous kick-offs)
('wc2026_049', '2026-06-24 22:00:00Z', 'sco', 'bra', 'group', 'C', 'mia_hr'), -- Game 49 - 19h BRT
('wc2026_050', '2026-06-24 22:00:00Z', 'mar', 'hti', 'group', 'C', 'atl_mb'), -- Game 50 - 19h BRT
('wc2026_051', '2026-06-24 19:00:00Z', 'sui', 'can', 'group', 'B', 'van_bc'), -- Game 51 - 16h BRT
('wc2026_052', '2026-06-24 19:00:00Z', 'bih', 'qat', 'group', 'B', 'sea_lum'), -- Game 52 - 16h BRT
('wc2026_053', '2026-06-25 01:00:00Z', 'cze', 'mex', 'group', 'A', 'mex_azt'), -- Game 53 - 22h BRT
('wc2026_054', '2026-06-25 01:00:00Z', 'rsa', 'kor', 'group', 'A', 'mon_bbv'), -- Game 54 - 22h BRT

-- June 25, 2026 (Simultaneous kick-offs)
('wc2026_055', '2026-06-25 20:00:00Z', 'cuw', 'civ', 'group', 'E', 'phi_lin'), -- Game 55 - 17h BRT
('wc2026_056', '2026-06-25 20:00:00Z', 'ecu', 'ger', 'group', 'E', 'ny_met'), -- Game 56 - 17h BRT
('wc2026_057', '2026-06-25 23:00:00Z', 'jpn', 'swe', 'group', 'F', 'dal_att'), -- Game 57 - 20h BRT
('wc2026_058', '2026-06-25 23:00:00Z', 'tun', 'ned', 'group', 'F', 'kc_arr'), -- Game 58 - 20h BRT
('wc2026_059', '2026-06-26 02:00:00Z', 'tur', 'usa', 'group', 'D', 'la_sofi'), -- Game 59 - 23h BRT
('wc2026_060', '2026-06-26 02:00:00Z', 'par', 'aus', 'group', 'D', 'sf_levi'), -- Game 60 - 23h BRT

-- June 26, 2026 (Simultaneous kick-offs)
('wc2026_061', '2026-06-25 19:00:00Z', 'nor', 'fra', 'group', 'I', 'bos_gil'), -- Game 61 - 16h BRT
('wc2026_062', '2026-06-25 19:00:00Z', 'sen', 'irq', 'group', 'I', 'tor_bmo'), -- Game 62 - 16h BRT
('wc2026_063', '2026-06-26 03:00:00Z', 'egy', 'irn', 'group', 'G', 'sea_lum'), -- Game 63 - 0h BRT
('wc2026_064', '2026-06-26 03:00:00Z', 'nzl', 'bel', 'group', 'G', 'van_bc'), -- Game 64 - 0h BRT
('wc2026_065', '2026-06-27 00:00:00Z', 'cpv', 'sau', 'group', 'H', 'hou_nrg'), -- Game 65 - 21h BRT
('wc2026_066', '2026-06-27 00:00:00Z', 'uru', 'esp', 'group', 'H', 'gua_akr'), -- Game 66 - 21h BRT

-- June 27, 2026 (Simultaneous kick-offs)
('wc2026_067', '2026-06-27 21:00:00Z', 'pan', 'eng', 'group', 'L', 'ny_met'), -- Game 67 - 18h BRT
('wc2026_068', '2026-06-27 21:00:00Z', 'cro', 'gha', 'group', 'L', 'phi_lin'), -- Game 68 - 18h BRT
('wc2026_069', '2026-06-28 02:00:00Z', 'alg', 'aut', 'group', 'J', 'kc_arr'), -- Game 69 - 23h BRT
('wc2026_070', '2026-06-28 02:00:00Z', 'jor', 'arg', 'group', 'J', 'dal_att'), -- Game 70 - 23h BRT
('wc2026_071', '2026-06-27 23:30:00Z', 'col', 'por', 'group', 'K', 'mia_hr'), -- Game 71 - 20:30 BRT
('wc2026_072', '2026-06-27 23:30:00Z', 'cod', 'uzb', 'group', 'K', 'atl_mb'), -- Game 72 - 20:30 BRT

-- =============================================================================
-- ROUND OF 32 (32-avos de final - June 28 - July 3, 2026)
-- =============================================================================

-- June 28-July 3, 2026 (32-avos)
('wc2026_073', '2026-06-28 19:00:00Z', null, null, 'round32', null, 'la_sofi'), -- 2A x 2B

-- June 29, 2026
('wc2026_074', '2026-06-29 20:30:00Z', null, null, 'round32', null, 'bos_gil'), -- 1E x 3rd(ABCDF)
('wc2026_075', '2026-06-30 01:00:00Z', null, null, 'round32', null, 'mon_bbv'), -- 1F x 2C
('wc2026_076', '2026-06-29 17:00:00Z', null, null, 'round32', null, 'hou_nrg'), -- 1C x 2F

-- June 30, 2026
('wc2026_077', '2026-06-30 21:00:00Z', null, null, 'round32', null, 'ny_met'), -- 1I x 3rd(CDFGH)
('wc2026_078', '2026-06-30 17:00:00Z', null, null, 'round32', null, 'dal_att'), -- 2E x 2I
('wc2026_079', '2026-07-01 01:00:00Z', null, null, 'round32', null, 'mex_azt'), -- 1A x 3rd(CEFHI)

-- July 1, 2026
('wc2026_080', '2026-07-01 16:00:00Z', null, null, 'round32', null, 'atl_mb'), -- 1L x 3rd(EHIJK)
('wc2026_081', '2026-07-02 00:00:00Z', null, null, 'round32', null, 'sf_levi'), -- 1D x 3rd(BEFIJ)
('wc2026_082', '2026-07-01 20:00:00Z', null, null, 'round32', null, 'sea_lum'), -- 1G x 3rd(AEHIJ)

-- July 2, 2026
('wc2026_083', '2026-07-02 23:00:00Z', null, null, 'round32', null, 'tor_bmo'), -- 2K x 2L
('wc2026_084', '2026-07-02 19:00:00Z', null, null, 'round32', null, 'la_sofi'), -- 1H x 2J
('wc2026_085', '2026-07-02 03:00:00Z', null, null, 'round32', null, 'van_bc'), -- 1B x 3rd(EFGIJ)

-- July 3, 2026
('wc2026_086', '2026-07-03 20:00:00Z', null, null, 'round32', null, 'atl_mb'), -- 1J x 2H
('wc2026_087', '2026-07-04 01:30:00Z', null, null, 'round32', null, 'kc_arr'), -- 1K x 3rd(DEIJL)
('wc2026_088', '2026-07-03 18:00:00Z', null, null, 'round32', null, 'dal_att'), -- 2D x 2G

-- =============================================================================
-- ROUND OF 16 (Oitavas de final - July 4-7, 2026)
-- =============================================================================

-- July 4, 2026
('wc2026_089', '2026-07-04 21:00:00Z', null, null, 'round16', null, 'phi_lin'), -- W74 x W77
('wc2026_090', '2026-07-04 17:00:00Z', null, null, 'round16', null, 'hou_nrg'), -- W73 x W75

-- July 5, 2026
('wc2026_091', '2026-07-05 20:00:00Z', null, null, 'round16', null, 'ny_met'), -- W76 x W78
('wc2026_092', '2026-07-06 00:00:00Z', null, null, 'round16', null, 'mex_azt'), -- W79 x W80

-- July 6, 2026
('wc2026_093', '2026-07-06 18:00:00Z', null, null, 'round16', null, 'dal_att'), -- W83 x W84
('wc2026_094', '2026-07-06 23:00:00Z', null, null, 'round16', null, 'sea_lum'), -- W81 x W82

-- July 7, 2026
('wc2026_095', '2026-07-07 16:00:00Z', null, null, 'round16', null, 'atl_mb'), -- W86 x W88
('wc2026_096', '2026-07-07 20:00:00Z', null, null, 'round16', null, 'van_bc'), -- W85 x W87

-- =============================================================================
-- QUARTER FINALS (Quartas de final - July 9-11, 2026)
-- =============================================================================

-- July 9, 2026
('wc2026_097', '2026-07-09 20:00:00Z', null, null, 'quarterfinal', null, 'bos_gil'), -- W89 x W90

-- July 10, 2026
('wc2026_098', '2026-07-10 19:00:00Z', null, null, 'quarterfinal', null, 'la_sofi'), -- W93 x W94

-- July 11, 2026
('wc2026_099', '2026-07-11 21:00:00Z', null, null, 'quarterfinal', null, 'mia_hr'), -- W91 x W92
('wc2026_100', '2026-07-12 00:00:00Z', null, null, 'quarterfinal', null, 'kc_arr'), -- W95 x W96

-- =============================================================================
-- SEMI FINALS (Semifinais - July 14-15, 2026)
-- =============================================================================

-- July 14, 2026
('wc2026_101', '2026-07-14 19:00:00Z', null, null, 'semifinal', null, 'dal_att'), -- W97 x W98

-- July 15, 2026
('wc2026_102', '2026-07-15 19:00:00Z', null, null, 'semifinal', null, 'dal_att'), -- W99 x W100

-- =============================================================================
-- THIRD PLACE & FINAL (July 18-19, 2026)
-- =============================================================================

-- July 18, 2026 - Third Place
('wc2026_103', '2026-07-18 21:00:00Z', null, null, 'third_place', null, 'mia_hr'), -- L101 x L102

-- July 19, 2026 - FINAL
('wc2026_104', '2026-07-19 19:00:00Z', null, null, 'final', null, 'ny_met') -- W101 x W102

ON CONFLICT ("id") DO NOTHING;

-- =============================================================================
-- TEST DATA
-- =============================================================================

-- Test user for development
INSERT INTO "users" ("id", "name", "email", "created_at")
VALUES ('placeholder-user-id', 'Test User - FIFA 2026', 'test@copazo.com', NOW())
ON CONFLICT ("id") DO NOTHING;

-- Test pool for World Cup 2026
INSERT INTO "pools" ("id", "title", "code", "owner_id")
VALUES ('pool-wc2026', 'Copa do Mundo 2026 - Oficial', 'WC2026', 'placeholder-user-id')
ON CONFLICT ("id") DO NOTHING;

-- Add test user as participant
INSERT INTO "participants" ("id", "user_id", "pool_id")
VALUES ('part-wc2026', 'placeholder-user-id', 'pool-wc2026')
ON CONFLICT ("user_id", "pool_id") DO NOTHING;

-- =============================================================================
-- SUMMARY
-- =============================================================================
-- ✅ 48 Teams (Official FIFA qualified teams)
-- ✅ 144 Team translations (PT/EN/ES for all teams)
-- ✅ 16 Stadiums (Official FIFA venues)
-- ✅ 104 Games (Complete tournament schedule)
-- ✅ All times in UTC format for international compatibility
-- ✅ Ready for betting system with test data included
-- =============================================================================
