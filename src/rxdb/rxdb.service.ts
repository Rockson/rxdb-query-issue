import { Injectable } from "@angular/core"
import RxDB, { RxDatabase } from "rxdb"
import { environment } from "../environments/environment"

import RxDBSchemaCheckModule from "rxdb/plugins/schema-check"
import RxDBErrorMessagesModule from "rxdb/plugins/error-messages"

import RxDBValidateModule from "rxdb/plugins/validate"
RxDB.plugin(RxDBValidateModule)

import RxDBLeaderElectionModule from "rxdb/plugins/leader-election"
RxDB.plugin(RxDBLeaderElectionModule)

RxDB.QueryChangeDetector.enable()

import * as PouchdbAdapterIdb from "pouchdb-adapter-idb"
RxDB.plugin(PouchdbAdapterIdb)

import { RxDBCollections, AppRxDatabase } from "./RootRxDB"

if (!environment.production) {
  // in dev-mode we show full error-messages
  RxDB.plugin(RxDBErrorMessagesModule)

  // schema-checks should be used in dev-mode only
  RxDB.plugin(RxDBSchemaCheckModule)
  RxDB.QueryChangeDetector.enableDebugging()
}

// Just an Async Singleton
@Injectable()
export class DatabaseService {
  static dbPromise: Promise<AppRxDatabase>

  private async _create(): Promise<AppRxDatabase> {
    const db: AppRxDatabase = await RxDB.create({
      name: "appdb",
      adapter: "idb",
    })
    window["db"] = db // write to window for debugging

    await Promise.all(RxDBCollections.map((colData) => db.collection(colData)))

    return db
  }

  get(): Promise<AppRxDatabase> {
    if (DatabaseService.dbPromise) {
      return DatabaseService.dbPromise
    }

    // create database
    DatabaseService.dbPromise = this._create()
    return DatabaseService.dbPromise
  }
}
