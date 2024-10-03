const validarMascota = (data) => {
  const { nombre_apodo, especie, raza, color, anio_nacimiento } = data;

  // Validación del nombre_apodo
  if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[\w\sñáéíóúü]+$/.test(nombre_apodo)) {
      return "Nombre-apodo inválido. Solo se permiten letras y espacios.";
  }

  // Validación de especie
  if (!especiesPermitidas.includes(especie)) {
      return "Especie inválida. Debe ser una de las opciones permitidas.";
  }

  // Validación de raza
  if (!razasPermitidas.includes(raza)) {
      return "Raza inválida. Debe ser una de las opciones permitidas.";
  }

  // Validación de color
  if (!coloresPermitidos.includes(color)) {
      return "Color inválido. Debe ser uno de los colores permitidos.";
  }

  // Validación del año de nacimiento
  const currentYear = new Date().getFullYear();
  if (!anio_nacimiento || isNaN(anio_nacimiento) || anio_nacimiento < 2000 || anio_nacimiento > currentYear) {
      return "Año de nacimiento inválido.";
  }

  return null; // No hay errores
