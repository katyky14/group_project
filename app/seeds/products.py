from app.models import db, Product

def seed_products():
    product1 = Product(
        owner_id = 1,
        name = 'Knited Scarf',
        description = 'Hand knitted wool scarf',
        price = 4,
        quantity = 7
    )

    product2 = Product(
        owner_id = 2,
        name = 'Bucket Hat',
        description = 'Premium Hat',
        price = 7,
        quantity = 23
    )

    product3 = Product(
        owner_id = 3,
        name = 'Shell earrings',
        description = "You won't regret buying this",
        price = 50,
        quantity = 1
    )
    product4 = Product(
        owner_id = 1,
        name = 'Leather Cardholder',
        description = 'Hand cardholder with genuine leather',
        price = 25,
        quantity = 7
    )

    product5 = Product(
        owner_id = 2,
        name = 'Silver Braclet',
        description = 'Beautiful bracelet',
        price = 15,
        quantity = 23
    )

    product6 = Product(
        owner_id = 3,
        name = 'Knited Wool Sweather',
        description = "You won't regret buying this",
        price = 20,
        quantity = 1
    )

    product7 = Product(
        owner_id = 1,
        name = 'Throw Pillows',
        description = "Hand made throw pillows",
        price = 25,
        quantity = 23
    )

    product8 = Product(
        owner_id = 2,
        name = 'Big Candle',
        description = "Lavendar scented candle",
        price = 18,
        quantity = 7
    )

    product9 = Product(
        owner_id = 3,
        name = 'Ceramic Plate',
        description = "14in ceramic plate",
        price = 10,
        quantity = 4
    )

    product10 = Product(
        owner_id = 1,
        name = 'Flower Vase',
        description = "Handmade clay flower vase",
        price = 15,
        quantity = 3
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)

    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
