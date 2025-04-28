import { InputField } from "../../../components/shared/InputField"
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useCorrespondenciaMutations, useUsers, useContactos } from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";

export default function createCorrespondencia() {

  const { paraSelectsdestructuringYMap } = useFormEntity();

  const usuarioOptions = () =>
    paraSelectsdestructuringYMap(
      useUsers,
      true,
      "id",
      "email",
    ); 
  const contactoOptions = ()  =>
    paraSelectsdestructuringYMap(
      useContactos,
      true,
      "id_contacto",
      "nombre_completo",
      
    );
    
  const opcionesTipo = [
    { id: "enviado", nombre: "Enviado" },
    { id: "recibido", nombre: "Recibido" },
  ];
  
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

  const configuracionFormulario = {
    tipo: "",
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    comentario: "",
    documento: "",
  };

  const camposExtras = (formValues) => ({
  });

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [

    {
      component : SelectField,
      label : "Tipo",
      name : "tipo",
      options : opcionesTipo,
      required : true,
      onChange : manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Referencia",
      name: "referencia",
      required: true,
      onChange: manejarEntradas.handleInputChange,
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
      onChange : manejarEntradas.handleInputChange,
      required : true,
    },
    {
      component : SelectField,
      label : "Estado",
      name : "estado",
      options : opcionEstado,
      onChange : manejarEntradas.handleInputChange,
      required : true,
    },
    
    {
      component : InputField,
      label : "Comentario",
      name : "comentario",
      onChange : manejarEntradas.handleInputChange,
      required : false,
    },
    {
      component : SelectField,
      label : "Contacto",
      name : "contacto",
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
      component: SelectField,
      label: "Usuario",
      name: "usuario",
      options: usuarioOptions(),
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: "/editContacto",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addContacto",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/contactoList",
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
    title : "Crear Correspondencia",
    subTitle : "Formulario para crear una nueva correspondencia",
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
      useEntityMutations={useCorrespondenciaMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
