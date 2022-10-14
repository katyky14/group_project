from enum import Flag
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
    images = db.relationship('Image', back_populates = 'products')
    reviews = db.relationship('Review', back_populates = 'products')
