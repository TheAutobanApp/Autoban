
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id_task: {type: Number, required: false},
    id_user: {type: Number, required: true},
    id_project: {type: Number, required: true},
    id_column: {type: Number, required: true},
    column_place: {type: Number, required: false},
    task_title: {type: String, required: false},
    task_description: {type: String, required: false},
    start_date: {type: Date, required:false},
    end_date: {type: Date, required:false},
    labels: [Number],
    complete: {type: Boolean, required: true},
    created_by: {type: String, required: true},
    assigned_to: {type: Number, required: false}
  },);

const MDB = mongoose.model("MDB", taskSchema);

module.exports = MDB;