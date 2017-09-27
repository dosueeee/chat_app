module Api
	class UsersController < ApplicationController

		def search
			@users = []
			if request.get?
				@search_string = params[:search_string]
				@users = User.where("name like '%" + @search_string + "%'")
				render json: @users.to_json
			else
				render json: {errors: '検索したいユーザ名を入力してください'}
			end
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