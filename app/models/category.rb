class Category < ApplicationRecord
  has_many :category_products
  has_many :products, through: :category_products

  validates :title, presence: true, uniqueness: true
end
