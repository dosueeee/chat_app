class UsersController < ApplicationController

	def show
		@user = User.find_by(id: params[:id])
		@id = params[:id].to_i
		# session[:user_id] = @user.id
	end

	def search
	end

end