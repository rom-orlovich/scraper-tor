import React from "react";
import { LiComponentProps } from "../../components/baseComponents/baseComponentsTypes";
import List from "../../components/baseComponents/List";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { usePaginationButtons } from "../../hooks/usePaginationHook";
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
  const { ButtonLeft, ButtonRight, numPage, setNumPage } =
    usePaginationButtons();
  const { data, isLoading, isFetching, isError } = PastesApi.useGetItemsQuery({
    page: numPage,
    author: name || "",
  });

  return (
    <LoadingSpinner
      nameData={"Pastes"}
      stateData={{ data, isLoading, isError, isFetching }}
    >
      {(data) => {
        return data.data.length > 0 ? (
          <>
            <div className={style.list_container}>
              <List
                ulProps={{ className: style.list_pastes }}
                dataArr={data.data}
                LI={liPastes}
              />
            </div>
            <div className={style.buttons_container}>
              <ButtonLeft className={style.left_button} />
              {data.next && <ButtonRight className={style.right_button} />}
            </div>
          </>
        ) : (
          <h1>{"Pastes"} are not found</h1>
        );
      }}
    </LoadingSpinner>
  );
}

export default PastsList;
