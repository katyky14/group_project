from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(2000), nullable=False)
    users = db.relationship('User', back_populates = 'reviews')
    products = db.relationship('Product', back_populates = 'reviews')
    images = db.relationship('Image', back_populates = 'reviews')
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)


    def to_dict_reviews(self):
        return {
          "id": self.id,
          "userId": self.user_id,
          "productId": self.product_id,
          "rating": self.rating,
          "comment": self.comment,
          "createdAt": self.created_at,
          "updatedAt": self.updated_at
        }

    def to_dict_rel(self):
        return {
          "id": self.id,
          "userId": self.user_id,
          "productId": self.product_id,
          "rating": self.rating,
          "comment": self.comment,
          "users": self.users.to_dict(),
          "products": self.products.to_dict_product(),
          "images": self.images.to_dict_images(),
          "createdAt": self.created_at,
          "updatedAt": self.updated_at
        }
