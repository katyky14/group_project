from crypt import methods
from flask import Blueprint, request
from ..forms.reviews_form import ReviewForm,EditReviewForm
from flask_login import current_user
from ..models import Review, db


review_routes = Blueprint('reviews', __name__)


#Get comments for users
@review_routes.route('/user')
def get_all_comments_user():
    if current_user.is_authenticated:
        user = current_user.to_dict()
        all_reviews = Review.query.filter(Review.user_id == user['id'])
        return {"Reviews": [review.to_dict_reviews() for review in all_reviews]}
    return "No User Logged In"

#Edit comment for product
@review_routes.route('/<int:review_id>',methods=["PUT"])
def update_comment(review_id):
    form = ReviewForm()
    review = Review.query.get(review_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.comment = form.data['comment']
        review.rating = form.data['rating']

        db.session.commit()
        return {"Edited_Review": review.to_dict_reviews()}
    if form.errors:
        return form.errors


#Delete a comment
@review_routes.route("/<int:review_id>",methods=["DELETE"])
def delete_comment(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return "Review Has Been Deleted"
    return "This review does not exist"
