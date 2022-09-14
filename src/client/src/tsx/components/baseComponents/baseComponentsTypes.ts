import {
  UseMutation,
  UseQuery,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ReactNode, ThHTMLAttributes } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { TdProps, ThProps } from "./Tables/TableCells";

export interface PropsBasic {
  className?: string;
  children?: React.ReactNode;
}

export interface PropsBasicWithKey extends PropsBasic {
  key: string;
}

export type ComponentProps<T extends object> = {
  [p in keyof T]: T[p];
};

export interface ComponentWithArray<T> extends PropsBasic {
  dataArr: T[];
}

export type LiProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;
export type ulProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export interface LinkData {
  to: string;
  text?: string;
  icon?: ReactNode;
}

export interface AlertData {
  topic: string;
  message: string;
  status: boolean;
}
export type LiComponentProps<T extends object> = (
  props: ComponentProps<T> & { liProps?: LiProps }
) => JSX.Element;

export interface NavLinkLIProps extends PropsBasic {
  liProps?: LiProps;
  linkData: LinkData;
}
export type ExcludeKey<T> = Exclude<keyof T, "key">;
export interface ListProps<T extends Record<string, any>>
  extends ComponentWithArray<T> {
  ulProps?: ulProps;
  LI: LiComponentProps<T>;
}

export interface TableProps<T> extends ComponentWithArray<T> {
  Th?: (props: ThProps) => JSX.Element;
  Td?: (props: TdProps) => JSX.Element;
  deleteItemFun?: (id: string) => void;
}
export type FormProps = Partial<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
>;
export interface GeneralFormProps<T extends FieldValues> {
  editMode?: boolean;
  defaultValues?: T;
  onSubmit: SubmitHandler<T>;
  fromProps?: FormProps;
}
