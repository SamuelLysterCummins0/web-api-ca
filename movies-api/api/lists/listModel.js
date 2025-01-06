import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    movies: [{ type: Number }],  
    created: { type: Date, default: Date.now }
});

ListSchema.index({ username: 1, name: 1 }, { unique: true });

export default mongoose.model('List', ListSchema);