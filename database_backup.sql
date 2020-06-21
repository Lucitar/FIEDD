-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 21/06/2020 às 11:03
-- Versão do servidor: 10.4.11-MariaDB
-- Versão do PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `fiedd`
--
CREATE DATABASE IF NOT EXISTS `fiedd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `fiedd`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos`
--

CREATE TABLE `alunos` (
  `matricula` int(10) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `turma` enum('redes','edificacoes','automacao','massoterapia','administracao') NOT NULL DEFAULT 'redes',
  `serie` enum('1','2','3') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `alunos`
--

INSERT INTO `alunos` (`matricula`, `nome`, `senha`, `email`, `turma`, `serie`) VALUES
(111, 'Aluno', 'aluno', 'aluno@gmail.com', 'redes', '1'),
(2521395, 'Marcelo Claudio', 'aluno123', NULL, 'redes', '2'),
(2768326, 'Joao Paulo', 'aluno123', NULL, 'redes', '2'),
(2774353, 'Moises do Nascimento ', 'aluno123', NULL, 'redes', '2'),
(2794112, 'Antonio Leonardo Rolim', 'aluno123', NULL, 'redes', '2'),
(2977979, 'Davi Kleber Sousa', 'aluno123', NULL, 'redes', '2'),
(3675819, 'Levi Soares Carvalho', 'aluno123', NULL, 'redes', '2'),
(3676155, 'Alice Lopes Ferreira Fernandes de Albuquerque', 'aluno123', '', 'redes', '2'),
(3678956, 'Diego Lima', 'aluno123', NULL, 'redes', '2'),
(3682618, 'Juan Torres Pompeu', 'aluno123', NULL, 'redes', '2'),
(3698376, 'Tiago Andrade Pinto', 'aluno123', NULL, 'redes', '2'),
(3877356, 'Paulo Henrique', 'aluno123', NULL, 'redes', '2'),
(3906294, 'Jonas Oliveira', 'aluno123', NULL, 'redes', '2'),
(4128048, 'Roger Alexsander', 'aluno123', NULL, 'redes', '2'),
(4128901, 'Mayanderson de Almeida', 'aluno123', NULL, 'redes', '2'),
(4129157, 'Antony Gabriel Costa', 'aluno123', NULL, 'redes', '2'),
(4129517, 'Gabriel Alexandre', 'aluno123', NULL, 'redes', '2'),
(4129965, 'Kaylane Leandro', 'aluno123', NULL, 'redes', '2'),
(4132760, 'Tiago Bezerra Santiago', 'aluno123', NULL, 'redes', '2'),
(4133662, 'Carlos Augusto Ribeiro', 'aluno123', NULL, 'redes', '2'),
(4134167, 'Pedro Lucas Avores', 'aluno123', NULL, 'redes', '2'),
(4134722, 'Ana Alice Sousa', 'aluno123', NULL, 'redes', '2'),
(4134826, 'Pedro Miguel Alves', 'aluno123', NULL, 'redes', '2'),
(4136053, 'Ravel messias', 'aluno123', NULL, 'redes', '1'),
(4136220, 'Joao Lucas Lima', 'aluno123', NULL, 'redes', '2'),
(4136516, 'Rafael Adriano', 'aluno123', NULL, 'redes', '2'),
(4136827, 'Rodrigo Gomes Rodrigues', 'aluno123', NULL, 'redes', '2'),
(4137426, 'Israel Medeiros', 'aluno123', NULL, 'redes', '2'),
(4138908, 'Paulo Victor', 'aluno123', NULL, 'redes', '2'),
(4139156, 'Eduardo Henrique', 'aluno123', NULL, 'redes', '2'),
(4139203, 'Avila Ellen Ferreira', 'aluno123', NULL, 'redes', '2'),
(4139226, 'Joao Wesley', 'aluno123', NULL, 'redes', '2'),
(4139254, 'Lucas Ferreira dos Santos', 'aluno123', NULL, 'redes', '2'),
(4139369, 'Joao Victor Fontenele', 'aluno123', NULL, 'redes', '2'),
(4139582, 'Victor Lucio Lopes', 'aluno123', NULL, 'redes', '2'),
(4140877, 'Alan Oliveira', 'aluno123', NULL, 'redes', '2'),
(4145040, 'Giovana Cancio Pereira', 'aluno123', NULL, 'redes', '2'),
(4145195, 'Daniel Henrique Rocha', 'aluno123', NULL, 'redes', '2'),
(4145655, 'Yohane Cavalcante Xavier', 'aluno123', 'yoh@gmail.com', 'redes', '2'),
(4145768, 'Francisco Vitor', 'aluno123', 'aluno123', 'redes', '2'),
(4145792, 'Beatriz Campelo', 'aluno123', NULL, 'redes', '2'),
(4150935, 'Yasmin Araujo ', 'aluno123', NULL, 'redes', '2'),
(4153877, 'Eduardo Fernandes', 'aluno123', NULL, 'redes', '2'),
(4162178, 'Giovanni Lopes', 'aluno123', NULL, 'redes', '2'),
(39008503, 'Matheus Felipe Silva', 'aluno123', NULL, 'redes', '2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `anotacoes`
--

CREATE TABLE `anotacoes` (
  `id` int(10) UNSIGNED NOT NULL,
  `cpf` int(10) UNSIGNED DEFAULT NULL,
  `titulo_anotacao` varchar(100) NOT NULL,
  `anotacao` varchar(200) NOT NULL,
  `data_de_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `anotacoes`
--

INSERT INTO `anotacoes` (`id`, `cpf`, `titulo_anotacao`, `anotacao`, `data_de_envio`) VALUES
(1, 1, 'Quero  aprender a fazer café', 'Pesquisar na wikipedia', '2019-10-13 20:19:49'),
(6, 1, 'Enviar Provas dia 15/10/2019', '....', '2019-10-15 14:40:17'),
(9, 111, 'Aula em campo', 'no exercito', '2019-10-16 12:18:29'),
(10, 111, 'Eletroquímica', 'Redox', '2019-11-19 13:24:16'),
(11, 4294967295, 'Aula Prática', 'Aula em campo, testando Patch Panel.', '2019-11-29 12:29:34');

-- --------------------------------------------------------

--
-- Estrutura para tabela `arquivos`
--

CREATE TABLE `arquivos` (
  `id` int(10) UNSIGNED NOT NULL,
  `nomeoriginal` varchar(100) NOT NULL,
  `nomearmazenado` varchar(100) NOT NULL,
  `disciplina` varchar(100) NOT NULL,
  `bimestre` enum('1','2','3','4','TEC','REC') NOT NULL,
  `turma` enum('1','2','3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `arquivos`
--

INSERT INTO `arquivos` (`id`, `nomeoriginal`, `nomearmazenado`, `disciplina`, `bimestre`, `turma`) VALUES
(11, '5º horário - 02.09.2019.pdf', 'arquivo-15-10-2019-11-56-53-PM.pdf', 'Conhecimentos Gerais', '', '1'),
(12, '1º ano - Sistema muscular x Exercício físico.pdf', 'arquivo-15-10-2019-11-57-21-PM.pdf', 'Conhecimentos Gerais', '', '1'),
(13, '2º ano - Composição Corporal.pdf', 'arquivo-15-10-2019-11-57-28-PM.pdf', 'Conhecimentos Gerais', '', '2'),
(15, 'Conceitos visuais - Redes 2.pdf', 'arquivo-15-10-2019-11-58-44-PM.pdf', 'Conhecimentos Gerais', '', '2'),
(16, 'ANÁLISE E PROGRAMAÇÃO.pdf', 'arquivo-15-10-2019-11-58-58-PM.pdf', 'Conhecimentos Gerais', '', '2'),
(17, 'fisica.odt', 'arquivo-15-10-2019-11-59-44-PM.odt', 'Conhecimentos Gerais', '', '3'),
(18, 'ROTEIRO GERAL 2019 (3º BIMESTRE)-1.pdf', 'arquivo-16-10-2019-12-00-04-AM.pdf', 'Conhecimentos Gerais', '', '1'),
(19, 'Guia_Arduino_Iniciante_Multilogica_Shop.pdf', 'arquivo-16-10-2019-12-01-25-AM.pdf', 'Conhecimentos Gerais', '', '3'),
(20, 'Globalização.pdf', 'arquivo-16-10-2019-12-02-07-AM.pdf', 'Conhecimentos Gerais', '', '2'),
(22, 'questãoOBMEP_desafio1.jpg', 'arquivo-16-10-2019-12-04-08-AM.jpg', 'Conhecimentos Gerais', '', '3'),
(25, 'Reino Animalia - Filo Platyhelmintes e Nematoda.pdf', 'arquivo-16-10-2019-03-58-56-PM.pdf', 'Conhecimentos Gerais', '', '2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `chat_redes`
--

CREATE TABLE `chat_redes` (
  `id` int(10) UNSIGNED NOT NULL,
  `remetente` varchar(100) NOT NULL,
  `mensagem` varchar(250) NOT NULL,
  `data_de_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `chat_redes`
--

INSERT INTO `chat_redes` (`id`, `remetente`, `mensagem`, `data_de_envio`) VALUES
(78, 'Gabriel Alex André', 'Atenção alunos. Amanhã haverá aula prática. Iremos ao laboratório realizar uma atividade prática envolvendo Patch Panel e os conhecimentos adquiridos em aula.', '2019-11-29 12:31:26'),
(79, 'Ravel messias', 'Ok Professor.', '2019-11-29 12:33:38'),
(80, 'Kaylane Leandro', 'Professor, que dia deve ser entregue o trabalho sobre Python?', '2019-11-29 12:49:32'),
(81, 'andre', 'Quarta-feira, meu anjo.', '2019-11-29 12:52:22');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `cpf` int(16) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nivel_acesso` enum('0','1','2') NOT NULL DEFAULT '0',
  `inep` int(8) NOT NULL DEFAULT 23072750,
  `disciplina` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `funcionarios`
--

INSERT INTO `funcionarios` (`cpf`, `nome`, `senha`, `email`, `nivel_acesso`, `inep`, `disciplina`) VALUES
(1, 'andre', 'andre', 'andre@', '1', 23072750, 'Técnico de Redes'),
(2, 'paulo', 'paulo', 'paulo@', '2', 23072750, NULL),
(3, 'Rayne', 'rayne', 'rayne@gmail.com', '1', 23072750, 'Física'),
(4, 'Vinicius', 'Vinicius', 'vinicius@gmail.com', '1', 23072750, 'História'),
(5, 'Vancini', 'vancini', 'vancini@gmail.com', '1', 23072750, 'Geografia'),
(6, 'Lucilo', 'lucilo', 'lucilo@gmail.com', '1', 23072750, 'Matemática'),
(7, 'Ériko', 'eriko', 'eriko@gmail.com', '1', 23072750, 'Matemática'),
(8, 'Fábio', 'fabio', 'fabio@gmail.com', '1', 23072750, 'Matemática'),
(111, 'Professor', 'professor', 'professor@gmail.com', '1', 23072750, 'Conhecimentos Gerais'),
(222, 'Coordenador', 'coordenador', 'coordenador@gmail.com', '2', 23072750, NULL),
(27563456, 'Lopênzio Bezerra', 'teste', 'lopes.bezerra@gmail.com', '2', 23072750, NULL),
(4294967295, 'Gabriel Alex André', 'teste', 'gabi.a.o.mendes23@gmail.com', '1', 23072750, 'Técnico de Redes');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ouvidoria`
--

CREATE TABLE `ouvidoria` (
  `id` int(100) UNSIGNED NOT NULL,
  `matricula_remetente` int(100) NOT NULL,
  `nome_remetente` varchar(100) NOT NULL,
  `tipo` enum('sugestao','reclamacao','outros','') NOT NULL,
  `data_de_envio` timestamp NOT NULL DEFAULT current_timestamp(),
  `mensagem` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `ouvidoria`
--

INSERT INTO `ouvidoria` (`id`, `matricula_remetente`, `nome_remetente`, `tipo`, `data_de_envio`, `mensagem`) VALUES
(13, 3676155, 'Alice Lopes Ferreira Fernandes de Albuquerque', 'sugestao', '2019-10-14 18:46:46', 'Bolo na merenda da tarde todos os dias'),
(16, 111, 'Aluno', 'reclamacao', '2019-10-16 17:36:25', 'quero bolo todo dia'),
(19, 111, 'Aluno', 'reclamacao', '2019-10-16 18:21:40', 'merenda');

-- --------------------------------------------------------

--
-- Estrutura para tabela `recomendacoes`
--

CREATE TABLE `recomendacoes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome_sugestao` varchar(50) NOT NULL,
  `comentario_sugestao` varchar(200) NOT NULL,
  `tipo_sugestao` enum('Livros','Filmes','Séries','Documentários','Sites/Links','Outros') NOT NULL,
  `disciplina` varchar(100) NOT NULL,
  `turma` varchar(100) NOT NULL,
  `serie` enum('1','2','3') NOT NULL,
  `data_de_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `recomendacoes`
--

INSERT INTO `recomendacoes` (`id`, `nome_sugestao`, `comentario_sugestao`, `tipo_sugestao`, `disciplina`, `turma`, `serie`, `data_de_envio`) VALUES
(3, 'A teoria de tudo', 'O filme expõe como o astrofísico Stephen Hawking fez descobertas relevantes para o mundo da ciência, inclusive relacionadas ao tempo.', 'Filmes', 'Física', 'undefined', '1', '2019-10-15 12:58:57'),
(4, 'Guerras do Brasil.doc', 'Detalha como o Brasil foi formado por séculos de conflito armado, desde os primeiros conquistadores até a violência nos dias de hoje.', 'Séries', 'História', 'undefined', '2', '2019-10-15 13:01:37'),
(5, 'Círculo de fogo', 'Fala sobre a II Guerra Mundial - União Soviética vs. Alemanha', 'Filmes', 'História', 'undefined', '3', '2019-10-15 13:09:21'),
(6, 'Ciência Viva - Vulcões', 'Dez armas mais mortais do arsenal vulcânico, de fragmentos de cinzas e rochas, e rios de lama mortais a extinção global em massa.', 'Documentários', 'Geografia', 'undefined', '2', '2019-10-15 13:12:52'),
(7, 'Softblue', 'Disponibilização de vários cursos na área da informática', 'Sites/Links', 'Técnico de Redes', 'undefined', '1', '2019-10-15 13:17:43'),
(8, 'Redes de Computadores - Gabriel Torres', 'Informações e explicações sobre diversos assuntos na área de Redes', 'Livros', 'Técnico de Redes', 'undefined', '1', '2019-10-15 13:22:50'),
(9, '1984', 'É retratado um futuro distópico em que um Estado totalitário controla e manipula toda forma de registro histórico e contemporâneo, a fim de moldar a opinião pública a favor dos governantes.', 'Livros', 'História', 'undefined', '3', '2019-10-15 13:30:54'),
(15, 'enem', 'é bom', 'Livros', 'Conhecimentos Gerais', 'undefined', '3', '2019-10-16 18:09:48'),
(16, 'matriz', '', 'Filmes', 'Conhecimentos Gerais', 'undefined', '3', '2019-10-16 18:59:33'),
(17, 'O morro dos ventos uivantes', 'leiam, é baum', 'Livros', 'Conhecimentos Gerais', 'undefined', '1', '2019-11-19 13:25:37'),
(18, 'fazerem silêncio', 'put* crítica social fod*', 'Outros', 'Conhecimentos Gerais', 'undefined', '2', '2019-11-19 13:31:01');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`matricula`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `anotacoes`
--
ALTER TABLE `anotacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `arquivos`
--
ALTER TABLE `arquivos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `chat_redes`
--
ALTER TABLE `chat_redes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`cpf`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `ouvidoria`
--
ALTER TABLE `ouvidoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `recomendacoes`
--
ALTER TABLE `recomendacoes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `anotacoes`
--
ALTER TABLE `anotacoes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `arquivos`
--
ALTER TABLE `arquivos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `chat_redes`
--
ALTER TABLE `chat_redes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de tabela `ouvidoria`
--
ALTER TABLE `ouvidoria`
  MODIFY `id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `recomendacoes`
--
ALTER TABLE `recomendacoes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
