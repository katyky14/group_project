from flask import Blueprint
from ..models.images import Image, db

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_image(id):
    image = Image.query.get(id)
    if image:
        db.session.delete(image)
        db.session.commit()
        return "Image deleted"
    return {"message": f"image with id:{id} does not exist"}
