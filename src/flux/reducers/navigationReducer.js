import Login from "../../pages/Login"
import ProjectManagement from '../../pages/ProjectManagement'
import ProjectList from '../../pages/ProjectList'
import ForestalUnitList from '../../pages/ForestalUnitList'
import FormInventory from '../../pages/FormInventory'
import FormProcess from '../../pages/FormProcess'
import FormCompensation from '../../pages/FormCompensation'

import { GO_TO_LOGIN, GO_TO_MANAGEMENT, GO_TO_PROJECTS, GO_TO_FORESTAL_UNITS, GO_BACK, INSERT_NAVIGATOR,
GO_TO_FORM_INVENTORY, GO_TO_FORM_PROCESS, GO_TO_FORM_COMPENSATION } from "../types";

var Pagenavigator = null;

const initialState = {
  navigator: {},
  initialRoute:{ component: Login , key: "LOGIN_PAGE"  },
};

const navigationReducer = (state = initialState, action) => {


  let currentPage = null;

  if(state.navigator.pages)
  {
    currentPage = state.navigator.pages.slice(-1)[0];
  }


  switch(action.type) {

    case INSERT_NAVIGATOR:
      state = {
        ...state,
        navigator:action.payload
      }

      Pagenavigator = action.payload;

      return state;
    case GO_TO_LOGIN:
      if(currentPage.key != 'BACK_PAGE'){
        state.navigator.resetPage({ component: Login , key: 'BACK_PAGE'  }, { animation: 'fade' });
      }
      return state;
    case GO_TO_MANAGEMENT:
      if(currentPage.key != 'MANAGEMENT_PAGE'){
        setTimeout(()=>{
          state.navigator.resetPage({ component: ProjectManagement , key: 'MANAGEMENT_PAGE'  }, { animation: 'fade' });
        },1)
      }
      return state;
    case GO_TO_PROJECTS:
      if(currentPage.key != 'PROJECTS_PAGE'){
        state.navigator.pushPage({ component: ProjectList , key: 'PROJECTS_PAGE'  });
      }
      return state;
    case GO_TO_FORESTAL_UNITS:
      if(currentPage.key != 'FUNCTIONALS_PAGE'){
        state.navigator.pushPage({ component: ForestalUnitList , key: 'PROJECTS_PAGE'  });
      }
      return state;
    case GO_TO_FORM_INVENTORY:
      if(currentPage.key != 'INVENTORY_FORM'){
        state.navigator.pushPage({ component: FormInventory , key: 'INVENTORY_FORM'  });
      }
      return state;
    case GO_TO_FORM_PROCESS:
      if(currentPage.key != 'PROCESS_FORM'){
        state.navigator.pushPage({ component: FormProcess , key: 'PROCESS_FORM'  });
      }
      return state;
    case GO_TO_FORM_COMPENSATION:
      if(currentPage.key != 'COMPENSATION_FORM'){
        state.navigator.pushPage({ component: FormCompensation , key: 'COMPENSATION_FORM'  });
      }
      return state;
    case GO_BACK:
      state.navigator.popPage();
      return state;
    default:
      return state;
  }
}

export default navigationReducer;
