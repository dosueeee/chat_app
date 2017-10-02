module Api
	class UsersController < ApplicationController

		def search
			@users = User.where.not(id: current_user.id)
			@search_string = params[:search_string]
			if !@search_string || @search_string == ""
				@search_string = []
			else
				@search_string = @users.where("name like '%" + @search_string + "%'")
			end
			render json: @search_string
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