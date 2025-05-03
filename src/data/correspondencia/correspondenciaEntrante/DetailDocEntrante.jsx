import { useParams } from "react-router-dom";
import { useDocEntrante } from "../../../hooks/useEntities";
import { Navigation } from "../../../components/shared/Navigation";
import { FaFile, FaFileArchive, FaFilePrescription, FaFileSignature, FaHistory } from "react-icons/fa";
import VisorPDF from "../../../components/shared/VisorPdf";
import { ActionButton } from "../../../components/shared/ActionButton";
import { useState, useEffect } from "react";
import  FormattedDate from "../../../components/shared/FormattedDate";
function DetailDocEntrante() {
  const { id } = useParams(); //use params para recuperar el ID

  const { data: response = {}, isLoading } = useDocEntrante(id);

  const items = response.data || [];
  console.log("docEntrante", items.nro_registro);

  const documentos = items.correspondencia?.documentos || [];

  const [documentoActivo, setDocumentoActivo] = useState("");

  useEffect(() => {
    // Establecer el primer documento como el activo al cargar los documentos
    if (documentos.length > 0) {
      setDocumentoActivo(documentos[0].archivo);
    }
  }, [documentos]);

  // Validar si la URL es válida antes de pasarla al visor
  const isUrlValid = documentoActivo && documentoActivo.startsWith("http");

  return (
    <div className="p-4 space-y-4">
      <Navigation
        title="Correspondencia Entrante"
        actions={[
          {
            to : `/correspondencia-entrante/${id}/historial`, //Historial del documento 
            label: "Historial",
            icon: FaHistory,
            estilos:
              "bg-green-600 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del Documento: ${items.nro_registro}`}
        icon={FaFileSignature}
      />

      <div className="bg-white shadow rounded-2xl p-6 grid grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Detalle del Documento Entrante
          </h2>
          <div>
            <span className="font-medium">Nro Registro:</span>{" "}
            {items.nro_registro}
          </div>
          <div>
            <span className="font-medium">Fecha de Recepción:</span>{" "}
           <FormattedDate date={items.fecha_recepcion} />
            
          </div>
          <div>
            <span className="font-medium">Fecha de Respuesta:</span>{" "}
          <FormattedDate date={items.fecha_respuesta} />
          </div>
          <div>
            <span className="font-medium">Referencia:</span>{" "}
            {items.correspondencia?.referencia}
          </div>
          <div>
            <span className="font-medium">Descripción:</span>{" "}
            {items.correspondencia?.descripcion}
          </div>
          <div>
            <span className="font-medium">Páginas:</span>{" "}
            {items.correspondencia?.paginas}
          </div>
          <div>
            <span className="font-medium">Prioridad:</span>{" "}
            {items.correspondencia?.prioridad}
          </div>
          <div>
            <span className="font-medium">Estado:</span>{" "}
            {items.correspondencia?.estado}
          </div>
          <div className="md:col-span-2">
            <span className="font-medium">Comentario:</span>{" "}
            {items.correspondencia?.comentario}
          </div>
          <div className="md:col-span-2">
            <span className="font-medium">Remitente:</span>{" "}
            {items.correspondencia?.contacto?.nombre_contacto}
          </div>
          <div className="md:col-span-2">
            <span className="font-medium">Nombre documento:</span>{" "}
            {items.correspondencia?.documentos?.[0]?.nombre_documento}
          </div>
          <div className="md:col-span-2">
            <span className="font-medium">Documento:</span>{" "}
            {items.correspondencia?.documentos?.tipo_documento}
          </div>

          {/* Botones dinámicos para documentos */}
          <div className="mt-4 space-y-2">
            {documentos.map((doc, index) => (
              <ActionButton
                key={doc.id_documento}
                label={doc.nombre_documento || `Documento ${index + 1}`}
                icon={FaFile}
                onClick={() => setDocumentoActivo(doc.archivo)}
                estilos={`px-4 py-2 border rounded-md ${
                  documentoActivo === doc.archivo
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          {isUrlValid ? (
            <VisorPDF url={documentoActivo} />
          ) : (
            <div>Documento no disponible o URL no válida.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailDocEntrante;
