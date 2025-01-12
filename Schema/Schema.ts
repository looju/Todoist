import { Realm } from "@realm/react";

export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  name!: string;
  priority!: number;
  due_date!: string;
  date_added!: string;
  completed!: string;
  date_completed!: string;
  project_id!: string;

  static generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      data_added: new Date(),
    };
  }

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      name: "string",
      priority: "int",
      due_date: "string",
      date_added: "string",
      completed: "string",
      date_completed: "string",
      project_id: "string",
    },
  };
}
