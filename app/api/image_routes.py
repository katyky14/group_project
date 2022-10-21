from flask import Blueprint, request
from ..models.images import Image, db
from ..forms.images_form import ImageForm

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_image(id):
    image = Image.query.get(id)
    if image:
        db.session.delete(image)
        db.session.commit()
        return "Image deleted"
    return {"message": f"image with id:{id} does not exist"}

@image_routes.route('/<int:id>', methods=['PUT'])
def edit_image(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Image.query.get(id)
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return {"Edited image": data.to_dict_images()}
    return form.errors
