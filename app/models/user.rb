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

  def friend_by_id(user_id)
    friendships_of_from_user.find_by(to_user_id: user_id) || friendships_of_to_user.find_by(from_user_id: user_id)
  end

  def set_image(file)
    return if file.nil?
    file_name = Time.zone.now.to_i.to_s + file.original_filename
    File.open("public/user_images/#{file_name}", "wb") {|f|f.write(file.read)}
    self.image = file_name
  end
end
