export const Schema = {
    version:0,
    name: "Task",
    primaryKey: "id",
    type:"object",
    title:"schema",
    description:"Schema for the product, pending potential migration",
    properties: {
      id: {
        type:"string",
        maxLength:100
      },
      description:{
        type:"string"
      } ,
      name:{
        type:"string"
      } ,
      priority: {
        type: "string"
      },
      due_date: {
        type:"string"
      } ,
      date_added: {
        type: "string",
        default: new Date(),
      },
      completed:{
        type:"string"
      },
      date_completed:{
        type:"string"
      },
      project_id:{
        type:"string"
      },
    },
  };
}
