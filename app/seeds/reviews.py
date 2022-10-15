from app.models import db, Review
from datetime import date

def seed_reviews():
    review1 = Review(
        user_id = 1,
        product_id = 2,
        rating = 5,
        comment = 'This is the best scraf I have ever had!',
        created_at = date.today(),
        updated_at = date.today()
    )
    review2 = Review(
        user_id = 3,
        product_id = 2,
        rating = 3,
        comment = 'This is okay I guess...',
        created_at = date.today(),
        updated_at = date.today()
    )
    review3 = Review(
        user_id = 2,
        product_id = 3,
        rating = 3,
        comment = 'This bucket hat is meh...',
        created_at = date.today(),
        updated_at = date.today()
    )
    review4 = Review(
        user_id = 1,
        product_id = 3,
        rating = 5,
        comment = 'This is the drippest hat ever!',
        created_at = date.today(),
        updated_at = date.today()
    )
    review5 = Review(
        user_id = 3,
        product_id = 1,
        rating = 2,
        comment = 'I could have made this myself...',
        created_at = date.today(),
        updated_at = date.today()
    )
    review6 = Review(
        user_id = 2,
        product_id = 1,
        rating = 5,
        comment = 'I love this OMG!!!',
        created_at = date.today(),
        updated_at = date.today()
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
