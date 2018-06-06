import { RxCollection, RxCollectionCreator, RxSchema, RxJsonSchema, RxDocument } from "rxdb"

const GroupSchema: RxJsonSchema = {
  version: 0,
  title: "Group Schema",
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    order: {
      type: "number"
    }
  },
  required: ["title"],
}

export const groupCollection: RxCollectionCreator = {
  name: "group",
  schema: GroupSchema,
  methods: {},
}

export interface IRxGroupDocumentType {
  _id?: string
  title: string
  order: number
}

export type RxGroupDocument = RxDocument<IRxGroupDocumentType>

export declare class RxGroupCollection extends RxCollection<IRxGroupDocumentType> {
  pouch: any
}
