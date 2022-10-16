from flask import Blueprint, request, redirect
from ..forms.product_form import ProductForm,EditProductForm
from ..forms.reviews_form import ReviewForm
from ..models import Product, Review, Image, db
from flask_login import current_user


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
def get_all_comments_product(product_id):
    products_reviews = Review.query.filter(Review.product_id == product_id)
    return {"Reviews": [review.to_dict_reviews() for review in products_reviews]}

#Add comment for product
@product_routes.route('/<int:product_id>/reviews',methods=["POST"])
def add_comment(product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user.to_dict()
        data = Review(
            user_id = user['id'],
            product_id = product_id,
            rating = form.data['rating'],
            comment = form.data['comment']
        )
        db.session.add(data)
        db.session.commit()
        return {"Review": data.to_dict_reviews()}
    if form.errors:
        return form.errors
