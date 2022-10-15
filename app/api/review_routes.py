from crypt import methods
from flask import Blueprint, jsonify
from ..forms.reviews_form import ReviewForm,EditReviewForm
from flask_login import current_user
from ..models import Review, db


review_routes = Blueprint('reviews', __name__)


#Get comments for users
@review_routes.route('/user')
def get_all_comments_user():
    # NEED TO FIGURE OUT HOW TO GET CURRENT USER ID
    # all_reviews = Review.query.filter(Review.user_id == #CURRENT user_id HERE!!!)
    # return {"Reviews": [review.to_dict_reviews() for review in all_reviews]}
    pass

#Add comment for product
@review_routes.route('/',methods=["POST"])
def add_comment():
    form = ReviewForm()
    if form.validate_on_submit():
        data = Review()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return "Review added to product"
    return "Error"


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
