class Supplier < ApplicationRecord
  has_many :products

  validates :name, :phone, :email, presence: true
  validates :name, :email, :phone, uniqueness: true
 

end
