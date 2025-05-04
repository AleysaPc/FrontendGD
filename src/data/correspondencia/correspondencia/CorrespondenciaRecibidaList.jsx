import {
  useCorrespondenciasEnviadas,
  useCorrespondenciasRecibidas,
  useDocEntrantes,
} from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";

function CorrespondenciaRecibidaList() {
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "nro_registro",
      label: "Nro. Registro",
    },
    {
      key: "fecha_recepcion",
      label: "Fecha Recepción",
      render: (item) => (
        <FormattedDate date={item.fecha_recepcion} format="DD/MMM/YYYY" />
      ),
    },
    {
      key: "fecha_respuesta",
      label: "Fecha Respuesta",
      render: (item) => (
        <FormattedDate date={item.fecha_respuesta} format="DD/MMM/YYYY" />
      ),
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.correspondencia?.referencia,
    },
    { key: "prioridad", 
      label: "Prioridad",
      render: (item) => item.correspondencia?.prioridad,}, 
    { key: "estado",
      label: "Estado",
      render: (item) => item.correspondencia?.estado,},
    {
      key: "contacto",
      label: "Remitente",
      render: (item) => (
        `${item.correspondencia?.contacto || 'Sin remitente'}`
      ),
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <a
            href={`detailDocEntrante/${item.id_doc_entrante}`}
            className="bg-lime-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver
          </a>
          <a
            href={`/correspondenciaRecibida/${item.id_doc_entrante}/edit`}
            className="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </a>
        </div>
      ),
    }
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
