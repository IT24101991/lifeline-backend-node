const mongoose = require("mongoose");

const fileAttachmentSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    mimeType: String,
    fileSize: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const labResultSchema = new mongoose.Schema(
  {
    hiv: {
      type: Boolean,
      default: false
    },
    hep: {
      type: Boolean,
      default: false
    },
    malaria: {
      type: Boolean,
      default: false
    },
    reason: String,
    testedAt: {
      type: Date,
      default: Date.now
    },
    testTechnician: String,
    attachments: [fileAttachmentSchema],
    positiveDetails: {
      markerFound: [String],
      severity: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "MEDIUM"
      },
      notes: String
    }
  },
  { _id: false }
);

const inventorySchema = new mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    donorName: String,
    status: {
      type: String,
      enum: ["AVAILABLE", "DISPATCHED", "DISCARD", "SAFE"],
      default: "AVAILABLE"
    },
    safetyFlag: {
      type: String,
      enum: ["SAFE", "BIO-HAZARD", "PENDING"],
      default: "PENDING"
    },
    testStatus: {
      type: String,
      enum: ["PENDING", "TESTED_SAFE", "TESTED_POSITIVE"],
      default: "PENDING"
    },
    collectedAt: {
      type: Date,
      default: Date.now
    },
    labResults: [labResultSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
