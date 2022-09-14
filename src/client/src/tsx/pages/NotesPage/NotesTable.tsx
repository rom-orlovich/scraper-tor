import React from "react";

import { TablePagniation } from "../../components/baseComponents/Tables/TablePagination";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utlities/helpersFun";

function NotesTable({ name }: { name: string }) {
  return (
    <MainRoute mainRoutes={""}>
      {/* <TablePagniation<NotesTableAPI>
        queriesOptions={{ name }}
        nameData={"Notes List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      /> */}
    </MainRoute>
  );
}

export default NotesTable;
