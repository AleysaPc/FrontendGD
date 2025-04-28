import {useCorrespondencias} from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";

function CorrespondenciaEnviadaList() {

    //Obtenemos los campos del modelo
    const correspondencias = useCorrespondencias();
    // Filtramos las correspondencias enviadas
    const correspondenciasEnviadas = Array.isArray(correspondencias)
      ? correspondencias.filter((item) => item.tipo === "enviado")
      : [];

      const useFields = () => [
        {key: "index", label: "#"},
        {
            key: "tipo",
            label: "Tipo",
            render: (item) => (item.tipo === "enviado" ? "Enviado" : null),
          },
        {key: "fecha_registro", label: "Fecha de Registro", render : (item) => <FormattedDate date={item.fecha_registro} format="DD/MMM/YYYY" />},
        {key: "referencia", label: "Referencia"},
        {key: "prioridad", label: "Prioridad"},
        {key: "estado", label: "Estado"},
        {key: "contacto", label: "Contacto", render : (item) => ` ${item.nombre_contacto} - ${item.apellido_paterno_contacto} - ${item.titulo_profesional}`},

      ];

    const EntityData = {
        title: "Gestión de Correspondencias Enviadas",
        subTitle: "Listado de correspondencias enviadas",
        loadingMessage: "Cargando correspondencias enviadas...",
        errorMessage: "Error al obtener las correspondencias enviadas",
        fetchDataHook: useCorrespondencias,
        all_data: false, // true para obtener todos los datos, false para paginación
        itemKey: "id_correspondencia", //Debe ser igual al modelo
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
    }

  return (
    <EntityList
      entityData={{
        ...EntityData,
        data: correspondenciasEnviadas, // Pasamos las correspondencias filtradas
      }}
    />
  );
}
export default CorrespondenciaEnviadaList;