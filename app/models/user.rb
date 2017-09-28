class User < ApplicationRecord
  has_secure_password
  has_many :carted_products
  has_many :orders

  validates :name, :email, presence: true
  validates :name, length: {minimum: 2}
  validates :email, uniqueness: true
  

end
