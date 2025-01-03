import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    movieId: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

ReviewSchema.statics.findByMovieId = function(movieId) {
    return this.find({ movieId: movieId });
};

ReviewSchema.statics.findByUserId = function(userId) {
    return this.find({ userId: userId });
};

export default mongoose.model('Review', ReviewSchema);