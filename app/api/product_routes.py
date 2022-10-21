from flask import Blueprint, request, redirect

from app.forms.images_form import ImageForm
from ..forms.product_form import ProductForm,EditProductForm
from ..forms.reviews_form import ReviewForm
from ..forms.shoppingcart_form import ShoppingCartForm
from ..models import Product, Review, Image, db, Cart
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
        return {"product": data.to_dict_relationship()}
    return form.errors


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
        return {"Edited product": data.to_dict_relationship()}
    return form.errors

#Add Images to product
@product_routes.route('<int:product_id>/images', methods=["POST"])
def add_images_to_product(product_id):
    form = ImageForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print("CONSOLE LOGS")
        # print("Form DATA:")
        # print(form.data)
        # print("image_url:")
        # print(form.data['image_url'])
        # print("additional_url:")
        # print(form.data['additional_urls'])
        data = Image(
            user_id = user['id'],
            product_id = product_id,
            review_id = None,
            main_image = form.data['main_image'],
            image_url = form.data['image_url']
        )
        db.session.add(data)
        db.session.commit()
        if len(form.data['additional_urls']) == 0:
            return {"newImage": data.to_dict_images()}
        # return {"newImage": data.to_dict_images()}
        # if len(form.data['additional_urls']) == 1:
        #     data = Image(
        #         user_id = user['id'],
        #         product_id = product_id,
        #         review_id = None,
        #         main_image = True,
        #         image_url = form.data['image_url'][0]
        #     )
        #     db.session.add(data)
        #     db.session.commit()
        #     return {"newImage": data.to_dict_images()}
        # if len(form.data['additional_urls']) >= 1:
        #     for i in range(len(form.data['additional_urls'])):
        #         imgList = [data.to_dict_images()]
        #         data = Image(
        #                 user_id = user['id'],
        #                 product_id = product_id,
        #                 review_id = None,
        #                 main_image = False,
        #                 image_url = form.data['additional_urls'][i]
        #             )
        #         db.session.add(data)
        #         imgList.append(data.to_dict_images())
                # if i == 0:
                #     data = Image(
                #         user_id = user['id'],
                #         product_id = product_id,
                #         review_id = None,
                #         main_image = True,
                #         image_url = form.data['additional_urls'][0]
                #     )
                #     db.session.add(data)
                #     imgList.append(data.to_dict_images())
                # elif i > 0:
                #     data = Image(
                #         user_id = user['id'],
                #         product_id = product_id,
                #         review_id = None,
                #         main_image = False,
                #         image_url = form.data['additional_urls'][i]
                #     )
                #     db.session.add(data)
                #     imgList.append(data.to_dict_images())
        db.session.commit()
        # return {"newImage": imgList}
    return form.errors

#Delete a product
@product_routes.route("/<int:id>",methods=["DELETE"])
def delete_product(id):
    selected_product = Product.query.get(id)
    if selected_product:
        db.session.delete(selected_product)
        db.session.commit()
        return{"message": "Product has been removed"}
    return { 'message': "This product does not exist"}


#Get comments for product
@product_routes.route('/<int:product_id>/reviews')
def get_all_comments_product(product_id):
    products_reviews = Review.query.filter(Review.product_id == product_id)
    return {"Reviews": [review.to_dict_reviews() for review in products_reviews]}

#Add comment for product
@product_routes.route('/<int:product_id>/reviews', methods=["POST"])
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
