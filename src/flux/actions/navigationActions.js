import { GO_TO_LOGIN, GO_TO_MANAGEMENT, GO_TO_PROJECTS, GO_TO_FORESTAL_UNITS, GO_BACK, GO_TO_FORM_INVENTORY,
   INSERT_NAVIGATOR, GO_TO_FORM_PROCESS, GO_TO_FORM_COMPENSATION, GO_TO_RISK_MANAGEMENT, GO_TO_HILLSIDE_COLLAPSE,
   GO_TO_HILLSIDE_MOVEMENT,  GO_TO_RAIN_FALL, GO_TO_RIVER_COLLAPSE, GO_TO_TUNNEL_DEFORMATION, GO_TO_RISK_INDICATORS} from "../types";

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

export const goToRiskManagement = () => ({
  type: GO_TO_RISK_MANAGEMENT
});

export const goToHillsideCollapse = () => ({
  type: GO_TO_HILLSIDE_COLLAPSE
});

export const goToHillsideMovement = () => ({
  type: GO_TO_HILLSIDE_MOVEMENT
});

export const goToRainFall = () => ({
  type: GO_TO_RAIN_FALL
});

export const goToRiverCollapse = () => ({
  type: GO_TO_RIVER_COLLAPSE
});

export const goToTunnelDeformation = () => ({
  type: GO_TO_TUNNEL_DEFORMATION
});

export const goToRiskIndicator = () => ({
  type: GO_TO_RISK_INDICATORS
});

export const LogOut = (data,successCallBack,errorCallBack) => {
  return async dispatch => {
    dispatch(goToLogin());
    dispatch(closeMenu());
  }
}
