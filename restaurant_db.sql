-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 29, 2022 at 05:08 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `restaurant_id` int(10) NOT NULL,
  `restaurant_name` varchar(255) DEFAULT NULL,
  `atDate` date NOT NULL,
  `atTime` time NOT NULL,
  `tableNumber` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `user_id`, `restaurant_id`, `restaurant_name`, `atDate`, `atTime`, `tableNumber`) VALUES
(5, 57, 4, 'chinese food', '2022-04-23', '19:24:00', 1),
(6, 60, 2, 'thai food', '2022-04-30', '20:52:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `restaurant_id` int(10) NOT NULL,
  `rating` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `user_id`, `restaurant_id`, `rating`) VALUES
(1, 57, 1, 4),
(2, 59, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `table_numbers` int(10) NOT NULL DEFAULT '0',
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `table_numbers`, `img_path`) VALUES
(1, 'japan food', 15, '/image/restaurant_japan_food.jpg'),
(2, 'thai food', 15, '/image/restaurant_thai_food.jpg'),
(3, 'sea food', 18, '/image/restaurant_sea_food.jpg'),
(4, 'chinese food', 15, '/image/restaurant_chinese_food.jpg'),
(5, 'korean food', 15, '/image/restaurant_korean_food.jpg'),
(6, 'Shinkanzen Omakase', 5, '/image/Shinkanzen_Omakase.jpg'),
(7, 'MASA - Otaru Masazushi', 5, '/image/MASA - Otaru Masazushi.jpg'),
(8, 'OJI', 5, '/image/OJI.jpg'),
(9, 'Ren Omakase', 5, '/image/Ren Omakase.jpg'),
(10, 'Shabu2N', 12, '/image/Shabu2N.jpg'),
(11, 'Shabu Chain Paseo', 12, '/image/Shabu Chain Paseo.jpg'),
(12, 'Kenshiro Shabu', 13, '/image/Kenshiro Shabu.jpg'),
(13, 'Ocha Shabu', 14, '/image/Ocha Shabu.jpg'),
(14, 'Bankoku - Shabu Dee', 10, 'image/Bankoku - Shabu Dee.jpg'),
(15, 'Seabar Buffet', 15, '/image/Seabar Buffet.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `urole` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `phone`, `urole`) VALUES
(57, 'admin', '123456', '0000000000', 'admin'),
(58, 'admin123456', '123456789', '0845113245', 'admin'),
(59, 'ghgygkh121', 'ghgygkh121', '1234567984', 'user'),
(60, 'adminadmin123456', '123456789', '654654165465', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
