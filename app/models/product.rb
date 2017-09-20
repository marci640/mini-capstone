class Product < ApplicationRecord
  belongs_to :supplier
  has_many :images
  has_many :orders
  has_many :category_products
  has_many :categories, through: :category_products

  def sale_message
    if price < 2
      "Discount Item!"
    else 
      "Everyday Value!"
    end
  end 

  def sale_message_class
    if sale_message == "Discount Item!"
      "discount-item"
    else
      ""
    end 
  end 

  def tax
    @tax = price.to_f * 0.09
  end 

  def total 
    total = price + @tax 
  end 



end
