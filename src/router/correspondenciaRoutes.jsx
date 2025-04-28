import { lazy } from "react";

const CorrespondenciaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaList"));
const CreateCorrespondencia = lazy(() => import("../data/correspondencia/correspondencia/createCorrespondencia"));
const CorrespondenciaRecibidaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaRecibidaList"));
const CorrespondenciaEnviadaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaEnviadaList"));

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
  }
];