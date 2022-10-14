from app.models import db, Product

def seed_products():
    product1 = Product(
        owner_id = 1,
        name = 'Knited Scarf',
        decription = 'Hand knitted wool scarf',
        price = 4,
        quantity = 7
    )

    product2 = Product(
        owner_id = 2,
        name = 'Bucket Hat',
        decription = 'Premium Hat',
        price = 7,
        quantity = 23
    )

    product3 = Product(
        owner_id = 3,
        name = 'Shell earrings',
        decription = "You won't regret buying this",
        price = 50,
        quantity = 1
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)

    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
