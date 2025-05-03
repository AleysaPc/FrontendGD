import { useEntityMutations } from "./useEntityMutations";
import {CorrespondenciaApi, CorrespondenciaEnviadaApi, CorrespondenciaRecbidaApi, Doc_EntranteApi, Doc_SalienteApi} from "../api/correspondencia.api";
import useData from "./useData";
import { CustomUsersAPI, RolesApi, PasswordResetAPI} from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";
import { ContactoApi } from "../api/contacto.api";

//Correspondencia
export const useCorrespondencias = (all_data = false, page = 1) => {
    return useData(CorrespondenciaApi, "correspondencias", null, { all_data, page }, 1000 * 60 * 5);
};

export const useCorrespondencia = (id) => useData(CorrespondenciaApi, "correspondencias", id);
export const useCorrespondenciaMutations = () => useEntityMutations(CorrespondenciaApi, "correspondencia");

//Correspondencia Recibida
export const useCorrespondenciasRecibidas = (all_data = false, page = 1) => { //Plural
    return useData(CorrespondenciaRecbidaApi, "correspondencias_recibidas", null, { all_data, page }, 1000 * 60 * 5);}

// Correspondencia Enviada
export const useCorrespondenciasEnviadas = (all_data = false, page = 1) => {
    return useData(CorrespondenciaEnviadaApi, "correspondencias_enviadas", null, { all_data, page }, 1000 * 60 * 5);
}
// Correspondencia Entrante
export const useDocEntrantes = (all_data = false, page = 1) => { //Plural
    return useData(Doc_EntranteApi, "doc_entrantes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useDocEntrante = (id) => useData(Doc_EntranteApi, "doc_entrante", id); //Singular
export const useDocEntranteMutations = () => useEntityMutations(Doc_EntranteApi, "doc_entrante");

// Correspondencia Saliente
export const useDocSalientes = (all_data = false, page = 1) => { //Plural
    return useData(Doc_SalienteApi, "doc_salientes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useDocSaliente = (id) => useData(Doc_SalienteApi, "doc_saliente", id); //Singular
export const useDocSalienteMutations = () => useEntityMutations(Doc_SalienteApi, "doc_saliente");

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

//Contacto
export const useContactos = (all_data = false, page = 1) => {
    return useData(ContactoApi, "contactos", null, { all_data, page }, 1000 * 60 * 5);
};


export const useContacto = (id) => useData(ContactoApi, "contactos", id);
export const useContactoMutations = () => useEntityMutations(ContactoApi, "contacto");

//Institucion
export const useInstituciones = (all_data = false, page = 1) => {
    return useData(ContactoApi, "instituciones", null, { all_data, page }, 1000 * 60 * 5);
}
export const useInstitucion = (id) => useData(ContactoApi, "instituciones", id);
export const useInstitucionMutations = () => useEntityMutations(ContactoApi, "institucion");

