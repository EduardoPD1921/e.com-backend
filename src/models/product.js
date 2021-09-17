const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O produto precisa de um título']
  },
  description: {
    type: String,
    required: [true, 'O produto precisa de uma descrição']
  },
  price: {
    type: Number,
    required: [true, 'O produto precisa de um preço']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'O produto precisa de uma tag']
  }],
  image: {
    type: String,
    required: [true, 'O produto precisa de uma imagem']
  },
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    stars: {
      type: Number,
      required: true
    },
    postDate: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

productSchema.path('tags').validate(function(val) {
  if (val.length > 3) {
    throw new Error('O produto pode ter no máximo 3 tags');
  };
});

module.exports = mongoose.model('Product', productSchema);