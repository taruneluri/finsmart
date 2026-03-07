import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monthlyBudget: {
        type: Number,
        required: [true, 'Please add a monthly budget amount'],
        default: 0
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Compound index to ensure one budget per user per month/year
budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model('Budget', budgetSchema);
