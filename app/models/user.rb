class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :name, presence: true, length: { maximum: 50 }

  has_many :messages
  has_many :friendships, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :from_user_friendships, class_name: 'Friendship', foreign_key: 'from_user_id',
           dependent: :destroy
  has_many :friends_from_user, through: :from_user_friendships, source: 'to_user'
  has_many :to_user_friendships, class_name: 'Friendship', foreign_key: 'to_user_id',
           dependent: :destroy
  has_many :friends_to_user, through: :to_user_friendships, source: 'from_user'

  # 多対多
  has_many :friendships_of_from_user, :class_name => 'Friendship', :foreign_key => 'from_user_id', :dependent => :destroy
  has_many :friendships_of_to_user, :class_name => 'Friendship', :foreign_key => 'to_user_id', :dependent => :destroy
  has_many :friends_of_from_user, :through => :friendships_of_from_user, :source => 'to_user'
  has_many :friends_of_to_user, :through => :friendships_of_to_user, :source => 'from_user'


  def make_friend_with(user)
  	from_user_friendships.find_or_create_by(to_user_id: user.id)
  end

  def break_off_friend(user)
  	friendship = from_user_friendships.find_by(to_user_id: user.id) || to_user_friendships.find_by(from_user_id: user.id)
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

  def friends_all
    friends_to_user + friends_from_user
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

  def unfollow_break_off_friendship(user)
    if from_friend?(user)
      from_user_friendships.find_by(to_user_id:user.id).destroy
    elsif to_friend?(user)
      to_user_friendships.find_by(from_user_id:user.id).destroy     
    end
  end

  def friends
    friends_of_from_user + friends_of_to_user
  end

  def friend_by_id(userId)
    friendships_of_from_user.find_by(userId)
  end
end
