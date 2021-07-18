import { model, Schema } from 'mongoose'

const TechnicianSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        currently: {
          type: Boolean,
          default: false,
        },
        desc: {
          type: String,
          required: true,
        },
        technologies: {
          type: [String],
        },
      },
    ],
    education: [
      {
        degree: {
          type: String,
          required: true,
        },
        field: {
          type: String,
          required: true,
        },
        college: {
          type: String,
          required: true,
        },
        university: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        currently: {
          type: Boolean,
          default: false,
        },
        desc: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: [
      {
        rator: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        rate: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
        },
      },
    ],
    socials: {
      phone: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      website: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
)

const Technician = model('technician', TechnicianSchema)
export default Technician
