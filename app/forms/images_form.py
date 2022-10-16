from flask_wtf import FlaskForm
from wtforms import BooleanField,StringField,IntegerField,SubmitField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    product_id = IntegerField("product_id", validators=[DataRequired()])
    review_id = IntegerField("review_id", validators=[DataRequired()])
    main_image = BooleanField("main_image", validators=[DataRequired()])
    image_url = StringField("image_url", validators=[DataRequired()])
    submit = SubmitField("Submit")
