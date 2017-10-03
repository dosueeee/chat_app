module Api
	class FriendshipsController < ApplicationController

	  def create
    	@friendship = current_user.friendships_of_from_user.build(friendship_params)
    	@friendship.save
      	  render json: { status: 200, friendship: @friendship }
  	end

  	def destroy
    	destroy_friendship = current_user.friend_by_id(friendship_params)
    	if destroy_friendship.destroy
        @users = current_user.friends_all.as_json(include: [:messages])
        render json: {status: 200, user: @users}
    	end
  	end

  	private

  	def friendship_params
    	params.require(:friendship).permit(:to_user_id)
  	end

  end
end