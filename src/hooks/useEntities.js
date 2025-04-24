import useData from "./useData";
import { useEntityMutations } from "./useEntityMutations";
import {CorrespondenciaApi} from "../api/correspondencia.api";
import {useEntityMutations} from "../hooks/useEntityMutations"
import useData from "./useData";
import { useEntityMutations } from "./useEntityMutations";
import { CustomUsersAPI, RolesApi, PasswordResetAPI} from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";

//Correspondencia
export const useCorrespondencias = (all_data = false, page = 1) => {
    return useData(CorrespondenciaApi, "correspondencias", null, { all_data, page }, 1000 * 60 * 5);
};

export const useCorrespondencia = (id) => useData(CorrespondenciaApi, "correspondencias", id);
export const useCorrespondenciaMutations = () => useEntityMutations(CorrespondenciaApi, "correspondencia");

// Correspondencia Entrante
export const useDocEntrantes = (all_data = false, page = 1) => { //Plural
    return useData(CorrespondenciaApi, "doc_entrantes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useDocEntrante = (id) => useData(CorrespondenciaApi, "doc_entrantes", id); //Singular
export const useDocEntranteMutations = () => useEntityMutations(CorrespondenciaApi, "doc_entrante");

// Correspondencia Saliente
export const useDocSalietes = (all_data = false, page = 1) => { //Plural
    return useData(CorrespondenciaApi, "doc_salientes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useDocSaliente = (id) => useData(CorrespondenciaApi, "doc_salientes", id); //Singular
export const useDocSalienteMutations = () => useEntityMutations(CorrespondenciaApi, "doc_saliente");

//users
export const useUsers = (all_data = false, page = 1) => {
    return useData( CustomUsersAPI, "users", null, { all_data, page }, 1000 * 60 * 5);
  };
  export const useUser = (id) => useData(CustomUsersAPI, "user", id);
  export const useUserMutations = () => useEntityMutations(CustomUsersAPI, "Usuario");
  
  //roles
  export const useRoles = (all_data = false, page = 1) => {
    return useData( RolesApi, "roles", null, { all_data, page }, 1000 * 60 * 5);
  };
  export const useRol = (id) => useData(RolesApi, "rol", id);
  export const useRolMutations = () => useEntityMutations(RolesApi, "Rol");

  // password reset
export const usePasswordResetConfirm = () => {
    return useMutationWithToast(({ token, password }) => PasswordResetAPI.confirmReset(token, password), "Reestableciendo contraseña...", "Contraseña reestablecida con éxito", null);
  }
  export const usePasswordResetRequest = () => {
    return useMutationWithToast((email) => PasswordResetAPI.requestReset(email), "Solicitud de restablecimiento de contraseña enviada", "Error al solicitar el restablecimiento de contraseña", null);
  }