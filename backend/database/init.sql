-- Veritabanını oluştur
CREATE DATABASE IF NOT EXISTS arac_sevk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;

USE arac_sevk_db;

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tcKimlikNo VARCHAR(11) NOT NULL UNIQUE,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    sifre VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'kullanici') DEFAULT 'kullanici',
    aktif BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Şoförler tablosu
CREATE TABLE IF NOT EXISTS drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    tcKimlikNo VARCHAR(11) NOT NULL UNIQUE,
    telefon VARCHAR(15) NOT NULL,
    ehliyetSinifi VARCHAR(10),
    aktif BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Araçlar tablosu
CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plaka VARCHAR(20) NOT NULL UNIQUE,
    marka VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    modelYili INT,
    kilometresi DECIMAL(10,2) NOT NULL DEFAULT 0,
    sonGorevKilometresi DECIMAL(10,2),
    durum ENUM('MUSAIT', 'GOREVDE', 'GOREV_TAMAMLANDI') DEFAULT 'MUSAIT',
    aktif BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Görevler tablosu
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicleId INT NOT NULL,
    driverId INT NOT NULL,
    gorevTipi VARCHAR(100) NOT NULL,
    guzergah VARCHAR(255) NOT NULL,
    baslangicKm DECIMAL(10,2) NOT NULL,
    bitisKm DECIMAL(10,2),
    durum ENUM('BEKLEMEDE', 'DEVAM_EDIYOR', 'TAMAMLANDI') DEFAULT 'BEKLEMEDE',
    baslamaTarihi TIMESTAMP,
    bitisTarihi TIMESTAMP,
    notlar TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Görev Tipleri tablosu
CREATE TABLE IF NOT EXISTS task_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(100) NOT NULL UNIQUE,
    aciklama TEXT,
    aktif BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Örnek veriler

-- Admin kullanıcısı (şifre: admin123)
INSERT INTO users (tcKimlikNo, ad, soyad, sifre, rol) VALUES 
('11111111111', 'Admin', 'User', '$2a$08$rGN7ZZQ7HvdXwRQzC5WRyOQJqM8ZIGe6JmCXS.wZF6.a5Fb8EUlIG', 'admin');

-- Test kullanıcısı (şifre: test123)
INSERT INTO users (tcKimlikNo, ad, soyad, sifre, rol) VALUES 
('22222222222', 'Test', 'User', '$2a$08$rBr1DeNwDp.0EPfP5D9XYO8hy9eVvE8ePuV69x7UYY6FlYwqwxf8q', 'kullanici');

-- Örnek şoförler
INSERT INTO drivers (ad, soyad, tcKimlikNo, telefon, ehliyetSinifi) VALUES
('Ahmet', 'Yılmaz', '33333333333', '5551112233', 'B'),
('Mehmet', 'Kaya', '44444444444', '5552223344', 'E');

-- Örnek araçlar
INSERT INTO vehicles (plaka, marka, model, modelYili, kilometresi) VALUES
('34ABC123', 'Mercedes', 'Sprinter', 2020, 50000),
('34XYZ789', 'Ford', 'Transit', 2021, 35000);

-- Örnek görev tipleri
INSERT INTO task_types (ad, aciklama) VALUES
('Şehir İçi Teslimat', 'Şehir içi kargo ve evrak teslimatı'),
('Şehirler Arası Nakliye', 'Şehirler arası yük taşıma'),
('Personel Servisi', 'Personel taşıma hizmeti');

-- Örnek görevler
INSERT INTO tasks (vehicleId, driverId, gorevTipi, guzergah, baslangicKm, durum) VALUES
(1, 1, 'Şehir İçi Teslimat', 'Kadıköy-Üsküdar-Ümraniye', 50000, 'BEKLEMEDE'),
(2, 2, 'Personel Servisi', 'Beylikdüzü-Esenyurt-Avcılar', 35000, 'BEKLEMEDE');
