import { lazy } from "react";

const CorrespondenciaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaList"));
const CreateCorrespondencia = lazy(() => import("../data/correspondencia/correspondencia/createCorrespondencia"));
const CorrespondenciaRecibidaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaRecibidaList"));
const CorrespondenciaEnviadaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaEnviadaList"));
const EditCorrespondencia = lazy(() => import("../data/correspondencia/correspondencia/editCorrespondencia"));

export const correspondenciaRoutes = [
  // rutas de correspondencia
  {
    path: "/correspondenciaList",
    element: <CorrespondenciaList />,
  },
  {
    path: "/correspondenciaRecibidaList",
    element: <CorrespondenciaRecibidaList />,
  },
  {
    path: "/correspondenciaEnviadaList",
    element: <CorrespondenciaEnviadaList />,
  },
  {
    path: "/createCorrespondencia",
    element: <CreateCorrespondencia />,
  },
  {
    path: "editCorrespondencia/:id",
    element: <EditCorrespondencia />,
  }
];