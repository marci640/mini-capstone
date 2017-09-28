class CartedProduct < ApplicationRecord
  belongs_to :product
  belongs_to :order, optional: true
  belongs_to :user

  validates :quantity, numericality: {greater_than: 0}
  validates :quantity, presence: true 

end
