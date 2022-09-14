import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { PastesApi } from "../../redux/api/hooksAPI";
import { Paste } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import PastsList from "./PastesList";

function PastesPage() {
  const [paste, setPaste] = useState<string[]>(["", ""]);
  return (
    <MainRoute mainRoutes={[APP_ROUTE.HomeRoute, APP_ROUTE.PastesRoute]}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<Paste>
            keys={["author"]}
            id={"id"}
            loadingSpinnerResult={{ nameData: "Pastes" }}
            setSelectOptionValue={setPaste}
            useGetData={PastesApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Pastes Author" },
              LabelProps: {
                labelText: "Search Pastes's Author",
                htmlFor: "PastesAuthorSearch",
              },
            }}
          />

          {/* <span>
            <Link to={`${APP_ROUTE}`}>Add Note</Link>
          </span> */}
        </div>
        <div className={page_style.page_main_content}>
          <PastsList name={paste[1]} />
        </div>
      </section>
    </MainRoute>
  );
}

export default PastesPage;
