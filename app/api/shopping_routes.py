from crypt import methods
from statistics import quantiles
from flask import Blueprint, jsonify, request
from ..forms.shoppingcart_form import ShoppingCartForm,EditShoppingCartForm
from ..models import db, Cart
from flask_login import current_user


shopping_routes = Blueprint('shopping', __name__)

#Get All Carted Items
@shopping_routes.route('/')
def get_all_cart():
    user = current_user.to_dict()
    cart = Cart.query.filter(Cart.user_id == user['id'])
    if cart:
        return {"shoppingCart": [item.to_dict_cart_rel() for item in cart]}
    return "No items in cart"

#Add Item to cart
@shopping_routes.route('/<int:cart_itemid>',methods=["POST"]) #productId
def add_item_to_cart(cart_itemid):
    form = ShoppingCartForm()
    user = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Cart(
            user_id = user['id'],
            product_id = cart_itemid,
            quantity = form.data['quantity']
        )
        db.session.add(data)
        db.session.commit()
        return {'shoppingCart': data.to_dict_cart_rel()}
    return form.errors

#Edit Items in cart
@shopping_routes.route('/<int:cart_itemid>',methods=["PUT"]) #
def update_item_to_cart(cart_itemid):
    form = ShoppingCartForm()
    user = current_user.to_dict()
    cart_item = Cart.query.filter(Cart.user_id == user['id']).filter(Cart.product_id == cart_itemid)
    # print('in cart item', cart_itemid)
    # print('form data', form.data['quantity'])
    if [item.to_dict_cart() for item in cart_item]:
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            cart_item[0].quantity = form.data['quantity']
            # print('form ', form.data['quantity'])
            # print('cart item', cart_item[0].quantity)
            # print('the form data items', form.data['quantity'])
            db.session.add(cart_item[0])
            db.session.commit()
            return {'shoppingCart': [item.to_dict_cart() for item in cart_item]}
        return form.errors
    return "No such item in your cart"

#Delete a product
@shopping_routes.route("/<int:cart_itemid>",methods=["DELETE"])
def delete_product(cart_itemid):
    user = current_user.to_dict()
    print('1 hi from the BE do you see me')
    cart_item = Cart.query.filter(Cart.user_id == user['id']).filter(Cart.product_id == cart_itemid)
    print('BE this is cart ITEM', cart_item[0].to_dict_cart())
    id = cart_item[0].id
    if [item.to_dict_cart() for item in cart_item]:
        print('2 hi from the BE do you see me')
        db.session.delete(cart_item[0])
        print('3 hi from the BE do you see me')
        db.session.commit()
        print('4 hi from the BE do you see me')
        return {"message": "Successfully Deleted", "id": id  }
    return "No such item in your cart"
