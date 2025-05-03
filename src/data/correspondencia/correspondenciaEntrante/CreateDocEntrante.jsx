import React, { useState } from "react";
import { FaBackspace, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { SelectField } from "../../../components/shared/SelectField";
import { InputField } from "../../../components/shared/InputField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useDocEntranteMutations } from "../../../hooks/useEntities"; // Para enviar la solicitud a la API
import { obtenerIdUser } from "../../../utils/auth"; // Obtener el ID del usuario actual

export default function CreateDocEntrante() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(), // ID del usuario actual
  };

  // Opciones para el select de contacto
  const contactoOptions = () =>
    paraSelectsdestructuringYMap(
      useContactos, // Suponiendo que tienes un hook para obtener los contactos
      true,
      "id_contacto",
      "nombre_completo"
    );

  // Opciones para el select de prioridad
  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  // Opciones para el select de estado
  const opcionEstado = [
    { id: "borrador", nombre: "Borrador" },
    { id: "en_revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];

  // Configuración inicial del formulario
  const configuracionFormulario = {
    nro_registro: "",
    fecha_recepcion: "",
    fecha_respuesta: "",
    tipo: "recibido", // Valor predeterminado para tipo
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    documento: "",
    contacto: "",
    comentario: "",
    correspondencia: null, // Enlace a la correspondencia
  };

  // Función para obtener los datos adicionales de los campos antes de enviarlos
  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto), // Convertir contacto a número
    usuario: logicaNegocio.idUsuario, // ID del usuario que está creando el documento
    correspondencia: Number(formValues.correspondencia), // ID de la correspondencia
  });

  // Función para configurar el envío de datos al backend
  const paraEnvio = (formValues) => ({
    link: "/correspondenciaList", // Ruta de destino tras la creación
    params: camposExtras(formValues), // Datos adicionales
  });

  // Función para crear los campos del formulario
  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nro de Registro",
      name: "nro_registro",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Recepción",
      name: "fecha_recepcion",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Respuesta",
      name: "fecha_respuesta",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Referencia",
      name: "referencia",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Descripción",
      name: "descripcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Páginas",
      name: "paginas",
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Prioridad",
      name: "prioridad",
      options: opcionPrioridad,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Estado",
      name: "estado",
      options: opcionEstado,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Comentario",
      name: "comentario",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
   
    {
      component: InputField,
      label: "Documento",
      name: "documento",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
      required: false,
    },
  ];

  // Configuración para la navegación y acciones
  const paraNavegacion = {
    title: "Registrar Correspondencia Entrante",
    subTitle: "Registro de correspondencia entrante",
    icon: FaPlus, // Icono para el título
    actions: [
      {
        to: "/correspondenciaList", // Ruta para volver a la lista
        label: "Volver",
        icon: FaBackspace, // Icono para el botón de volver
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useDocEntranteMutations} // Hook para gestionar las mutaciones del DocEntrante
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
