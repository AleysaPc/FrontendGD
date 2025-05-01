import { InputField } from "../../../components/shared/InputField"
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useContactos, useDocEntranteMutations } from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import {  obtenerIdUser } from "../../../utils/auth";

export default function createDocEntrante() {

  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const contactoOptions = ()  => //Modelo 2
    paraSelectsdestructuringYMap(
      useContactos,
      true, //maneja la logica de la paginacion
      "id_contacto",
      "nombre_completo",
      
    );

    const opcionPrioridad = [
      { id: "alta", nombre: "Alta" },
      { id: "media", nombre: "Media" },
      { id: "baja", nombre: "Baja" },
    ];
  
    const opcionEstado = [
      { id: "borrador", nombre: "Borrador" },
      { id: "en revision", nombre: "En revisión" },
      { id: "aprobado", nombre: "Aprobado" },
      { id: "rechazado", nombre: "Rechazado" },
  
    ];

  const configuracionFormulario = { //Modelo 3 - Correspondencia
    nro_registro: "",
    fecha_recepcion: "",
    fecha_respuesta: "",
    tipo: "recibido",
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    documento: "",
    contacto: "", //Es el nombre del FK que tiene conectado con la correspondencia
  };

  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuario: logicaNegocio.idUsuario,
  });

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [

    {
      component : InputField,
      label : "Nro de Registro",
      name : "nro_registro",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Recepcion",
      name: "fecha_recepcion",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component : InputField,
      label : "Fecha de Respuesta",
      name : "fecha_respuesta",
      type : "date",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : InputField,
      label : "Referencia",
      name : "referencia",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : InputField,
      label : "Descripción",
      name : "descripcion",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : InputField,
      label : "Paginas",
      name : "paginas",
      type : "number",
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : SelectField,
      label : "Prioridad",
      name : "prioridad",
      options : opcionPrioridad,
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component : SelectField,
      label : "Estado",
      name : "estado",
      options : opcionEstado,
      required : true,
      onChange : manejarEntradas.handleInputChange,

    },

    {
      component : SelectField,
      label : "Remitente",
      name : "contacto", //Hace referencia al modelo correspondencia
      options : contactoOptions(),
      onChange : manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: "/editUsuario",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addCategory",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/categoryList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
        
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
  
  const paraNavegacion = {
    title : "Registrar Correspondencia Entrante",
    subTitle : "Registro de correspondencia entrante",
    icon : FaPlus,
    actions : [
        {
            to : "/correspondenciaList",
            label : "Volver",
            icon : FaBackspace,
            estilos : "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
        },
    ]

  }
  
  return (
    <CreateEntity
      useEntityMutations={useDocEntranteMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
