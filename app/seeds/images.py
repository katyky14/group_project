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
    image4 = Image(
       user_id = 1,
       product_id = 4,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1496142958257-bb62cac8603f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhZnRlZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    )
    image5 = Image(
       user_id = 2,
       product_id = 5,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1517857399767-a9dc28f5a734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNpbHZlciUyMGJyYWNlbGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    )
    image6 = Image(
       user_id = 3,
       product_id = 6,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1625520109015-2ee42baffda6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3dlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    )
    image7 = Image(
       user_id = 1,
       product_id = 7,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1575277340549-70f2441dee09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3JhZnRlZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    )
    image8 = Image(
       user_id = 2,
       product_id = 8,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbmRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    )
    image9 = Image(
       user_id = 3,
       product_id = 9,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1499028203764-8669cfd05719?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGxhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    )
    image10 = Image(
       user_id = 1,
       product_id = 10,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGNsYXklMjB2YXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    )
    image11 = Image(
       user_id = 1,
       product_id = 11,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    )
    image12 = Image(
       user_id = 1,
       product_id = 12,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    )
    image13 = Image(
       user_id = 1,
       product_id = 13,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1587466280419-78d7adc6d4a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    )
    image14 = Image(
       user_id = 1,
       product_id = 14,
       review_id = None,
       main_image = True,
       image_url = 'https://images.unsplash.com/photo-1587467063136-db173523594d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    )


    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
