class Message < ApplicationRecord
	# has_many :users
	#   has_many :friendships, through: :users
	belongs_to :users
end
