CREATE TABLE `clientes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `imagen` image,
  `nombre` varchar(255),
  `apellido` varchar(255),
  `movil` varchar(255),
  `direccion` varchar(255),
  `cif` varchar(255),
  `eliminado` boolean,
  `created_at` date
);

CREATE TABLE `usuarios` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `imagen` blob,
  `username` varchar(255),
  `password` varchar(255),
  `key` varchar(255),
  `nombre` varchar(255),
  `apellido` varchar(255),
  `cif` varchar(255),
  `status` varchar(255),
  `rol` varchar(255),
  `eliminado` boolean,
  `created_at` date
);

CREATE TABLE `empresas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(255),
  `nit` varchar(255),
  `imagen` blob,
  `direccion` varchar(255),
  `status` boolean,
  `created_at` date
);

CREATE TABLE `ordenProduccion` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `idClientes` int,
  `numOrdenProduccion` int,
  `codigoOrden` varchar(255),
  `revision` int,
  `pedido` int,
  `propiedadCliente` int,
  `fechaEntregaProgramada` date,
  `autorizadoPor` varchar(255),
  `exportPais` boolean,
  `programadoPor` varchar(255),
  `fecha` date,
  `fechaAutorizacion` date,
  `fechaEntregadaJefePlanta` date,
  `fechaEntregaAlmacen` date,
  `idUsuario` int,
  `eliminado` boolean
);

CREATE TABLE `detallesOrdenProduccion` (
  `idOrdenProduccion` int,
  `idProducto` int,
  `cantidad` double,
  `uso` varchar(255),
  `observaciones` varchar(255),
  `fabricMolde` boolean,
  `fechaEntregaRequerida` date
);

CREATE TABLE `Productos` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `referencia` varchar(255),
  `descripcion` varchar(255),
  `stock` double,
  `imagen` blob,
  `status` boolean,
  `eliminado` boolean,
  `created_at` date
);

CREATE TABLE `programacionSemanales` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `codigo` varchar(255),
  `fechaDelDia` date,
  `revision` int,
  `elaboro` varchar(255),
  `modificaciones` int,
  `fechaArchivo` date,
  `idOperario` int,
  `idMaquinas` int,
  `eliminado` boolean,
  `created_at` date
);

CREATE TABLE `operarios` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `apellido` varchar(255),
  `cif` varchar(255),
  `imagen` blob,
  `status` boolean,
  `eliminado` boolean
);

CREATE TABLE `controlMezclas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `codigo` varchar(255),
  `revision` int,
  `fechaDia` date,
  `fechaMes` date,
  `entrada` int,
  `comienzo` int,
  `salida` double,
  `saldo` double,
  `observaciones` varchar(255),
  `responsable` varhar,
  `firma` image,
  `resinaIntMaq` int,
  `resinaExtMaq` int,
  `resinatMaq` int,
  `resinaIntTot` int,
  `resinaExtTot` int,
  `resinaTMes` int,
  `fechaArchivo` date,
  `hoja` int,
  `de` int,
  `idUsuario` int,
  `idMaquinas` int,
  `created_at` date,
  `eliminado` boolean
);

CREATE TABLE `maquinas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(255),
  `status` boolean,
  `created_at` date,
  `eliminado` boolean
);

CREATE TABLE `planillaMensualPulido` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `codigo` varchar(255),
  `revision` int,
  `desde` date,
  `hasta` date,
  `pulidor` varchar(255),
  `lunes` varchar(255),
  `martes` varchar(255),
  `miercoles` varchar(255),
  `jueves` varchar(255),
  `viernes` varchar(255),
  `sabado` varchar(255),
  `domingo` varchar(255),
  `programado` varchar(255),
  `fechaArchivo` date,
  `firma` blob,
  `created_at` date,
  `eliminado` boolean
);

CREATE TABLE `despacho` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `vendedor` varchar(255),
  `numcotizacion` varchar(255),
  `revision` int,
  `nombrePersoCompra` varchar(255),
  `dirEntregFacturas` varchar(255),
  `dirCiudadEntregFacturas` varchar(255),
  `requiereInspeCliente` boolean,
  `requierePruebas` boolean,
  `condicionReglasAplican` boolean,
  `anticipo` boolean,
  `saldoAnuncioMaterialDespacho` boolean,
  `saldoAlReciboMaterial` boolean,
  `saldoAlReciboFactura` boolean,
  `saldoDiasDeRadicadaFactura` boolean,
  `creditoDiasDeRadicadaFactura` boolean,
  `aceptaEntregasParciales` boolean,
  `aceptaFacturacionParcial` boolean,
  `polizaCumplimientoContrato` boolean,
  `polizaBuenManejoAnticipo` boolean,
  `polizaGarantinaMateriales` boolean,
  `polizaCargoCliente` boolean,
  `cobrarFleteConSeguroFactura` boolean,
  `despachoFleteAlCobro` boolean,
  `incluyeProductSuminCliente` boolean,
  `anexaPlanos` boolean,
  `planosPendientAnexar` boolean,
  `requiereDocumentacionAdicional` boolean,
  `responsable` varchar(255),
  `ordenCompraAprobada` boolean,
  `programarDespacho` char,
  `NotificarDiscrepancia` char
);

ALTER TABLE `ordenProduccion` ADD FOREIGN KEY (`idClientes`) REFERENCES `clientes` (`id`);

ALTER TABLE `ordenProduccion` ADD FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

ALTER TABLE `detallesOrdenProduccion` ADD FOREIGN KEY (`idOrdenProduccion`) REFERENCES `ordenProduccion` (`id`);

ALTER TABLE `detallesOrdenProduccion` ADD FOREIGN KEY (`idProducto`) REFERENCES `Productos` (`id`);

ALTER TABLE `programacionSemanales` ADD FOREIGN KEY (`idOperario`) REFERENCES `operarios` (`id`);

ALTER TABLE `controlMezclas` ADD FOREIGN KEY (`idMaquinas`) REFERENCES `maquinas` (`id`);

ALTER TABLE `controlMezclas` ADD FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

ALTER TABLE `programacionSemanales` ADD FOREIGN KEY (`idMaquinas`) REFERENCES `maquinas` (`id`);
