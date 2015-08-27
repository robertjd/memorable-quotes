SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- CREATE TABLE IF NOT EXISTS `mt_user` (
--  `user_id` int(11) NOT NULL AUTO_INCREMENT,
--  `username` varchar(100) NOT NULL,
--  `email` varchar(100) NOT NULL,
--  `password` varchar(100) NOT NULL,
--  `firstname` varchar(100) NOT NULL,
--  `lastname` varchar(100),
--  `zipcode` varchar(100),
--  `gender` varchar(10) NOT NULL,
--  `birthdate` date NOT NULL,
--  PRIMARY KEY (`user_id`)
--  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6;

CREATE TABLE IF NOT EXISTS `mt_quote` (
  `quote_id` int(11) NOT NULL AUTO_INCREMENT,
  `quote` varchar(200) NOT NULL,
	
  PRIMARY KEY (`quote_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7;

CREATE TABLE IF NOT EXISTS `mt_bg` (
  `bg_id` int(11) NOT NULL AUTO_INCREMENT,
  `smallImg` varchar(100) NOT NULL,
	`largeImg` varchar(100) NOT NULL,
  PRIMARY KEY (`bg_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7;

-- 
-- Dumping data for table `mt_user`
-- 
-- INSERT INTO `mt_user` 
-- (`user_id`, `username`, `email`, `password`, `firstname`, `lastname`, `zipcode`, `gender`, `birthdate`) 
-- VALUES
-- (1, 'mbanyar', 'banyar@yahoo.com', '123', 'Mas', 'Banyar', '123', 'm', '1983-04-27'),
-- (2, 'mapmup', 'mapmup@gmail.com', '123', 'Map', 'mup', '123', 'm', '1983-04-27'),
-- (3, 'rapmup', 'rapmup@gmail.com', '123', 'Rap', 'rup', '123', 'm', '1983-04-27'),
-- (4, 'borononn','borononn@yahoo.com', '123', 'Borononn', '', '123', 'm', '1983-04-27'),
-- (5, 'nadya', 'nadya@yahoo.com', 'bonbon032932', 'Nadya', 'Ek', '123', 'f', '1983-04-27');

-- 
-- Dumping data for table `mt_user`
-- 
INSERT INTO `mt_quote` 
(`quote_id`, `quote`, `author`) 
VALUES
(1, 'Patience and fortitude conquer all things', 'Ralph Waldo Emerson'),
(2, 'Necessity is the mother of taking chances', 'Mark Twain' ),
(3, 'Love all. Trust a few. Do wrong to none', 'William Shakespeare'),
(4, 'Whatever is begun in anger ends in shame', 'Benjamin Franklin'),
(5, 'I criticize by creation, not by finding fault', 'Cicero'),
(6, 'Character is much easier kept than recovered', 'Thomas Paine'),

-- 
-- Dumping data for table `mt_user`
-- 
INSERT INTO `mt_bg` 
(`bg_id`, `smallImg`, `largeImg`) 
VALUES
(1, 'images/bg01-small-320x480.png', 'images/bg01-large-1366x900.png')
(2, 'images/bg02-small-320x480.png', 'images/bg02-large-1366x900.png')
(3, 'images/bg03-small-320x480.png', 'images/bg03-large-1366x900.png')
(4, 'images/bg04-small-320x480.png', 'images/bg04-large-1366x900.png')
(5, 'images/bg05-small-320x480.png', 'images/bg05-large-1366x900.png')
(6, 'images/bg06-small-320x480.png', 'images/bg06-large-1366x900.png')

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
