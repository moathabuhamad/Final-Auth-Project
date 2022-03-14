"use strict";

class Collection {
    constructor(model) {
      this.model = model;
    }
    

    async dataCreate(obj) {
      try {
        return await this.model.create(obj);
      } catch (err) {
        console.log("err for dataCreate");
      }
    }
  
    async getData(id) {
      try {
        if (id) {
          return await this.model.findOne({ where: { id: id } });
        } else {
          return await this.model.findAll();
        }
      } catch (err) {
        console.log("error in getData");
      }
    }
  
    async dataUpdate(id, updatedBody) {
      try {
        return await this.model.update(updatedBody, { where: { id: id } });
      } catch (err) {
        console.log("error in dataUpdated");
      }
    }
  
    async dataDelete(id) {
      try {
        return await this.model.destroy({ where: { id: id } });
      } catch (err) {
        console.log("error in dataDeleted");
      }
    }
  }
  module.exports = Collection;
  