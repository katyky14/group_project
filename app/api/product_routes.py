from flask import Blueprint, jsonify
from ..forms.product_form import ProductForm,EditProductForm
# from ..models import Product


product_routes = Blueprint('products', __name__)

#Get all products
@product_routes.route('/')
def get_all_products():
    # allProducts = Product.query.all()
    return "Hello World"

#Get product by id
@product_routes.route('/<int:id>')
def get_product_id(id):
#    user = User.query.get(id)
#     return user.to_dict()
    pass


#Get product by the current owner

#Add a product
@product_routes.route('/',methods=["POST"])
def post_all_products():
    pass
    # form = ProductForm()
    # if form.validate_on_submit():
    #     # data =
    #     form.populate_obj(data):
    #     db.session.add(data)
    #     db.session.commit()
    # return "ADD FORM"


#Edit a product listing
@product_routes.route("/<int:id>",methods=["PUT"])
def update_product():
     # form = EditProductForm()
    # if form.validate_on_submit():
    #     # data =
    #     form.populate_obj(data):
    #     db.session.add(data)
    #     db.session.commit()
    pass


#Delete a product
@product_routes.route("/<int:id>",methods=["DELETE"])
def delete_product():
    pass


#Get comments for product
@product_routes.route('/<int:product_id>/reviews')
def get_all_comments_product():
    # allProducts = Product.query.all()
    pass
