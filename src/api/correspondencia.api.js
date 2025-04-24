import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiCorrespondencia = createApi("correspondencia");

export const CorrespondenciaApi = createCrudOperations(ApiCorrespondencia, "correspondencia")
export const Doc_EntranteApi = createCrudOperations(ApiCorrespondencia, "doc_entrante")
export const Doc_SalienteApi = createCrudOperations(ApiCorrespondencia, "doc_saliente")