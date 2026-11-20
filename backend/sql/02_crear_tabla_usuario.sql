CREATE TABLE usuario (
id_usuario INT auto_increment primary key,
nombre_usuario varchar(50) not null unique,
clave_hash varchar(255) not null,
rol ENUM('admin','gestor') not null default 'gestor',
activo tinyint(1) not null default 1,
fecha_creacion datetime not null default current_timestamp
);