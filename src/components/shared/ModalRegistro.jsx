import { useDocEntranteMutations } from "../../hooks/useEntities";
import CreateCorrespondencia from "../../data/correspondencia/correspondencia/CreateCorrespondencia";

export default function ModalRegistro({ isOpen, onClose }) {
  const { mutate: createDocEntrante } = useDocEntranteMutations();

  const handleCorrespondenciaCreated = async (correspondenciaId) => {
    try {
      await createDocEntrante({ correspondencia: correspondenciaId });
      onClose(); // Cierra el modal automáticamente
    } catch (error) {
      console.error("Error al crear el documento entrante:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 p-24 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-md w-3/4 max-h-full overflow-y-auto relative">
        <button
          onClick={onClose}
          className="text-white bg-red-500 hover:bg-red-700 p-2 absolute top-2 right-2"
        >
          X
        </button>

        <h2 className="text-2xl mb-6 text-center">Formulario de Correspondencia</h2>

        <CreateCorrespondencia onCreated={handleCorrespondenciaCreated} />
      </div>
    </div>
  );
}
