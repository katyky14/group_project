
from .db import db

class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    owner = db.relationship('User', back_populates = 'products')
    images = db.relationship('Image', back_populates ='products')
    reviews = db.relationship('Review', back_populates = 'products')
    carts = db.relationship("Cart", back_populates="products", cascade='all, delete')


    def to_dict_product(self):
        return {
          "id": self.id,
          "ownerId": self.owner_id,
          "name": self.name,
          "description": self.description,
          "price": self.price,
          "quantity": self.quantity,
        }

    def to_dict_relationship(self):
        return {
          "id": self.id,
          "ownerId": self.owner_id,
          "name": self.name,
          "description": self.description,
          "price": self.price,
          "quantity": self.quantity,
          "owner": self.owner.to_dict(),
          # "images": self.images.to_dict_images(),
          "images": [j.to_dict_images() for j in self.images],
          "reviews": [r.to_dict_reviews() for r in self.reviews]
        }
