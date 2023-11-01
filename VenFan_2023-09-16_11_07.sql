-- Crear tabla de Departamentos
CREATE TABLE Departamentos (
    DepartamentoID INT PRIMARY KEY,
    NombreDepartamento VARCHAR(255) NOT NULL
);

-- Crear tabla de Provincias
CREATE TABLE Provincias (
    ProvinciaID INT PRIMARY KEY,
    NombreProvincia VARCHAR(255) NOT NULL,
    DepartamentoID INT,
    FOREIGN KEY (DepartamentoID) REFERENCES Departamentos(DepartamentoID)
);

-- Crear tabla de Distritos
CREATE TABLE Distritos (
    DistritoID INT PRIMARY KEY,
    NombreDistrito VARCHAR(255) NOT NULL,
    ProvinciaID INT,
    FOREIGN KEY (ProvinciaID) REFERENCES Provincias(ProvinciaID)
);

-- Crear tabla de Negocios
CREATE TABLE Negocios (
    NegocioID INT PRIMARY KEY,
    RazonSocial VARCHAR(255) NOT NULL,
    RUC VARCHAR(15) NOT NULL,
    Direccion VARCHAR(255) NOT NULL,
    DistritoID INT,
    Telefono VARCHAR(15) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL,
    PersonaContacto VARCHAR(255) NOT NULL
);

-- Crear tabla de Clientes
CREATE TABLE Clientes (
    ClienteID INT PRIMARY KEY,
    TipoCliente VARCHAR(50) NOT NULL, -- 'Persona' o 'Empresa'
    Nombre VARCHAR(255),
    Apellidos VARCHAR(255),
    DNI VARCHAR(15), -- Solo para clientes tipo 'Persona'
    RazonSocial VARCHAR(255), -- Solo para clientes tipo 'Empresa'
    Direccion VARCHAR(255) NOT NULL,
    DistritoID INT,
    Telefono VARCHAR(15) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL
);

-- Crear tabla de Servicios
CREATE TABLE Servicios (
    ServicioID INT PRIMARY KEY,
    NegocioID INT NOT NULL,
    NombreServicio VARCHAR(255) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    Duracion INT NOT NULL,
    PrecioBase DECIMAL(10, 2) NOT NULL
);

-- Crear tabla de Cotizaciones
CREATE TABLE Cotizaciones (
    CotizacionID INT PRIMARY KEY,
    ClienteID INT NOT NULL,
    FechaCotizacion DATE NOT NULL,
    FechaEvento DATE NOT NULL,
    Horario VARCHAR(255) NOT NULL,
    LugarEvento VARCHAR(255),
    Estado VARCHAR(50) NOT NULL -- 'Generado' o 'Atendido'
);

-- Crear tabla de ServiciosCotizacion (para la relación muchos a muchos entre Cotizaciones y Servicios)
CREATE TABLE ServiciosCotizacion (
    ServicioCotizacionID INT PRIMARY KEY,
    CotizacionID INT NOT NULL,
    ServicioID INT NOT NULL,
    PrecioOfertado DECIMAL(10, 2) NOT NULL
);

-- Crear tabla de OrdenesContratacion
CREATE TABLE OrdenesContratacion (
    OrdenID INT PRIMARY KEY,
    CotizacionID INT NOT NULL,
    FechaOrden DATE NOT NULL,
    HoraOrden TIME NOT NULL,
    ClienteID INT NOT NULL,
    Local VARCHAR(255),
    Direccion VARCHAR(255),
    HoraServicio TIME NOT NULL,
    NumeroCotizacionOriginal INT NOT NULL
);

-- Crear tabla de Comentarios
CREATE TABLE Comentarios (
    ComentarioID INT PRIMARY KEY,
    CotizacionID INT NOT NULL,
    Estrellas INT NOT NULL,
    Descripcion VARCHAR(255) NOT NULL
);

-- Crear índices y restricciones adicionales según sea necesario
