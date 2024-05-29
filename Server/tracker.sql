-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 04:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `tracker`
--
DROP DATABASE IF EXISTS `tracker`;
CREATE DATABASE IF NOT EXISTS `tracker` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tracker`;



--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `uuid` varchar(36) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `sex` varchar(12) NOT NULL DEFAULT 'thing',
  `address` varchar(100) DEFAULT NULL,
  `postalcode` varchar(10) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uuid`, `username`, `password`, `email`, `is_admin`, `firstname`, `lastname`, `sex`, `address`, `postalcode`, `city`, `country`) VALUES
(1, '25d8e727-a0ee-11ee-b4cd-1c697ab46a24', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'admin@admin.com', 1, 'Admine', 'Adminsdorfer', 'female', 'Admingasse 1/2/3', '8010', 'Graz', 'Austria'),
(2, '25d8e988-a0ee-11ee-b4cd-1c697ab46a24', 'Andreas', 'b15c342f1de186996bcca5e1a23cd684d2fadb32', 'andreas@schenk.com', 0, 'Andreas', 'Schenk', 'male', 'Spengergasse 20', '1050', 'Wien', 'Österreich'),
(3, '25d8ea70-a0ee-11ee-b4cd-1c697ab46a24', 'test', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'test@test.com', 0, 'Testi', 'Testo', 'male', 'Teststraße 99a', '4020', 'Linz', 'Austria'),
(26, NULL, 'a', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'a', 0, NULL, NULL, 'thing', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------
--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `user_index` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

COMMIT;