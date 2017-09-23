module Api
	class UsersController < ApplicationController
		def search
			@users = []
			if request.get?
				@search_fstr = params[:search_fstr]
				@users = User.where("name like '%" + @search_fstr + "%'")
				render json: @users.to_json
			else
				render json: {errors: '検索したいユーザ名を入力してください'}
			end
		end
	end
end