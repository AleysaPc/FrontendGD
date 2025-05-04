import { useCorrespondenciaMutations } from "./useEntities";
import { useDocEntranteMutations } from "./useEntities";

export const useCrearCorrespondenciaYDocEntrante = () => {
  const { mutate: crearCorrespondencia } = useCorrespondenciaMutations();
  const { mutate: crearDocEntrante } = useDocEntranteMutations();

  const crearTodo = (correspondenciasData, docsEntrantesData, onSuccess, onError) => {
    if (correspondenciasData.length !== docsEntrantesData.length) {
      console.error("Los arreglos deben tener el mismo tamaño");
      return;
    }

    correspondenciasData.map((correspondenciaData, index) => {
      crearCorrespondencia(correspondenciaData, {
        onSuccess: (dataCorrespondencia) => {
          const correspondenciaId = dataCorrespondencia?.id;
          const docEntranteData = {
            ...docsEntrantesData[index],
            correspondencia_id: correspondenciaId,
          };

          crearDocEntrante(docEntranteData, {
            onSuccess: () => {
              if (index === correspondenciasData.length - 1 && typeof onSuccess === "function") {
                onSuccess();
              }
            },
            onError: onError,
          });
        },
        onError: onError,
      });
    });
  };

  return { crearTodo };
};


