import { lazy } from "react";

const DocEntranteList = lazy(() => import("../data/correspondencia/docEntrantes/DocEntrantesList"));
const EditDocEntrante = lazy(() => import("../data/correspondencia/docEntrantes/editDocEntrante"));
const CreateDocEntrante = lazy(() =>
    import("../data/correspondencia/docEntrantes/crearDocEntrante")
);
const CorrespondenciaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaList"));

export const correspondenciaRoutes = [
  // rutas de correspondencia
  {
    path: "/correspondenciaList",
    element: <CorrespondenciaList />,
  },
  {
    path: "/docEntrantetList",
    element: <DocEntranteList />,
  },
  {
    path: "/editDocEntrante/:id",
    element: <EditDocEntrante />,
  },
  {
    path: "/createDocEntrante",
    element: <CreateDocEntrante />,
  },
  
  // categorias
  //{
    //path: "/categorias",
    //element: <Categorias />,
  //},
  // proveedores
  //{
    //path: "/proveedores",
    //element: <Proveedores />,
  //},
];