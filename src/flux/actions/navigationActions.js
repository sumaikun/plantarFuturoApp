import { GO_TO_LOGIN, GO_TO_MANAGEMENT, GO_TO_PROJECTS, GO_TO_FORESTAL_UNITS, GO_BACK, GO_TO_FORM_INVENTORY,
   INSERT_NAVIGATOR, GO_TO_FORM_PROCESS, GO_TO_FORM_COMPENSATION} from "../types";

import { closeMenu } from "./appActions";

export const insertNavigator = (navigator) => ({
  type: INSERT_NAVIGATOR,
  payload: navigator,
});

export const goBack = () => ({
  type: GO_BACK
});

export const goToMain = () => ({
  type: GO_TO_MANAGEMENT
});

export const goToProjects = () => ({
  type: GO_TO_PROJECTS
});

export const goToForestalUnits = () => ({
  type: GO_TO_FORESTAL_UNITS
});

export const goToInventoryForm = () => ({
  type: GO_TO_FORM_INVENTORY
});

export const goToProcessForm = () => ({
  type:GO_TO_FORM_PROCESS
});

export const goToLogin = () => ({
  type: GO_TO_LOGIN
});

export const goToCompensationForm = () => ({
  type: GO_TO_FORM_COMPENSATION
});

export const LogOut = (data,successCallBack,errorCallBack) => {
  return async dispatch => {
    dispatch(goToLogin());
    dispatch(closeMenu());
  }
}
