import ActivityStore from "./activityStore";
import userStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

configure({ enforceActions: "always" });

export class RootStore {
  activityStore: ActivityStore;
  userStore: userStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new userStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
