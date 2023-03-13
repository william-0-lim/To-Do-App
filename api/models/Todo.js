const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	},
	dueDate: {
		type: Date,
		required: true
	}
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;