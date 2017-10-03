class FriendshipsController < ApplicationController
  def create
		@user = User.find(params[:to_user_id])
		if current_user.friend?(@user)
	  	redirect_to root_path
		else
			current_user.make_friend_with(@user)
			redirect_to root_path
		end
  end

  def destroy
	  user = User.find(params[:id])
	  current_user.unfollow_break_off_friendship(user)
		redirect_to root_path
  end
end
