import mongoose from 'mongoose';
import type {
  Address,
  PaymentMethod,
  Subscription,
  User,
} from '../entities/userEntity';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import environment from '../utils/environment';
import geocoder from '../utils/geocoder';

const Types = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema<Address>({
  street: {
    type: Types.String,
    required: [true, 'Please add an address'],
  },
  houseNumber: {
    type: Types.String,
    required: [true, 'Please add a house number'],
  },
  city: {
    type: Types.String,
    required: [true, 'Please add a city'],
  },
  postalCode: {
    type: Types.String,
    required: [true, 'Please add a postal code'],
  },
  country: {
    type: Types.String,
    required: [true, 'Please add a country'],
  },
});

const subscriptionSchema = new mongoose.Schema<Subscription>({
  from: {
    type: Types.Date,
    required: [true, 'Please add a start date'],
  },
  to: {
    type: Types.Date,
    required: [true, 'Please add an end date'],
  },
  status: {
    type: Types.String,
    enum: [
      'active',
      'past_due',
      'unpaid',
      'canceled',
      'incomplete',
      'incomplete_expired',
    ],
  },
  type: {
    type: Types.String,
    enum: [
      'Basic Subscription',
      'Advanced Subscription',
      'Premium Subscription',
    ],
  },
});

const paymentMethodSchema = new mongoose.Schema<PaymentMethod>({
  name: {
    type: Types.String,
    //required: [true, 'Please add a name'],
  },
  cardNumber: {
    type: Types.String,
    //required: [true, 'Please add a card number'],
  },
  expirationDate: {
    type: Types.Date,
    //required: [true, 'Please add an expiration date'],
  },
  cvv: {
    type: Types.String,
    //required: [true, 'Please add a cvv'],
  },
});
const userSchema = new mongoose.Schema<User>({
  name: {
    type: Types.String,
    //required: [true, 'Please add a name'],
  },
  email: {
    type: Types.String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: Types.String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  prioritisationTickets: {
    type: Types.Number,
    default: 0,
  },
  phoneNumber: {
    type: Types.String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  createdAt: {
    type: Types.Date,
    default: Date.now,
  },
  rating: {
    type: Types.Number,
    min: 0,
    max: 5,
    default: 0,
  },
  stripeCustomerId: {
    type: Types.String,
    required: false,
    unique: true,
  },
  location: {
    // GeoJSON Point
    type: {
      type: Types.String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Types.Number],
      index: '2dsphere',
    },
  },
  registrationCompleted: {
    type: Types.Boolean,
    default: false,
  },
  imageUrl: {
    type: Types.String,
    required: false,
  },
  address: addressSchema,
  subscription: subscriptionSchema,
  paymentMethod: paymentMethodSchema,
});

/**
 * If password is modified, encrypt it using bcrypt. This runs before every save operation.
 * @returns {Promise<void>}
 */
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified('address')) {
    const address = this.address;
    const addressString = `${address.houseNumber} ${address.street}, ${address.postalCode} ${address.city}`;
    const loc = await geocoder(addressString);
    const latitude = loc[0];
    const longitude = loc[1];
    this.location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as User;

  if (update.address) {
    const address = update.address;
    const addressString = `${address.houseNumber} ${address.street}, ${address.postalCode} ${address.city}`;
    const loc = await geocoder(addressString);
    const latitude = loc[0];
    const longitude = loc[1];
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
    this.setUpdate({ ...update, location });
  }
});

// Encrypt password using bcrypt while updating (admin)
// userSchema.pre("findOneAndUpdate", async function ( next) {
//     if (this._update.password) {
//         this._update.password = await bcrypt.hash(this._update.password, 10);
//     }
//     next();
// });

/**
 * Sign JWT and return it with the user id as payload.
 * @returns {string}
 */
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, environment.JWT_SECRET, {
    expiresIn: environment.JWT_EXPIRE,
  });
};

/**
 * Match user entered password to hashed password in database.
 * @param enteredPassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('User', userSchema, 'users');
export default userModel;


userSchema.path('prioritisationTickets').validate(function(tickets) {
  return !tickets || tickets >= 0
})