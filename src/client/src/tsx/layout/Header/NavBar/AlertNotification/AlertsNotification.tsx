/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from "react";
// import { MdDeleteSweep } from "react-icons/md";
import { VscClearAll } from "react-icons/vsc";

import { IoMdNotifications, IoMdRemoveCircle } from "react-icons/io";





import DropDown from "../DropDown/DropDown";
import style from "./AlertsNotification.module.scss";
import { PropsBasic } from "../../../../components/baseComponentsTypes";
import { AlertsAPI } from "../../../../redux/api/interfaceAPI";
import { alertsApi } from "../../../../redux/api/hooksAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { disableFetchAlerts, getApiSideEffect } from "../../../../redux/slices/apiSideEffectSlice";
import { delayFun, genClassName } from "../../../../utlities/helpersFun";


interface AlertsNotificationProps extends PropsBasic {}

function DropDownLiAlert(
  props: {
    data: AlertsAPI;
    setAlertNotificationState?: React.Dispatch<React.SetStateAction<boolean>>;
  } & PropsBasic
) {
  const dropDownRef = useRef<HTMLLIElement | null>(null);

  const [deleteOne] = alertsApi.useDeleteItemMutation();
  const [deleteAll] = alertsApi.useDeleteAllMutation();
  // Delete the alert and keep the window open
  const deleteFun = () => {
    props.setAlertNotificationState && props.setAlertNotificationState(true);
    deleteOne(String(props.data._id));
  };
  const deleteAllFun = () => {
    // props.setAlertNotificationState && props.setAlertNotificationState(true);
    props.setAlertNotificationState && props.setAlertNotificationState(true);
    deleteAll({});
  };

console.log(props.data);

  return (
    <li
      ref={dropDownRef}
      className={`${style.notification_li}  ${props.className}`}
    >
      <div>
        <span className={style.deleteAll}>
          <VscClearAll onClick={deleteAllFun} />
        </span>
        <p className={style.alert_message}>{props.data.title}</p>
        <p className={style.date}>
          {props.data.date}
        </p>
      </div>

      <span>
        <IoMdRemoveCircle onClick={deleteFun} className={style.deleteIcon} />
      </span>
    </li>
  );
}

function AlertsNotification({ className }: AlertsNotificationProps) {
  const apiSideEffect = useAppSelector(getApiSideEffect);

  const queriesOptions = { };
  const [scaleUpState, setScaleUpState] = useState(false);

  const dispatch = useAppDispatch();
  const [alertNotificationState, setAlertNotificationState] = useState(false);

  const { data, refetch } = alertsApi.useGetItemsQuery({
    page: 1,
    numResults: 3,
    asc: false,
    ...queriesOptions,
  });

  // If there is new response from the server, the fetch alert will be true,
  // in order to refetch new alerts and activate the alert icons effect.
  useEffect(() => {
    if (apiSideEffect.fetchAlerts) {
      setAlertNotificationState(true);
      setScaleUpState(true);
      refetch();
      delayFun(() => {
        setScaleUpState(false);
      }, 1000).then(() => {
        dispatch(disableFetchAlerts());
      });
    }
  }, [apiSideEffect.fetchAlerts, dispatch, refetch]);

  return (
    <DropDown
      dataLI={data?.data || []}
      className={style.ul_notifications}
      Li={({ ...data }) => (
        <DropDownLiAlert
          setAlertNotificationState={setAlertNotificationState}
          {...data}
        />
      )}
      messageNotFound="No alerts was found!"
      alertNotificationState={alertNotificationState}
      setAlertNotificationState={setAlertNotificationState}
    >
      <span className={style.alert_icon}>
        <IoMdNotifications className={className} />
        <span
          className={genClassName(
            style.alerts_number,
            // eslint-disable-next-line no-nested-ternary
            data
              ? data.countRows
                ? style.alerts_number_active
                : style.alerts_number_unActive
              : "",
            scaleUpState ? style.animation_scale_up : ""
          )}
        >
          {data?.countRows || 0}
        </span>
      </span>
    </DropDown>
  );
}

export default AlertsNotification;
