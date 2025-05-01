import {
  useCorrespondenciasEnviadas,
  useCorrespondenciasRecibidas,
  useDocEntrantes,
} from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";

function CorrespondenciaRecibidaList() {
  const useFields = () => [
    { key: "index", 
      label: "#" },
    {
      key: "nro_registro",
      label: "Nro. Registro",
    },
    {
      key: "tipo",
      label: "Tipo",
    },
    {
      key: "fecha_registro",
      label: "Fecha de Registro",
      render: (item) => (
        <FormattedDate date={item.fecha_registro} format="DD/MMM/YYYY" />
      ),
    },
    { key: "referencia", label: "Referencia" },
    { key: "prioridad", label: "Prioridad" },
    { key: "estado", label: "Estado" },
    {
      key: "contacto",
      label: "Contacto",
      render: (item) =>
        ` ${item.nombre_contacto} - ${item.apellido_paterno_contacto} - ${item.titulo_profesional}`,
    },
  ];

  const entityData = {
    title: "Gestión de Correspondencias Recibidas",
    subTitle: "Listado de correspondencias recibidas",
    loadingMessage: "Cargando correspondencias recibidas...",
    errorMessage: "Error al obtener las correspondencias recibidas",
    fetchDataHook: useDocEntrantes,
    all_data: false, // true para obtener todos los datos, false para paginación
    itemKey: "id_doc_entrante", //Debe ser igual al modelo
    entityFields: useFields,
    clavesBusqueda: ["referencia"],
    actions: [
      {
        to: "/createCorrespondencia",
        label: "Crear Correspondencia",
        estilos:
          "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return <EntityList entityData={entityData} />;
}
export default CorrespondenciaRecibidaList;
