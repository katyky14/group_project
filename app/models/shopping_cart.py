from .db import db

class Cart(db.Model):
    __tablename__ = "carts"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    users = db.relationship('User', back_populates = 'cart')
    products = db.relationship('Product', back_populates="carts")


    def to_dict_cart(self):
        return {
          "id": self.id,
          "userId": self.user_id,
          "productId": self.product_id,
          "quantity": self.quantity,
        }

    def to_dict_cart_rel(self):
        return {
          "id": self.id,
          "userId": self.user_id,
          "productId": self.product_id,
          "quantity": self.quantity,
          "users": self.users.to_dict()
        }
