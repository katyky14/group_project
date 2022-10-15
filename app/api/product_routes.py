from flask import Blueprint, request, redirect
from ..forms.product_form import ProductForm,EditProductForm
from ..models import Product, Review, Image, db


product_routes = Blueprint('products', __name__)

#Get all products
@product_routes.route('/')
def get_all_products():
    all_products = Product.query.join(Image).all()
    return {'products': [product.to_dict_relationship() for product in all_products ]}




#Get product by id
@product_routes.route('/<int:id>')
def get_product_id(id):
    one_product = Product.query.get(id)
    # print("product", one_product)
    return {'oneProduct': one_product.to_dict_relationship()}



#Get product by the current owner

#Add a product
@product_routes.route('',methods=["POST"])
def post_all_products():

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Product()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return "Added product"

    return "ERRORS"



#Edit a product listing
@product_routes.route("/<int:id>",methods=["PUT"])
def update_product(id):
    form = EditProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Product.query.get(id)
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return "Edited a product"

    return "error"


#Delete a product
@product_routes.route("/<int:id>",methods=["DELETE"])
def delete_product(id):
    selected_product = Product.query.get(id)
    db.session.delete(selected_product)
    db.session.commit()
    return "Deleted Successfully"


#Get comments for product
@product_routes.route('/<int:product_id>/reviews')
def get_all_comments_product():
    # allProducts = Product.query.all()
    pass
