import React from "react";
import List from "../../components/baseComponents/List";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { PastesApi } from "../../redux/api/hooksAPI";
import { Paste } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";

function PastsList({ name }: { name?: string }) {
  const { data, isLoading, isFetching, isError } = PastesApi.useGetItemsQuery({
    page: 1,
  });
  return (
    <MainRoute mainRoutes={APP_ROUTE.PastesRoute}>
      <LoadingSpinner stateData={{ data, isLoading, isFetching, isError }}>
        {(data) => (
          <List
            dataArr={data.data}
            LI={(props) => {
              return <li> {props.title}</li>;
            }}
          />
        )}
      </LoadingSpinner>
    </MainRoute>
  );
}

export default PastsList;
