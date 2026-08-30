CREATE TABLE filme (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       titulo VARCHAR(100) NOT NULL,
                       diretor VARCHAR(100) NOT NULL,
                       genero VARCHAR(50) NOT NULL,
                       ano_lancamento INT NOT NULL,
                       duracao INT NOT NULL,
                       sinopse VARCHAR(500) NOT NULL
);