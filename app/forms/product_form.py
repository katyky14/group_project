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
    price = FloatField('Price',validators=[DataRequired(),NumberRange(min=0.20, max=50000, message="Price must be between $0.20 and $50,000.00.")]) # price btw 0.20 to 50,000
    description = TextAreaField('Description')
    image = StringField('Image')
    owner_id = IntegerField("OwnerId")
    quantity = IntegerField('Quantity',validators=[DataRequired(),NumberRange(min=1, max=999, message="Quantity must be between 1 and 999.")]) # default is 1, Quantity must be between 1 and 999.
    submit = SubmitField('Add listing')


class EditProductForm(FlaskForm):
    name = StringField('Title',validators = [DataRequired()])
    price = FloatField('Price',validators=[DataRequired(),NumberRange(min=0.20, max=50000, message="Price must be between $0.20 and $50,000.00.")]) # price btw 0.20 to 50,000
    description = TextAreaField('Description')
    image = StringField('Image')
    owner_id = IntegerField("OwnerId")
    quantity = IntegerField('Quantity',validators=[DataRequired(),NumberRange(min=1,max=999, message="Quantity must be between 1 and 999.")]) # default is 1
    submit = SubmitField('Edit listing')
