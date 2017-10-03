module Api
  class UsersController < ApplicationController

    def search
	  	@users = User.where.not(id: current_user.id)
	  	@search_name = params[:search_name]
	  	if !@search_name || @search_name == ""
				@search_name = []
	  	else
				@search_name = @users.where("name like '%" + @search_name + "%'")
	  	end
	  	render json: @search_name
    end

    def index
	  	@users = current_user.friends_all.as_json(include: [:messages])
	  	render json: @users
    end

    def show
	  	@user = User.find(params[:id])
	  	@messages = @user.messages.where(to_user_id: current_user.id)
	  	@user_json = @user.as_json
	  	@user_json[:messages] = @messages
	  	render json: @user_json
    end

  end
end