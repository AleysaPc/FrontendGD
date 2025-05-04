import { useState } from "react";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useCorrespondenciaMutations,
  useDocEntranteMutations,
  useUsers,
  useContactos,
  useCorrespondencias,
} from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import ModalDocEntrante from "../../../components/shared/ModalRegistro";

export default function createCorrespondencia() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const correspondenciaOptions = () =>
    //Modelo 2
    paraSelectsdestructuringYMap(
      useCorrespondencias,
      true, //maneja la logica de la paginacion
      "id_correspondencia",
      "id_correspondencia"
    );
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [idCorrespondenciaCreada, setIdCorrespondenciaCreada] = useState(null);

  const configuracionFormulario = {
    nro_registro: "",
    fecha_recepción: "",
    fecha_respuesta: "",
    correspodnencia: "",
  };

  const camposExtras = (formValues) => ({
    usuario: logicaNegocio.idUsuario,
  });

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaList", // Redirige al listado de correspondencia
    params: camposExtras(formValues), // Mantiene los parámetros extras
    onSuccess: (data) => {
      const id = data?.id; // Asumiendo que el `id` de la correspondencia viene en la respuesta
      if (id) {
        setIdCorrespondenciaCreada(id); // Guardamos el ID de la correspondencia
        console.log("ID de la correspondencia creada:", id); // Aquí puedes usar el id como necesites
      }
    },
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nro. Registro",
      name: "nro_registro",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha Recepción",
      name: "fecha_recepción",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha Respuesta",
      name: "fecha_respuesta",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: () => (
        <button
          type="button"
          onClick={() => setMostrarModalRegistro(true)}
          className="bg-blue-200 text-white px-4 py-2 rounded-md"
        >
          Correspondencia
        </button>
      ),
    },
    {
      component: SelectField,
      label: "Correspondencia",
      name: "correspondencia",
      options: correspondenciaOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];
  <button
    type="button"
    onClick={() => setMostrarModalRegistro(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded-md"
  >
    Agregar Correspondencia
  </button>;

  const paraNavegacion = {
    title: "Crear Correspondencia",
    subTitle: "Formulario para crear una nueva correspondencia",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <>
      <CreateEntity
        useEntityMutations={useCorrespondenciaMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
      />

      <ModalDocEntrante
        isOpen={mostrarModalRegistro}
        onClose={() => setMostrarModalRegistro(false)}
        correspondenciaId={idCorrespondenciaCreada}
      />
    </>
  );
}
