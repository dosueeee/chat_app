class UsersController < ApplicationController

	def show
		@user = User.find_by(id: params[:id])
		@id = params[:id].to_i
	end

	def search
	end

end