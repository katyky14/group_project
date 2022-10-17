from flask_wtf import FlaskForm
from wtforms import BooleanField, StringField, IntegerField, SubmitField, FieldList, FormField, Form
from wtforms.validators import DataRequired

class AddedImagesForm(Form):
    additional_urls = StringField("additional_urls")

class ImageForm(FlaskForm):
    user_id = IntegerField("user_id")
    product_id = IntegerField("product_id")
    review_id = IntegerField("review_id")
    main_image = BooleanField("main_image")
    image_url = StringField("image_url", validators=[DataRequired()])
    additional_urls = FieldList(FormField(AddedImagesForm))
    submit = SubmitField("Submit")
