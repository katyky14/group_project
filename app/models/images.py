from .db import db

class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=True)
    main_image = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    users = db.relationship('User', back_populates = 'images')
    products = db.relationship('Product', back_populates = 'images')
    reviews = db.relationship('Review', back_populates = 'images')
