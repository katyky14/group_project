from app.models import db, Image

def seed_images():
    image1 = Image(
       user_id = 1,
       product_id = 1,
       review_id = None,
       main_image = True,
       image_url = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2020%2F11%2F03%2Fla99857_0203_scarves_hd.jpg&w=640&h=800&c=sc&poi=face&q=60'
    )
    image2 = Image(
       user_id = 2,
       product_id = 2,
       review_id = None,
       main_image = True,
       image_url = 'https://cdn.shopify.com/s/files/1/0073/9580/3195/products/Wave-Bucket-Hat-Black-1-isolate.jpg?v=1637036447'
    )
    image3 = Image(
       user_id = 3,
       product_id = 3,
       review_id = None,
       main_image = True,
       image_url = 'https://cdn.shopify.com/s/files/1/0024/1788/5284/products/silver-conch-shell-earrings-2_800x.jpg?v=1621325050'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
