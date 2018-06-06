import { RxDatabase } from "rxdb";
import { RxGroupCollection, groupCollection } from "./Group";

export const RxDBCollections = [groupCollection];

export class AppRxDatabase extends RxDatabase {
  group?: RxGroupCollection;
}
