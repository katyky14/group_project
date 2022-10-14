from crypt import methods
from flask import Blueprint, jsonify
from ..forms.reviews_form import ReviewForm,EditReviewForm


review_routes = Blueprint('reviews', __name__)


#Get comments for users
@review_routes.route('/user')
def get_all_comments_user():
    # allProducts = Product.query.all()
    pass

#Add comment for product
@review_routes.route('/',methods=["POST"])
def add_comment():
    pass
    # form = ReviewForm()
    # if form.validate_on_submit():
    #     # data =
    #     form.populate_obj(data):
    #     db.session.add(data)
    #     db.session.commit()
    # return "ADD FORM"
    pass

#Edit comment for product
@review_routes.route('/<int:review_id>',methods=["PUT"])
def update_comment():
    pass
    # form = EditReviewForm()
    # if form.validate_on_submit():
    #     # data =
    #     form.populate_obj(data):
    #     db.session.add(data)
    #     db.session.commit()
    # return "ADD FORM"
    pass


#Delete a comment
@review_routes.route("/<int:review_id>",methods=["DELETE"])
def delete_comment():
    pass
