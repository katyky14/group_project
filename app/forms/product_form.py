from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField,TextAreaField,SubmitField,FloatField
from wtforms.validators import DataRequired,NumberRange

# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')




class ProductForm(FlaskForm):
    name = StringField('Title',validators = [DataRequired()])
    price = FloatField('Price',validators=[DataRequired(),NumberRange(min=0.20, max=50000, message="price btw 0.20 to 50,000")]) # price btw 0.20 to 50,000
    description = TextAreaField('Description')
    image = StringField('Image')
    quantity = IntegerField('Quantity',validators=[DataRequired(),NumberRange(min=1, message=None)]) # default is 1
    submit = SubmitField('Add listing')


class EditProductForm(FlaskForm):
    name = StringField('Title',validators = [DataRequired()])
    price = FloatField('Price',validators=[DataRequired(),NumberRange(min=0.20, max=50000, message="price btw 0.20 to 50,000")]) # price btw 0.20 to 50,000
    description = TextAreaField('Description')
    image = StringField('Image')
    quantity = IntegerField('Quantity',validators=[DataRequired(),NumberRange(min=1, message=None)]) # default is 1
    submit = SubmitField('Edit listing')
