from crypt import methods
from flask import Blueprint, jsonify
from ..forms.shoppingcart_form import ShoppingCartForm,EditShoppingCartForm


shopping_routes = Blueprint('shopping', __name__)

#Get All Carted Items
@shopping_routes.route('/')
def get_all_cart():
    pass

#Add Item to cart
@shopping_routes.route('/<int:cart_itemid>',methods=["POST"])
def add_item_to_cart():
    pass
    # form = ShoppingCartForm()
    # if form.validate_on_submit():
    #     # data = 
    #     form.populate_obj(data):
    #     db.session.add(data)
    #     db.session.commit()
  
#Edit Items in cart
@shopping_routes.route('/<int:cart_itemid>',methods=["PUT"])
def update_item_to_cart():
    pass
   # form = EditShoppingCartForm()
    # if form.validate_on_submit():
    #     # data = 
    #     form.populate_obj(data):
    #     db.session.add(data)
    #     db.session.commit()

#Delete a product
@shopping_routes.route("/<int:cart_itemid>",methods=["DELETE"])
def delete_product():
    pass