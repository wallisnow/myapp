DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `users` (`user`, `user_type`) VALUES
                       ('Robin', 'Software Engineer'),
                       ('Taylor', 'Software Architect'),
                       ('Vivian', 'Database Administrator'),
                       ('Harry', 'Database Administrator');