class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :name, presence: true, length: { maximum: 50 }

  # belongs_to :friendships
  # belongs_to :messages
  has_many :messages
  has_many :accesses
  has_many :friendships, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :from_user_friendships, class_name: 'Friendship', foreign_key: 'from_user_id',
           dependent: :destroy
  has_many :friends_from_user, through: :from_user_friendships, source: 'to_user'
  has_many :to_user_friendships, class_name: 'Friendship', foreign_key: 'to_user_id',
           dependent: :destroy
  has_many :friends_to_user, through: :to_user_friendships, source: 'from_user'

  def make_friend_with(user)
  	from_user_friendships.find_or_create_by(to_user_id: user.id)
  end

  def break_off_friend(user)
  	friendship = from_user_friendships.find_by(to_user_id: user.id)
  	friendship.destroy if from_user_friendships
  end

  def find_friendship_for(user_id)
  	from_user_friendship = from_user_friendships.find_by(to_user_id: user_id)
  	to_user_friendship = to_user_friendship.find_by(from_user_id: user_id)
    if from_user_friendship
      from_user_friendship.to_user
    else
      to_user_friendship.from_user
    end
  end

  def friend?(user)
  	self.from_friend?(user) || self.to_friend?(user)
  end
  def from_friend?(user)
    friends_from_user.include?(user)
  end

  def to_friend?(user)
    friends_to_user.include?(user)
  end
end
