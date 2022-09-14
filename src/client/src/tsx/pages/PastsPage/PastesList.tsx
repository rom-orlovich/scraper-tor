import React from "react";
import { LiComponentProps } from "../../components/baseComponents/baseComponentsTypes";
import List from "../../components/baseComponents/List";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { PastesApi } from "../../redux/api/hooksAPI";
import { API_ROUTES, Paste } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import style from "./PastesList.module.scss";

const liPastes = (props: Paste) => {
  return (
    <li>
      <span>
        <span className={style.pastes_details}>
          <span>Date:</span>
          <span>{props.date}</span>
        </span>
        <span className={style.pastes_details}>
          <span>Author:</span>
          <span>{props.author}</span>
        </span>
      </span>
      <span>
        <span className={style.pastes_details}>
          <span>Title:</span>
          <span>{props.title}</span>
        </span>
        <span className={style.pastes_details}>
          <span>Content:</span>
          <p className={style.content}>
            {props.content.replace(/&nbsp;/g, " ").trim()}
          </p>
        </span>
      </span>
    </li>
  );
};
function PastsList({ name }: { name?: string }) {
  const { data, isLoading, isFetching, isError } = PastesApi.useGetItemsQuery({
    page: 1,
  });

  return (
    <MainRoute mainRoutes={[APP_ROUTE.HomeRoute, APP_ROUTE.PastesRoute]}>
      <LoadingSpinner stateData={{ data, isLoading, isFetching, isError }}>
        {(data) => (
          <List
            ulProps={{ className: style.list_pastes }}
            dataArr={data.data}
            LI={liPastes}
          />
        )}
      </LoadingSpinner>
    </MainRoute>
  );
}

export default PastsList;
